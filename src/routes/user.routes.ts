import express from "express";
import validateResource from "../middleware/validateResource";
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from "../schema/user.schema";
import { createUserHandler, forgotPasswordHandler, resetPasswordHandler, verifyUserHandler } from "../controllers/user.controller";

const router = express.Router();

router.post("/api/users", validateResource(createUserSchema), createUserHandler)
router.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler)
router.post("/api/users/forgotpassword", validateResource(forgotPasswordSchema), forgotPasswordHandler);
router.post("/api/users/resetpassword/:id/:passwordResetCode", validateResource(resetPasswordSchema), resetPasswordHandler);

export default router;