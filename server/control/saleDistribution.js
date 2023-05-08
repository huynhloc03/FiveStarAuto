import { database } from "../database.js";

export const saleDistribution = (req, res) => {
    console.log("Received request:", req.body);

  const q =
    "INSERT INTO saledistribution  (agentID, orderID, customerID, associatedAgents, percentage) VALUES (?)";
  const values = [
    req.body.agentID,
    req.body.orderID,
    req.body.customerID,
    req.body.associatedAgents,
    req.body.percentage
  ];
  database.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Sale has been successfully created.");
  });
};