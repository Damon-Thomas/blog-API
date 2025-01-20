import { body } from "express-validator"

const inputValidator = [
  body("userName")
  .trim()
  .isLength({ min: 1, max: 20 })
  .withMessage("Username required length 1-20")
  .bail()
  .isAlphanumeric()
  .withMessage("Must be Alphanumeric"),
  body("password") 
  .trim()
  .notEmpty()
  .withMessage("Password Required")
  .bail()
  .isLength({ min: 1, max: 20 })
  .withMessage("Length must be between 1-20"),
  body("confirmPassword") 
  .trim()
  .custom((value, { req }) => {
    return value === req.body.password;
  }).withMessage("Passwords do not Match"),

]

export default inputValidator;