import express from "express";
import { check } from "express-validator";
import { addEmployee, getEmployee, deleteEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.route('/employee')
  .get(getEmployee)

  .post([
    check("name","Name is required!").not().isEmpty(),
    check("email","Enter valid email!").isEmail()
  ],addEmployee)
  
  
router.route('/employee/:id')
  .delete(deleteEmployee)


export { router as Employee };