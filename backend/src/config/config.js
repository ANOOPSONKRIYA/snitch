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

export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
};
