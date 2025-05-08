import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoutes from "./Routes/admin.routes.js"
import courseRoutes from "./Routes/course.route.js"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));
const allowedOrgins =[
    "http://localhost:5173",
    "https://smartattendancesystems.netlify.app"
]
app.use(cors({
    origin:allowedOrgins,
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))


// routes
app.use("/api/admin",adminRoutes)
app.use('/api/users',userRoutes)
app.use('/api/courses',courseRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})