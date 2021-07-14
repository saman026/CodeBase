import { AppError } from "../utils/appError.js";
import { getEmail, saveEmployee, getEmployee, getEmployeeById, removeEmployee, editEmployee } from "../repositories/employeeDAO.js";
import logger from "../utils/logger.js";
import bcrypt from "bcrypt";
import { generateToken, checkPassword } from "../utils/functions.js";

const register = async (req, res, next) => {
    try {
        // logger.info(`${process.mainModule.filename.match(/[\w-]+\.js/gi)[0]}`);
        const { name, email, password, contact, address } = req.body;
        logger.info(`File name: employeeService.js Data passed ${name} ${email} ${password} ${contact} ${address}`);
        const email_fetched = await getEmail(email);
        
        if (email_fetched) {
            return next(new AppError("Email already exists!", 400));
        }

        const result = await saveEmployee(next, name, email, password, contact, address);
        if (result)
            logger.info(`Data added to the database!`);
        
        return result;

    } catch (error) {
        next(new AppError("Something went wrong!", 500));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const email_fetched = await getEmail(email);
        
        if (!email_fetched) {
            next(new AppError("No such email exists!", 404));
            return;
        }

        const isMatch = await checkPassword(password, email_fetched.password);
        if (!isMatch) {
            next(new AppError("Invalid credentials", 400));
            return;
        }
        const payload = {
            id: email_fetched._id,
        }
        const token = generateToken(payload.id);

        if (!token)
            next(new AppError("Error in token generation", 400));
        else
            return token;

    } catch (error) {
        next(new AppError("Error while signin", 400));
    }
};

const fetch = async (req, res, next) => {
    try {
        return await getEmployee();
        // logger.info(`/response ${employee}`);
    } catch (error) {
        return next(new AppError("Error in fetching!", 400))
    }
};

const edit = async (id, name, address, next) => {
    try {
        const employee = await getEmployeeById(id);

        if (!employee)
            next(new AppError("No employee with the ID exists!", 404));
        else
            return await editEmployee(id, name, address);
    } catch (error) {
        next(new ApppError("Error in editing", 400));
    }
};

const remove = async (id, next) => {
    try {
        const employee = await getEmployeeById(id);

        if (!employee)
            next(new AppError("No employee with the ID exists!", 404));
        else
            return await removeEmployee(id);
        
    } catch (error) {
        next(new AppError("Error in deleting!", 400))
    }
};

export { register, login, fetch, edit, remove };