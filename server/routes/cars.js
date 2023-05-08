import express from "express"
import {
    getCars,
    getCar,
    addCar,
    deleteCar,
    updateCar,
  } from "../control/car.js";
const router = express.Router()
router.get("/", getCars)
router.get("/:id", getCar)
router.post("/", addCar)
router.delete("/:id", deleteCar)
router.put("/:id",updateCar)

export default router