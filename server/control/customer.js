import { database } from "../database.js";
export const getCustomerID = (req, res) => {
    const q = "SELECT customerID FROM customer WHERE customerID = ?";
    database.query(q, [req.params.personID], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Customer not found.");
      return res.status(200).json({ customerID: data[0].customerID });
    });
  };
  