import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { checkFraud } from "../utils/api";

export default function FraudCheck() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleCheck = async () => {
    setError("");
    setResult(null);

    const numericAmount = Number(amount);

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    setLoading(true);

    try {
      const data = await checkFraud(numericAmount);
      setResult(data.status);
    } catch (err) {
      setError("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container" style={{ maxWidth: 420 }}>
        <h2>Check New Transaction</h2>

        <input
          type="number"
          placeholder="Transaction Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {error && (
          <p style={{ color: "#f87171", marginTop: 8 }}>{error}</p>
        )}

        <button onClick={handleCheck} disabled={loading}>
          {loading ? "Checking..." : "Check Fraud"}
        </button>

        {result && (
          <div className="card" style={{ marginTop: 16 }}>
            <h3
              style={{
                color: result === "FRAUD" ? "#ef4444" : "#22c55e",
              }}
            >
              Result: {result}
            </h3>

            <button
              className="secondary"
              onClick={() => navigate("/history")}
            >
              View History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
