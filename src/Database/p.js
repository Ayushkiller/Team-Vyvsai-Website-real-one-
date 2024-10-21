const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

const mongoUrl = "mongodb+srv://m84719666:d6Rjb4DyVuasNDrn@tendertesting.zygfo.mongodb.net/?retryWrites=true&w=majority&appName=tenderTesting";
const dbNameTenders = "Output";
const filePath = 'E:/Team-Vyvsai-Website-real-one-/src/components/current.json'; // Change this to your JSON file path if needed

async function populateTenders() {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("Tenders");

    const fileExtension = path.extname(filePath).toLowerCase();
    const results = [];

    if (fileExtension === '.csv') {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            await tendersCollection.insertMany(results);
            console.log("Tenders populated successfully from CSV");
          } catch (error) {
            console.error("Failed to insert tenders from CSV", error);
          } finally {
            await client.close();
          }
        });
    } else if (fileExtension === '.json') {
      fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
          console.error("Failed to read JSON file", err);
          return;
        }
        try {
          const jsonData = JSON.parse(data);
          await tendersCollection.insertMany(jsonData);
          console.log("Tenders populated successfully from JSON");
        } catch (error) {
          console.error("Failed to insert tenders from JSON", error);
        } finally {
          await client.close();
        }
      });
    } else {
      console.error("Unsupported file type");
      await client.close();
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

populateTenders();