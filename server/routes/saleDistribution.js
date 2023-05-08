import express from "express"
import { saleDistribution } from "../control/saleDistribution.js";
const router = express.Router();
router.post("/", saleDistribution);

export default router