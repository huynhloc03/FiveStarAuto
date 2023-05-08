import { database } from "../database.js"
export const getCars = (req,res)=>{
    const q = req.query.cat ? "SELECT * FROM cars WHERE cat=?" :
    "SELECT * FROM cars"
    database.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.send(err)

        return res.status(200).json(data)
    })
}
export const getCar = (req, res) => {
    const q = "SELECT `cars_info`, `cars_description`, `img`, `cat`, `price` FROM cars WHERE cars_id = ?";
    database.query(q, [req.params.id], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) return res.status(404).json("Car not found.");
      return res.status(200).json(data[0]);
    });
};

  
export const addCar = (req,res)=>{
    const q = "INSERT INTO cars (`cars_info`, `cars_description`, `img`, `cat`, `price`) VALUES (?)"
    const values = [
        req.body.cars_info,
        req.body.cars_description,
        req.body.img,
        req.body.cat,
        req.body.price,
      ];
    database.query(q,[values], (err,data)=>{
        if (err) return res.status(500).json(err);
        return res.json("Car has been added")
    })
}

export const deleteCar = (req,res)=>{
    res.json("from control")
}
export const updateCar = (req,res)=>{
    res.json("from control")
}