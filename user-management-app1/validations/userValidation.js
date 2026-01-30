const { body, param } = require('express-validator');

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('age')
    .optional()
    .isInt({ min: 18 })
    .withMessage('Age must be 18 or above')
];

exports.userIdValidation = [
  param('id').isUUID().withMessage('Invalid User ID')
];
