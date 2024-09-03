import express from "express";
import { login, registration } from "../controllers/registrationController.js";
import { signupValidation } from "../middlewares/AuthValidation.js";

const router = express.Router();

router.post("/registration", signupValidation, registration);
router.post("/login", login);
export default router;
