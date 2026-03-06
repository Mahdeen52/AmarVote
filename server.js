import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import candidateRoutes from "./router/candidates.routes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/candidates", candidateRoutes);

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Successfully connected MongoDB to process:", `${process.env.PORT}`);
    });
})
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    })


