import { database } from "../database.js";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM person WHERE email = ? OR username = ?";
  database.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Username already exists.");
    const q =
      "INSERT INTO person (username, email, password, firstname, lastname, role) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.firstname,
      req.body.lastname,
      req.body.role,
    ];
    database.query(q, [values], async (err, data) => {
      if (err) return res.status(500).json(err);

      const person_id = data.insertId;

      if (req.body.role === 'customer') {
        const customerQ = "INSERT INTO customer (`customerID`) VALUES (?)";
        const customerValues = [person_id];

        try {
          await new Promise((resolve, reject) => {
            database.query(customerQ, [customerValues], (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });
        } catch (err) {
          console.error("Error creating customer:", err);
          return res.status(500).json(err);
        }
      } else if (req.body.role === 'agent') {
        const agentQ = "INSERT INTO salesagent (`agentID`) VALUES (?)";
        const agentValues = [person_id];

        try {
          await new Promise((resolve, reject) => {
            database.query(agentQ, [agentValues], (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });
        } catch (err) {
          console.error("Error creating sales agent:", err);
          return res.status(500).json(err);
        }
      }

      return res.status(200).json("User has been successfully created.");
    });
  });
};


export const login = (req, res) => {
  const q = "SELECT * FROM person WHERE username = ?";
  database.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0)
      return res.status(404).json("Username does not exist.");
    if (req.body.password !== data[0].password)
      return res.status(401).json("Incorrect password.");
    const token = jwt.sign({ id: data[0].id, role: data[0].role }, "jwtkey");
    res.cookie("access_token", token, {
      httpOnly: false,
      sameSite: "lax"
    }).status(200).json(data[0]);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("Logout successful.");
};


