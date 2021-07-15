import express from "express";
import { check } from "express-validator";
import { addEmployee, loginEmployee, getEmployee, updateEmployee, deleteEmployee } from "../controllers/employeeController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.route('/employee')
  .post(
    [
      check("name", "Name is required!").not().isEmpty(),
      check("email", "Enter valid email!").isEmail(),
      check(
        "password",
        "Please enter a password with 8 or more characters"
      ).isLength({ min: 8 })
    ],
    addEmployee
  )
  .get(protect, getEmployee)
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee)


router.post('/employee/login',
  [
    check("email", "Enter valid email!").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 })
  ],
  loginEmployee
)
  

export default router;