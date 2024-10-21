const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const mongoUrl = "mongodb+srv://m84719666:d6Rjb4DyVuasNDrn@tendertesting.zygfo.mongodb.net/?retryWrites=true&w=majority&appName=tenderTesting";
const dbNameTenders = "Output";

async function populateTenders() {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbNameTenders);
    const tendersCollection = db.collection("Tenders");

    const results = [];
    fs.createReadStream('E:/Team-Vyvsai-Website-real-one-/src/components/output.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          await tendersCollection.insertMany(results);
          console.log("Tenders populated successfully");
        } catch (error) {
          console.error("Failed to insert tenders", error);
        } finally {
          await client.close();
        }
      });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

populateTenders();