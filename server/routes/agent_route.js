import express from "express"
import { agent } from "../control/agent.js";
const router = express.Router();
router.post("/", agent);
export default router