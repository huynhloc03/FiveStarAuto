import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SaleDistribution = () => {
  const [inputs, setInputs] = useState({
    agentID: "",
    orderID: "",
    customerID: "",
    associatedAgents: "",
    percentage: "",
  });
  const [err, setError] = useState(null);
  const nav = useNavigate();
  const change = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        agentID: parseInt(inputs.agentID),
        orderID: parseInt(inputs.orderID),
        customerID: parseInt(inputs.customerID),
        associatedAgents: inputs.associatedAgents,
        percentage: parseInt(inputs.percentage),
      };
      await axios.post("/saleDistribution/", data);
      nav("/SaleDistributionConfirmation");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="saleDistribution">
      <div className="addSale">
        <h1>Add Sale</h1>
      </div>
      <div className="form">
        <form>
          <input
            className="agentID"
            required
            type="text"
            placeholder="Agent ID"
            name="agentID"
            onChange={change}
          />
          <input
            className="orderID"
            required
            type="text"
            placeholder="Order ID"
            name="orderID"
            onChange={change}
          />
          <input
            className="customerID"
            required
            type="text"
            placeholder="Customer ID"
            name="customerID"
            onChange={change}
          />
          <input
            className="associatedAgents"
            required
            type="text"
            placeholder="Associated Agents"
            name="associatedAgents"
            onChange={change}
          />
          <input
            className="percentage"
            required
            type="text"
            placeholder="Percentage"
            name="percentage"
            onChange={change}
          />
          <button onClick={submit}>Submit</button>
          {err && <p>{JSON.stringify(err)}</p>}
        </form>
      </div>
    </div>
  );
};

export default SaleDistribution;