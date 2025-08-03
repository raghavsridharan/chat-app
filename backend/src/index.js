import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

dotenv.config()

const PORT = process.env.PORT

app.use(express.json()) // We can extract json data

app.use('/api/auth', authRoutes); 

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});

 




 