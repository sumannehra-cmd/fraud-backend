import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FraudCheck from "./pages/FraudCheck";
import History from "./pages/History";
import Protected from "./components/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />

        <Route
          path="/check"
          element={
            <Protected>
              <FraudCheck />
            </Protected>
          }
        />

        <Route
          path="/history"
          element={
            <Protected>
              <History />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
