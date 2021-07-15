import Employee from "../models/employeeModel.js";
import AppError from "../utils/appError.js";

const getEmail = async (email) => {
    try {
        return await Employee.findOne({ email });
    } catch (error) {
        return next(new AppError("Error in fetching email!", 400));
    }
};

const saveEmployee = async (next, ...data) => {
    try {
        const employee = new Employee({
            name: data[0],
            email: data[1],
            password: data[2],
            contact: data[3],
            address: data[4]
        });
       
        return await employee.save();
        
    } catch (error) {
        next(new AppError("Error in adding!", 400))
    }
};

const getEmployee = async () => {
    try {
        return await Employee.find({});
    } catch (error) {
        return next(new AppError("Error in fetching!", 400));
    }
};

const getEmployeeById = async (id) => {
    try {
        return await Employee.findById({ _id: id });
    } catch (error) {
        next(new AppError("Error in fetching by ID!", 400));
    }
};

const editEmployee = async(id,name,address) => {
    try {
        return await Employee.findOneAndUpdate({ _id: id }, { name, address });
    } catch (error) {
        next(new AppError("Error in updating!", 400));
    }
}

const removeEmployee = async(id) => {
    try {
        return await Employee.findByIdAndRemove({ _id: id });
    } catch (error) {
         next(new AppError("Error in deleting!", 400))
    }
}

export { getEmail, saveEmployee, getEmployee, getEmployeeById, removeEmployee, editEmployee };