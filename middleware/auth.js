import jwt from "jsonwebtoken";
import { promisify } from "util";
import { getEmployeeById } from "../repositories/employeeDAO.js";
import AppError from "../utils/appError.js";



const protect = async (req, res, next ) =>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return next(new AppError("You are not logged in!",404));
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await getEmployeeById(decoded.id)
        if(!currentUser){
            return next(new AppError("The user no longer exists",404));
        }

        req.user = currentUser;
        next();
    }catch(err){
        next(new AppError("Invalid Token!",400));
    }
}

export default protect;