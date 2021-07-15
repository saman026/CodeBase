import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        console.log("Database connected");
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;
