import express from "express";
import { getCustomerID } from "../control/customer.js";
const router = express.Router();
router.get("/:personID", getCustomerID);
export default router;