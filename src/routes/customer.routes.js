import express from 'express';
import { registerCustomer } from '../controllers/customer.controller.js';
import { validateCustomer } from '../validations/customer.validation.js';

const router = express.Router();

router.post('/register', validateCustomer, registerCustomer);

export default router;
