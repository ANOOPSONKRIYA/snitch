import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegisterUser = [
    body("fullname")
        .isLength({ min: 3 })
        .withMessage("Full name must be at least 3 characters long"),
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match"),
    body("contact")
        .isLength({ min: 10, max: 10 })
        .matches(/^[0-9]{10}$/)
        .withMessage("Contact number must be exactly 10 numeric characters long"),
    body("isSeller")
        .optional()
        .isBoolean()
        .withMessage("isSeller must be a boolean value"),
        
    validateRequest
];

        export const validateLoginUser = [
            body("email")
                .isEmail()
                .withMessage("Please provide a valid email"),
            body("password")
                .notEmpty()
                .withMessage("Password is required"),

            validateRequest
        ];