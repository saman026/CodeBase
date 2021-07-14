import { validationResult } from "express-validator";
import { addEmployee as add, fetchEmployee as fetch, deleteEmployee as del } from "../services/employeeService.js";
import { AppError } from "../utils/appError.js";
import logger from "../utils/logger.js";

const getEmployee = async (req, res) => {
    try {
        const employee = await fetch();
        res.json({ data: employee });
    } catch (error) {
        return next(new AppError("Error in fetching!", 400));
    }
}

const addEmployee = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.errors);
        // (errors.errors.map((i, j) => {
        //     logger.error(i.msg)
        // }));
        return next(new AppError(errors, 400));
    }
    try {
        const result = await add(req, res, next);
        res.json({ data: result });
    } catch (err) {
        return next(new AppError("Something went wrong", 500))
    }
}

const deleteEmployee = async (req,res,next) => {
    console.log(req.params.id);
    try {
        const employee = await del(req.params.id,next);
        res.json({ data: employee });
    } catch (error) {
        return next(new AppError("Error in deleting!", 400));
    }
}

export { addEmployee, getEmployee, deleteEmployee };