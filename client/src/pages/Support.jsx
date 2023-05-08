import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Support = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [err, setError] = useState(null);
  const nav = useNavigate();
  const change = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/support/", inputs)
      nav("/SupportConfirmation");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="support">
      <div className="addressAndHours">
        <h1>Address</h1>
        <p>12345 Bronco Way, Bronco County, CA 54321 USA</p>
        <h1>Hours</h1>
        <p>Monday - Friday: 9:00AM - 5:00PM PST</p>
      </div>
      <div className="form">
      <form>
        <input
            className="name"
            required
            type="text"
            placeholder="Name"
            name="name"
            onChange={change}
        />
        <input
            className="email"
            required
            type="email"
            placeholder="E-mail"
            name="email"
            onChange={change}
        />
        <input
            className="subject"
            required
            type="text"
            placeholder="Subject"
            name="subject"
            onChange={change}
        />
        <input
            className="message"
            required
            type="text"
            placeholder="Message"
            name="message"
            onChange={change}
        />
        <button onClick={submit}>Send message</button>
        {err && <p>{err}</p>}
        </form>
      </div>
    </div>
  );
};

export default Support;