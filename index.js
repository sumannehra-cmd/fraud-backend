import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// health check (MOST IMPORTANT)
app.get("/", (req, res) => {
  res.status(200).send("OK");
});

// test route
app.post("/check", (req, res) => {
  const { amount } = req.body;
  const isFraud = Number(amount) > 10000;
  res.json({ amount, status: isFraud ? "FRAUD" : "GENUINE" });
});

app.get("/history", (req, res) => {
  res.json([
    { id: 1, amount: 5000, status: "GENUINE" },
    { id: 2, amount: 15000, status: "FRAUD" }
  ]);
});

// Mongo (safe)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("Mongo error:", err.message));
}

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
