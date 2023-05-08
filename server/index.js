import express from "express";
import carRoutes from "./routes/cars.js"
import authenticationRoutes from "./routes/authentication.js"
import cookieParse from "cookie-parser"
import supportRoutes from "./routes/support.js"
import cartRoutes from "./routes/cart_route.js"
import paymentRoutes from "./routes/payment_route.js"
import customerRoutes from "./routes/customer_route.js"
import saleDistributionRoutes from "./routes/saleDistribution.js"

import multer from "multer"
const app = express()
app.use(express.json())
app.use(cookieParse())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ file.originalname)
  },
})
const upload = multer({ storage })

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file =req.file;
    res.status(200).json(file.filename)
  })
app.use("/api/cars",carRoutes)
app.use("/api/authentication",authenticationRoutes)
app.use("/api/support", supportRoutes)
app.use("/api/order", cartRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/customer", customerRoutes)
app.use("/api/saleDistribution", saleDistributionRoutes)
app.listen(5000, () =>{
    console.log("Server running on port 5000")
})
