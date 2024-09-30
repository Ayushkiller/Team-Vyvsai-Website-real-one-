import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/mydatabase';

async function connect() {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected successfully to MongoDB');
    } catch (err) {
        console.error('Connection to MongoDB failed', err);
    }
}

export default connect;