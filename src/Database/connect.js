const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 6000;

const mongoUrl =
  "mongodb+srv://m84719666:d6Rjb4DyVuasNDrn@tendertesting.zygfo.mongodb.net/?retryWrites=true&w=majority&appName=tenderTesting";
const dbNameRegistration = "Registered";
const dbNameTenders = "test";

const corsOptions = {
  origin: [/^(https?:\/\/)?(\w+\.)?vyvsai\.com$/, "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

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

app.post("/api/register", async (req, res) => {
  try {
    const { username, mobileNo, email, password, preferences } = req.body;
    const db = client.db(dbNameRegistration);
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      $or: [{ mobileNo }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await usersCollection.insertOne({
      username,
      mobileNo,
      email,
      password,
      preferences,
    });

    if (!result.insertedId) {
      throw new Error("User registration failed");
    }

    res
      .status(201)
      .json({ message: "User registered successfully", id: result.insertedId });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
      request: {
        body: req.body,
        url: req.originalUrl,
        method: req.method,
      },
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
    const tendersCollection = db.collection("Tenders");
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
    const tendersCollection = db.collection("Tenders");
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
    const tendersCollection = db.collection("Tenders");
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
    const { state, district, department } = req.query;
    console.log("Tender request received:", { state, district, department });

    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("tenders");

    // Create a query object based on request parameters
    let query = {};

    // Use case-insensitive regex search for state, district, and department
    if (state) query.state = { $regex: new RegExp(state, "i") };
    if (district) query.district = { $regex: new RegExp(district, "i") };
    if (department) query.org_name = { $regex: new RegExp(department, "i") };

    console.log("Querying tenders with:", query);

    // Use aggregation to handle price conversion and sorting
    const tenders = await tendersCollection
      .aggregate([
        { $match: query },
        {
          $addFields: {
            priceNumeric: {
              $convert: {
                input: {
                  $replaceAll: { input: "$price", find: ",", replacement: "" },
                },
                to: "double",
                onError: null,
                onNull: null,
              },
            },
          },
        },
        { $sort: { priceNumeric: -1 } }, // Sort by numeric price in descending order
        { $project: { priceNumeric: 0 } }, // Exclude the numeric price from the final output
      ])
      .toArray();

    if (tenders.length > 0) {
      console.log("Tenders found:", tenders);
      res.json({ tenders, department, district });
    } else {
      console.log("No tenders found");
      res.json({ tenders: [] });
    }
  } catch (error) {
    console.error("Error fetching tenders:", error);
    res.status(500).json({ message: "Error fetching tenders" });
  }
});

// Backend - Express route for fetching a tender by ID
app.get("/api/tenders/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the route parameters
  try {
    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("tenders");

    // Ensure ObjectId is imported from MongoDB
    const ObjectId = require("mongodb").ObjectId;

    const tender = await tendersCollection.findOne({ _id: new ObjectId(id) }); // Find tender by ID

    if (tender) {
      res.json(tender); // Return the found tender
    } else {
      res.status(404).json({ message: "Tender not found" }); // Handle not found case
    }
  } catch (error) {
    console.error("Error fetching tender by ID:", error);
    res.status(500).json({ message: "Error fetching tender" });
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
