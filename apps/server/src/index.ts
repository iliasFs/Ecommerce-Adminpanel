import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "../cloud/cloudinary";
dotenv.config();

import router from "./router";
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Server running and listening on http://localhost:${PORT}`);
});
