import express from 'express';
import useGraph from "./services/graph.ai.service.js";

const app = express();

app.get('/health', (req,res) => {
    res.status(200).json({status: 'ok'});
});

app.post("/use-graph", async (req, res) => {
   const result = await useGraph("Write an factorial function in JavaScript");
   res.status(200).json({
     result
   });
});

export default app;