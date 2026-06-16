import { body, validationResult } from 'express-validator';

function validateRequest(req, res, next) {
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    next();
}

export const createProductValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().isString().withMessage('Description must be a string'),
  validateRequest,
];