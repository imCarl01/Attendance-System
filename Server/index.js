import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRoutes from "./Routes/admin.routes.js"
import courseRoutes from "./Routes/course.route.js"
import lecturerRoutes from  "./Routes/lecturer.routes.js"
import attendanceRoutes from "./Routes/attendace.routes.js"
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));
// const allowedOrgins =[
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://smartattendancesystems.netlify.app"
// ]
// app.use(cors({
//     origin:allowedOrgins,
//     credentials:true,
// }))

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // allow all origins temporarily
  },
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))


app.get("/", (req, res) => {
  res.send("✅ Attendance API is running!");
});
// routes
app.use("/api/admin",adminRoutes)
app.use('/api/users',userRoutes)
app.use('/api/courses',courseRoutes)
app.use('/api/lecturer',lecturerRoutes)
app.use('/api/attendance', attendanceRoutes);


// app.listen(PORT,()=>{
//     console.log(`Server is running on port http://localhost:${PORT}`);
// })


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`); // production
})