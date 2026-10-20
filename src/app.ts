import express from 'express';
import runGraph from "./services/graph.ai.service.js";
import { getModelsInfo } from "./services/models.service.js";
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

app.get('/models', (req, res) => {
    res.status(200).json(getModelsInfo());
});

app.post("/use-graph", async (req, res) => {
   const problem: string = req.body.problem;
   const result = await runGraph(problem);
   res.status(200).json({
     result
   });
});

export default app;