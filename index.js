import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let transactions = [];

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

// Check fraud (mock logic)
app.post("/check", (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const isFraud = Math.random() > 0.5;
  const status = isFraud ? "FRAUD" : "GENUINE";

  const tx = {
    id: transactions.length + 1,
    amount,
    status,
    time: new Date().toISOString(),
  };

  transactions.push(tx);
  res.json(tx);
});

// History
app.get("/history", (req, res) => {
  res.json(transactions);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
