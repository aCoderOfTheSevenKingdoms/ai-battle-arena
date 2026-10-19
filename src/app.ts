import express from 'express';
import runGraph from "./services/graph.ai.service.js";
import cors from "cors";

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins
  })
);

app.use(express.json());

app.get('/health', (req,res) => {
    res.status(200).json({status: 'ok'});
});

app.post("/use-graph", async (req, res) => {
   const result = await runGraph("Write an code for factorial function in JavaScript.");
   res.status(200).json({
     result
   });
});

export default app;