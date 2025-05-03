import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));

// routes
app.use('/api/users',userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})