import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", form);

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Job Tracker</h1>

        <p>
          Welcome Back
        </p>

        <form onSubmit={submitForm}>

          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button>
            Login
          </button>

        </form>

        <div className="auth-footer">
          Don't have account?
          <Link to="/register">
            Register
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Login;