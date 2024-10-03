const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017';
const dbNameRegistration = 'Registered';
const dbNameTenders = 'Output';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
let client;
async function connectToMongo() {
  try {
    client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, mobileNo, email, password, preferences } = req.body;
    const db = client.db(dbNameRegistration);
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ $or: [{ mobileNo }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Insert new user
    const result = await usersCollection.insertOne({
      username,
      mobileNo,
      email,
      password, // Storing password as-is
      preferences
    });

    res.status(201).json({ message: 'User registered successfully', id: result.insertedId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { mobileNo, password } = req.body;
    console.log('Login attempt:', { mobileNo, password: '****' });
    
    const db = client.db(dbNameRegistration);
    const user = await db.collection('users').findOne({ mobileNo });

    if (!user) {
      console.log('User not found:', mobileNo);
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      console.log('Incorrect password for user:', mobileNo);
      return res.status(401).json({ message: 'Incorrect password' });
    }

    console.log('Login successful:', mobileNo);
    res.json({ 
      success: true, 
      message: 'Login successful', 
      user: { mobileNo: user.mobileNo, preferences: user.preferences } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Fetch tenders endpoint
app.get('/api/tenders', async (req, res) => {
  try {
    const db = client.db(dbNameTenders);
    const tenders = await db.collection('Tenders').find().toArray();
    res.json(tenders);
  } catch (error) {
    console.error('Error fetching tenders:', error);
    res.status(500).json({ message: 'Error fetching tenders' });
  }
});

// Start server
async function startServer() {
  await connectToMongo();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during graceful shutdown', error);
    process.exit(1);
  }
});