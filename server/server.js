import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cookieParser from 'cookie-parser';
import path from "path";


// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Use JSON middleware
app.use(express.json());
app.use(cookieParser());

// Use URL-encoded middleware
app.use(express.urlencoded({ extended: true }));


// Use CORS middleware
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true

}));

app.use("/uploads", express.static(path.join(process.cwd(), "./uploads")));


// Routes
app.use('/api/', userRoutes);

app.use('/api/admin', adminRoutes);


// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});

