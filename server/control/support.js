import { database } from "../database.js";

export const support = (req, res) => {
  const q =
    "INSERT INTO inquiry (name, email, subject, message) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.subject,
    req.body.message,
  ];
  database.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Inquiry has been successfully created.");
  });
};