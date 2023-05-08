import express from "express"
import { support } from "../control/support.js";
const router = express.Router();
router.post("/", support);
export default router