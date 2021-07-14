import { AppError } from "../utils/appError.js";
import { getEmail, saveEmployee, getEmployee, getEmployeeById, removeEmployee } from "../repositories/employeeDAO.js";
import logger from "../utils/logger.js";

const addEmployee = async (req, res,next) => {
    try {
        // logger.info(`${process.mainModule.filename.match(/[\w-]+\.js/gi)[0]}`);
        const { name, email, contact, address } = req.body;
         logger.info(`File name: employeeService.js Data passed ${name} ${email} ${contact} ${address}`);
        const email_fetched = await getEmail(email);
        
        if (email_fetched) {
            return next(new AppError("Email already exists!", 400));
        }

        const result = await saveEmployee(next, name, email, contact, address);
        if(result)
            logger.info(`Data added to the database ${result}`);
        
        return result;

    } catch (error) {
        next(new AppError("Something went wrong!", 500));
    }
};

const fetchEmployee = async (req,res,next) => {
    try {
        const employee = await getEmployee();
        // logger.info(`/response ${employee}`);
        return employee;
    } catch (error) {
        return next(new AppError("Error in fetching!", 400))
    }
}

const deleteEmployee = async (id,next) => {
    try {
        const employee = await getEmployeeById(id);
        console.log(employee, "em");

        if (!employee)
            next(new AppError("No employee with the ID exists!", 404));
        
        return await removeEmployee(id);
        
    } catch (error) {
        next(new AppError("Error in deleting!", 400))
    }
}

export { addEmployee, fetchEmployee, deleteEmployee };