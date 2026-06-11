import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const PORT = config.PORT || 3000;

const startServer = async () => {
    try{
        const isConnected = await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            if (!isConnected) {
                console.warn("MongoDB is not connected. Auth routes will return a service unavailable response until the database is reachable.");
            }
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();