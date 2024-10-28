const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const crypto = require("crypto");
const app = express();
const port = 5000;
const helmet = require('helmet');
const mongoUrl =
  "mongodb+srv://m84719666:d6Rjb4DyVuasNDrn@tendertesting.zygfo.mongodb.net/?retryWrites=true&w=majority&appName=tenderTesting";
const dbNameRegistration = "Registered";
const dbNameTenders = "test";
const dbName = "Tokens";
const corsOptions = {
  origin: /^(https?:\/\/)?(\w+\.)?vyvsai\.com$/,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(helmet());
app.disable('x-powered-by');
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
app.post("/api/generate-link", async (req, res) => {
  const { duration } = req.body; // duration in minutes
  const token = crypto.randomBytes(20).toString('hex');
  const expiration = new Date(Date.now() + duration * 60000);

  const db = client.db(dbNameTenders);
  const tokensCollection = db.collection("tokenmini");

  await tokensCollection.insertOne({ token, expiration, status: "unused" });

  res.json({ link: `https://www.vyvsai.com/protected?token=${token}` });
});
app.post('/api/check-password', async (req, res) => {
  const { password } = req.body;
  try {
    const db = client.db(dbName);
    const collection = db.collection('secret_passwords');
    const result = await collection.findOne({ password });
    if (result) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error checking password:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const authMiddleware = async (req, res, next) => {
  const token = req.query.token;
  const isAuthenticated = req.isAuthenticated && req.isAuthenticated();

  if (!token && !isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  if (token) {
    const db = client.db(dbName);
    const tokensCollection = db.collection("tokenmini");

    const tokenDoc = await tokensCollection.findOne({ token });
    if (!tokenDoc || new Date() > tokenDoc.expiration) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  next();
};

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
app.get("/api/validate-token", async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.json({ valid: false });
  }

  const db = client.db(dbNameTenders);
  const tokensCollection = db.collection("tokenmini");

  const tokenDoc = await tokensCollection.findOne({ token });
  if (!tokenDoc || new Date() > tokenDoc.expiration) {
    return res.json({ valid: false });
  }

  res.json({ valid: true });
});
app.get("/api/tenders", authMiddleware, async (req, res) => {
  try {
    const { state, district, department } = req.query;
    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("tenders");

    let query = { expired: false }; // Always show non-expired tenders

    if (state) query.state = state;
    if (district) query.district = district;
    if (department) query.org_name = department;

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
    app.listen(port, '0.0.0.0', () => {
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
