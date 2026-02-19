import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // login state save
    localStorage.setItem("loggedIn", "true");

    // dashboard pe le jao
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "300px" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input placeholder="Email" style={{ marginBottom: "10px" }} />
        <input
          placeholder="Password"
          type="password"
          style={{ marginBottom: "10px" }}
        />

        <button onClick={handleLogin} style={{ width: "100%" }}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
