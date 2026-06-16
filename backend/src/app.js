import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import { config } from "./config/config.js";
import cors from "cors";
import { upsertGoogleUser } from "./controllers/auth.controller.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await upsertGoogleUser(profile);
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Snitch API!" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

export default app;