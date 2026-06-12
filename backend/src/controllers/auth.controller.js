import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

function buildUserResponse(user) {
    return {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        contact: user.contact,
        role: user.role,
        authProvider: user.authProvider,
        googleId: user.googleId,
    };
}

async function sendTokenResponse(user, res) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
    });

    return token;
}

export async function upsertGoogleUser(profile) {
    const email = profile.emails?.[0]?.value?.toLowerCase();

    if (!email) {
        throw new Error("Google account does not provide an email address");
    }

    const fullname = profile.displayName || profile.name?.givenName || email.split("@")[0];
    const googleId = profile.id;

    let user = await userModel.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
        user.fullname = user.fullname || fullname;
        user.googleId = googleId;
        user.authProvider = "google";

        if (!user.contact) {
            user.contact = "";
        }

        await user.save();
        return user;
    }

    user = await userModel.create({
        fullname,
        email,
        contact: "",
        password: "",
        authProvider: "google",
        googleId,
        role: "buyer",
    });

    return user;
}

export const register = async (req, res) => {

    const { fullname, email, contact, password, isSeller = false } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }],
        });

        if (existingUser) {
            if (existingUser.authProvider === "google") {
                return res.status(409).json({
                    message: "An account with this email already exists. Sign in with Google instead.",
                });
            }

            return res.status(400).json({ message: "Email or contact already in use" });
        }
        const user = new userModel({
            fullname, 
            email, 
            contact, 
            password, 
            role: isSeller ? "seller" : "buyer",
            authProvider: "local",
        });
        await user.save();
        const token = await sendTokenResponse(user, res);

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: buildUserResponse(user),
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            message: "Error registering user",
            error: process.env.NODE_ENV === "production" ? undefined : error.message,
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (user.authProvider === "google" && !user.password) {
            return res.status(400).json({
                message: "This account uses Google sign-in. Continue with Google to log in.",
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await sendTokenResponse(user, res);

        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: buildUserResponse(user),
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({
            message: "Error logging in user",
            error: process.env.NODE_ENV === "production" ? undefined : error.message,
        });
    }
};

export const googleAuthSuccess = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Google authentication failed" });
    }

    await sendTokenResponse(req.user, res);

    const redirectUrl = new URL("/login", config.FRONTEND_URL);
    redirectUrl.searchParams.set("google", "success");

    return res.redirect(redirectUrl.toString());
};

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const payload = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(payload.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user: buildUserResponse(user) });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired session",
            error: process.env.NODE_ENV === "production" ? undefined : error.message,
        });
    }
};

export const googleCallback = googleAuthSuccess;

export const googleAuthFailure = async (_req, res) => {
    const redirectUrl = new URL("/login", config.FRONTEND_URL);
    redirectUrl.searchParams.set("google", "failed");

    return res.redirect(redirectUrl.toString());
};