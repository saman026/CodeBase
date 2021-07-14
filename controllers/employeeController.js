import { validationResult } from "express-validator";
import { register, login, fetch, edit, remove } from "../services/employeeService.js";
import { AppError } from "../utils/appError.js";


const addEmployee = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError(errors, 400));
    }
    try {
        const result = await register(req, res, next);
        res.json({ data: result });
    } catch (err) {
        next(new AppError("Error in adding!", 500))
    }
};


const loginEmployee = async (req, res, next) => {
    try {
        const token = await login(req, res, next);
        res.json({ token });
    } catch (error) {
        next(new AppError("Error in login!", 400));
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await fetch();
        res.json({ data: employee });
    } catch (error) {
        next(new AppError("Error in fetching!", 400));
    }
};


const updateEmployee = async (req, res, next) => {
    try {
        const { name, address } = req.body;
        const employee = await edit(req.user.id, name, address, next);
        res.json({ data: employee });
    } catch (error) {
        next(new AppError("Error in updating!", 400));
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await remove(req.user.id, next);
        res.json({ data: employee });
    } catch (error) {
        next(new AppError("Error in deleting!", 400));
    }
};

export { addEmployee, loginEmployee, getEmployee, deleteEmployee, updateEmployee };