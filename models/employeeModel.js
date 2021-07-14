import mongoose from "mongoose";
import validator from "validator";
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
    contact: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    }
});

export default mongoose.model("employee", employeeSchema);

