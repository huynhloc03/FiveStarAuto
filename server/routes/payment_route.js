import express from "express"
import { lease,loan,cashCustomer } from "../control/payment.js";
const router = express.Router();
router.post("/loan", loan);
router.post("/lease", lease);
router.post("/cashCustomer",cashCustomer);
export default router