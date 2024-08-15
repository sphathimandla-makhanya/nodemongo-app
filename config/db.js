// db.js
import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://makhanyasm11:2ax5kE5o70E59zGa@cluster0.sdzk5.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
