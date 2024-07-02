// import package statement
import express from "express";
import cors from "cors";
import morgan from "morgan"
import dotenv from "dotenv"
dotenv.config({ path: 'info.env' })
import { connectDb } from "./database/database.js";

// Custom import 
import authRoutes from "./routes/auth.js";


// DB Connection
connectDb()


// Initialization
const server = express();
const PORT = process.env.PORT || 8000


// middlewares
server.use(express.json({ limit: "4mb" }));
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(morgan("dev"));



// route middlewares
server.use("/api", authRoutes);


// Server Listener
server.listen(PORT, () => console.log(`Server running on port ${PORT} `));


