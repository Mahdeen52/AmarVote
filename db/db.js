import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
const connectDB = async() => {
    try{ 
            if (!process.env.MONGO_URL) {
            throw new Error("MONGODB_URL not found in environment variables");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)

        console.log(`MongoDB connect in host: ${connectionInstance.connection.host}`);
        return connectionInstance;
    }

    catch(error) {
        console.error("Error connecting to MongoDB",error);
        process.exit(1);
    }
};

export default connectDB; 