import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("Server starting...");

// MongoDB connect (safe)
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err.message));
} else {
  console.log("⚠️ MONGO_URI not found");
}

// ✅ ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.status(200).send("Backend is alive 🚀");
});

// example APIs (keep even if empty)
app.get("/history", (req, res) => {
  res.json([]);
});

app.post("/check", (req, res) => {
  res.json({ result: "GENUINE" });
});

// ✅ THIS LINE IS CRITICAL
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
