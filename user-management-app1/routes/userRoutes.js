const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { createUserValidation, userIdValidation } = require('../validations/userValidation');

router.post('/', createUserValidation, userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userIdValidation, userController.getUserById);
router.put('/:id', userIdValidation, userController.updateUser);
router.delete('/:id', userIdValidation, userController.deleteUser);

module.exports = router;
