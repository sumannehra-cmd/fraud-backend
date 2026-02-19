import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getHistory } from "../utils/api";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistory().then(setData);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Transaction History</h2>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.amount}</td>
                <td style={{ color: t.status === "FRAUD" ? "red" : "green" }}>
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
