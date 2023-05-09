import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello Coleagues");
});

app.listen(3001, () => {
  console.log(`🚀 Server running and listening on http://localhost:${PORT}`);
});
