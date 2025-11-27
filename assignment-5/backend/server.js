import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './routes/auth.js';
import blogs from './routes/blogs.js';
import categories from './routes/categories.js';
import User from './models/User.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogapp')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Seed admin user on startup (fixed admin)
const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ email: 'admin@blogapp.com' });
  if (!existingAdmin) {
    const admin = new User({
      email: 'admin@blogapp.com',
      password: 'admin123', 
      role: 'admin',
      Name: 'Admin User',
    });
    await admin.save();
    console.log('Admin user seeded');
  }
};
seedAdmin();

// Routes
app.use('/api/auth', auth);
app.use('/api/blogs', blogs);
app.use('/api/categories', categories);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});