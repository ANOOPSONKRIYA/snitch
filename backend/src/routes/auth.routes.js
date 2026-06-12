import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validator/auth.validator.js";
import { getCurrentUser, googleAuthFailure, googleAuthSuccess, login, register } from "../controllers/auth.controller.js";
import passport from "passport";

const router = Router();

router.post("/register", validateRegisterUser, register);

router.post("/login", validateLoginUser, login);

router.get("/me", getCurrentUser);

router.get("/google", 
    passport.authenticate("google", { scope: ["profile", "email"], session: false }));
router.get("/google/callback", 
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?google=failed`,
    }),
    googleAuthSuccess,
);

router.get("/google/failure", googleAuthFailure);

export default router;