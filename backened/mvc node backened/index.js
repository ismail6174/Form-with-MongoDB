import chalk from "chalk";
import express from "express";                        
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./database/db.js";
import userRouter from "./routes/router.js";




const app = express();

app.use(express.json()); // read body
app.use(cors())

// mongoose connection:

connectDB();


// router

app.use("/api", userRouter); //using middle ware


// server response on browser

app.get("/", (req, res) => {
  res.json({
    message: "server start successfully...!",
  });
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    chalk.bgCyanBright.bold.italic(`server is running on http://localhost:${PORT}`)
  );
});