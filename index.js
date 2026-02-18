require("dotenv").config();          // 👈 1️⃣ sabse upar
const express = require("express");
const cors = require("cors");

const connectDB = require("./db");   // 👈 2️⃣ db import

const app = express();

app.use(cors());
app.use(express.json());

connectDB();                          // 👈 3️⃣ YAHI IMPORTANT LINE

app.post("/check-fraud", async (req, res) => {
  const { amount } = req.body;

  const status = amount > 50000 ? "FRAUD" : "GENUINE";

  res.json({ status });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

