import express from "express";
import { createOrder, getOrders, getOrderID } from "../control/cartController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/", getOrderID);

export default router;
