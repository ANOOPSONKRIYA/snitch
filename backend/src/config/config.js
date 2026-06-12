import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
}

if(!process.env.PORT) {
    console.error("PORT is not defined in .env file");
    process.exit(1);
}

if(!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in .env file");
    process.exit(1);
}

if(!process.env.GOOGLE_CLIENT_ID) {
    console.error("GOOGLE_CLIENT_ID is not defined in .env file");
    process.exit(1);
}

if(!process.env.GOOGLE_CLIENT_SECRET) {
    console.error("GOOGLE_CLIENT_SECRET is not defined in .env file");
    process.exit(1);
}

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL:
        process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/auth/google/callback",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
