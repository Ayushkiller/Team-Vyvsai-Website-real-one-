const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 6000;

const mongoUrl =
  "mongodb+srv://m84719666:d6Rjb4DyVuasNDrn@tendertesting.zygfo.mongodb.net/?retryWrites=true&w=majority&appName=tenderTesting";
const dbNameRegistration = "test";
const dbNameRegistered = "Registered";
const dbNameTenders = "test";

const corsOptions = {
  origin: /^(https?:\/\/)?(\w+\.)?vyvsai\.com$/,
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
//time to check if sht worked for automation
let client;

async function connectToMongo() {
  try {
    client = new MongoClient(mongoUrl);
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

app.post("/api/notify-tender-file", async (req, res) => {
  const { username, mobile, email } = req.body;

  // Validate the input data
  if (!username || !mobile || !email) {
    return res.status(400).json({ message: "Please fill in all the fields." });
  }
  const db = client.db(dbNameRegistered);

  try {
    // Check if the user already exists in the database
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      // If the user exists, update the notifyForTenderFile flag to true
      await db.collection("users").updateOne(
        { email },
        { $set: { notifyForTenderFile: true } } // Update subscription flag
      );
      return res.status(200).json({
        message: "You have been successfully updated for tender notifications.",
      });
    }

    // If the user does not exist, insert a new user
    const newUser = {
      username,
      mobile,
      email,
    };

    // Insert the new user
    await db.collection("users").insertOne(newUser);

    // Optionally, send an email notification
    // await sendEmailNotification(username, email);

    // Respond with success
    res
      .status(200)
      .json({ message: "Thank you! You will be notified on tender updates." });

    client.close(); // Close the DB connection
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      mobileNo,
      notificationPreferences,
      state,
      districts,
      departments,
      tenderPricePreferences,
    } = req.body;

    const db = client.db(dbNameRegistration);
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [{ mobileNo }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const userData = {};

    // Populate userData object based on received data
    if (username) userData.username = username;
    if (email) userData.email = email;
    if (password) userData.password = password;
    if (mobileNo) userData.mobileNo = mobileNo;
    if (notificationPreferences)
      userData.notificationPreferences = notificationPreferences;
    if (tenderPricePreferences)
      userData.tenderPricePreferences = tenderPricePreferences;

    // Handle multiple states
    userData.state = Array.isArray(state) ? state : [state];

    // Handle districts (if provided, ensure it's an array)
    if (districts) {
      userData.districts = Array.isArray(districts) ? districts : [districts];
    }

    // Handle departments (if provided, ensure it's an array)
    if (departments) {
      userData.departments = Array.isArray(departments)
        ? departments
        : [departments];
    }

    // Set trial and subscription logic automatically
    userData.onTrial = "active"; // Start on trial by default
    userData.subscription = { isActive: false }; // Subscription inactive during trial

    // Insert user data into MongoDB
    const result = await usersCollection.insertOne(userData);

    if (!result.insertedId) {
      throw new Error("User registration failed");
    }

    res.status(201).json({
      message: "Registration successful",
      id: result.insertedId,
      trialStatus: userData.onTrial,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Error occurred during registration",
      error: error.message,
    });
  }
});
// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    console.log("Login attempt:", {
      mobileNo,
      passwordLength: password ? password.length : 0,
    });

    const db = client.db(dbNameRegistration);
    const user = await db.collection("users").findOne({ mobileNo });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    console.log("Login successful:", mobileNo);
    res.json({
      success: true,
      message: "Login successful",
      user: { mobileNo: user.mobileNo, preferences: user.preferences },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Endpoint to fetch states
app.get("/api/states", async (req, res) => {
  try {
    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("tenders");
    const states = await tendersCollection.distinct("state");
    res.json({ states });
  } catch (error) {
    console.error("Error fetching states:", error);
    res.status(500).json({ message: "Error fetching states" });
  }
});

// Endpoint to fetch districts for a selected state
app.get("/api/districts/:state", async (req, res) => {
  try {
    const { state } = req.params;
    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("tenders");
    const districts = await tendersCollection.distinct("district", { state });
    res.json({ districts });
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ message: "Error fetching districts" });
  }
});

// Endpoint to fetch departments for a selected state
app.get("/api/departments/:state", async (req, res) => {
  try {
    const { state } = req.params;
    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("tenders");
    const departments = await tendersCollection.distinct("org_name", { state });
    res.json({ departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Error fetching departments" });
  }
});

// Endpoint to fetch tenders
app.get("/api/tenders", async (req, res) => {
  try {
    const { state, district, department, showExpired } = req.query;
    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("tenders");

    let query = {};
    if (state) query.state = state;

    // Check if district contains ":ALL" to allow all districts
    if (district && !district.includes("All")) {
      query.district = district;
    }

    // Check if department contains ":ALL" to allow all departments
    if (department && !department.includes("All")) {
      query.org_name = department;
    }
    query.expired = false;

    const tenders = await tendersCollection.find(query).toArray();
    res.json({ tenders });
  } catch (error) {
    console.error("Error fetching tenders:", error);
    res.status(500).json({ message: "Error fetching tenders" });
  }
});

async function startServer() {
  try {
    await connectToMongo(); // Attempt to connect to MongoDB
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error); // Log error message if server fails to start
    process.exit(1); // Terminate the process with an exit code of 1
  }
}
startServer();

process.on("SIGINT", async () => {
  try {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error during graceful shutdown", error);
    process.exit(1);
  }
});
