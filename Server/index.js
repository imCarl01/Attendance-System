import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path"; 
import mongobd from "mongodb"

const MONGOURL = process.env.MONGO_URI || "mongodb://localhost:27017/";

mongoose.connect(MONGOURL)
.then(()=>console.log("Connected to MongoDB successfully"))
.catch((error) =>console.log("Error connecting to MongoDB", error));
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log("Server is running on Port http://localhost:" + PORT);
})