import { useEffect, useState } from "react";
import axios from "../utilis/axios";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "",
    dateOfBirth: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 6000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/auth/register", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={key.includes("password") ? "password" : "text"}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key}
            // required
          />
        ))}
        <button type="submit">
          {loading ? <div className="circle-loader"></div> : "Register"}
        </button>
        {/* {loading ? <p>Loading...</p>: <p>{message}</p>  } */}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
