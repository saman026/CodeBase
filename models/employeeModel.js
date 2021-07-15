import mongoose from "mongoose";
import validator from "validator";
import { hashPassword } from "../utils/functions.js";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: true,
         minlength: 8,
    },
    address: {
        type: String,
        required: true
    }
});

employeeSchema.pre('save', async function(next){
    this.password = await hashPassword(this.password);
    next();
});

export default mongoose.model("employee", employeeSchema);

