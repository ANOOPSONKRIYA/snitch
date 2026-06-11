import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
    });

    return token;
}

export const register = async (req, res) => {

    const { fullname, email, contact, password, isSeller = false } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }],
        });

        if (existingUser) {
            return res.status(400).json({ message: "Email or contact already in use" });
        }
        const user = new userModel({
            fullname, 
            email, 
            contact, 
            password, 
            role: isSeller ? "seller" : "buyer"
        });
        await user.save();
        const token = await sendTokenResponse(user, res);

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                contact: user.contact,
                role: user.role,
            },
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

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = await sendTokenResponse(user, res);

        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                contact: user.contact,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({
            message: "Error logging in user",
            error: process.env.NODE_ENV === "production" ? undefined : error.message,
        });
    }
};