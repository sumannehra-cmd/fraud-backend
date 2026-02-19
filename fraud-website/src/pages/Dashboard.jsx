import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getHistory } from "../utils/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [tx, setTx] = useState([]);

  useEffect(() => {
    getHistory().then(setTx);
  }, []);

  const total = tx.length;
  const fraud = tx.filter(t => t.status === "FRAUD").length;
  const rate = total ? ((fraud / total) * 100).toFixed(2) : 0;

  const data = [
    { name: "Genuine", value: total - fraud },
    { name: "Fraud", value: fraud },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="container" style={{ flex: 1 }}>
        <h1>Dashboard</h1>

        <div style={{ display: "flex", gap: 16 }}>
          <div className="card"><h4>Total</h4><p>{total}</p></div>
          <div className="card"><h4>Fraud</h4><p>{fraud}</p></div>
          <div className="card"><h4>Rate</h4><p>{rate}%</p></div>
        </div>

        <div className="card" style={{ marginTop: 24, width: 360 }}>
          <h4>Fraud Split</h4>
          <PieChart width={320} height={250}>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
