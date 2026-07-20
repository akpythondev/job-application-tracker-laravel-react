import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/Auth.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitForm = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/register",
        form
      );

      navigate("/");

    } catch {

      alert("Registration Failed");

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p>
          Start your career journey
        </p>

        <form onSubmit={submitForm}>

          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

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
            Register
          </button>

        </form>

        <div className="auth-footer">

          Already have account?

          <Link to="/">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;