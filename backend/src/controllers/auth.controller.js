import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token);

    res.status(200).json({ token });
}

export const register = async (req, res) => {

    const { fullname, email, contact, password, role } = req.body;

    try {
        const existingUser = await userModel.findOne({ email }, { contact });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const user = new userModel({
            fullname, 
            email, 
            contact, 
            password, 
            role: isSeller ? "seller" : "buyer"
        });
        await sendTokenResponse(user, res);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
};