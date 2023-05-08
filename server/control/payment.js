import { database } from "../database.js";
export const loan = (req, res) => {
    console.log("Received request loan:", req.body);
    const q = "INSERT INTO loan (`orderID`,`customerID`,`downPayment`,`termLength`, `monthlyPayment`, `interestRate`) VALUES (?) ON DUPLICATE KEY UPDATE `downPayment` = VALUES(`downPayment`), `termLength` = VALUES(`termLength`), `monthlyPayment` = VALUES(`monthlyPayment`), `interestRate` = VALUES(`interestRate`)";
    const values = [
      req.body.orderID,
      req.body.customerID,
      req.body.downPayment,
      req.body.termLength,
      req.body.monthlyPayment,
      req.body.interestRate,
    ];
  
    database.query(q, [values], (err, data) => {
      if (err) {
        console.error("Not working!:", err); 
        return res.status(500).json(err);
      }
      return res.status(200).json("Order has been successfully created.");
    });
  };
  export const lease = (req, res) => {
    console.log("Received request lease:", req.body);
    const q = "INSERT INTO lease (`orderID`,`customerID`,`downPayment`, `termLength`, `monthlyPayment`, `annualMileLimit`) VALUES (?) ON DUPLICATE KEY UPDATE `downPayment` = VALUES(`downPayment`), `termLength` = VALUES(`termLength`), `monthlyPayment` = VALUES(`monthlyPayment`), `annualMileLimit` = VALUES(`annualMileLimit`)";
    const values = [
      req.body.orderID,
      req.body.customerID,
      req.body.downPayment,
      req.body.termLength,
      req.body.monthlyPayment,
      req.body.annualMileLimit,
    ];
  
    database.query(q, [values], (err, data) => {
      if (err) {
        console.error("Not working!:", err); 
        return res.status(500).json(err);
      }
      return res.status(200).json("Order has been successfully created.");
    });
  };

  export const cashCustomer = (req, res) => {
    console.log("Received request:", req.body);
  
    const customerQuery = "INSERT INTO customer (`customerID`, `creditCard`) VALUES (?) ON DUPLICATE KEY UPDATE `creditCard` = VALUES(`creditCard`)";
    const customerValues = [req.body.customerID, req.body.creditCard];
  
    const cashQuery = "INSERT INTO cash (`orderID`, `customerID`, `paymentAmount`) VALUES (?) ON DUPLICATE KEY UPDATE `paymentAmount` = VALUES(`paymentAmount`)";
    const cashValues = [req.body.orderID, req.body.customerID, req.body.paymentAmount];
  
    database.beginTransaction((transactionError) => {
      if (transactionError) {
        console.error("Transaction error:", transactionError);
        return res.status(500).json(transactionError);
      }
  
      database.query(customerQuery, [customerValues], (customerError) => {
        if (customerError) {
          console.error("Customer query error:", customerError);
          return database.rollback(() => res.status(500).json(customerError));
        }
  
        database.query(cashQuery, [cashValues], (cashError) => {
          if (cashError) {
            console.error("Cash query error:", cashError);
            return database.rollback(() => res.status(500).json(cashError));
          }
  
          database.commit((commitError) => {
            if (commitError) {
              console.error("Commit error:", commitError);
              return database.rollback(() => res.status(500).json(commitError));
            }
            return res.status(200).json("Order has been successfully created.");
          });
        });
      });
    });
  };
  