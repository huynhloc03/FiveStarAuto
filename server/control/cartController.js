import { database } from "../database.js"

export const createOrder = (req, res) => {
  console.log("Received request:", req.body);
  const q = "INSERT INTO carorder (`customerID`,`vehiclePrice`, `purchaseDate`, `paymentOption`) VALUES (?)";
  const values = [
    req.body.customerID,
    req.body.vehiclePrice,
    req.body.purchaseDate,
    req.body.paymentOption,
  ];

  database.query(q, [values], (err, data) => {
    if (err) {
      console.error("Not working!:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json({ orderID: data.insertId });
  });
};


export const getOrders = (req, res) => {
  const q = "SELECT * FROM carorder";

  database.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json(err);
    }
    return res.status(200).json(data);
  });
};


export const getOrderID = (req, res) => {
  const q = "SELECT MAX(orderID) AS orderID FROM carorder"; 
  database.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ orderID: data[0].orderID + 1 });
  });
};
