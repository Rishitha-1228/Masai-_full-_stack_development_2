import express from 'express';
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} from '../controllers/order.controller.js';

import {
  validateCreateOrder,
  validateUpdateOrder
} from '../validations/order.validation.js';

const router = express.Router();

router.post('/add-order', validateCreateOrder, createOrder);
router.get('/get-my-orders/:customerId', getOrders);
router.put('/update-order/:orderId', validateUpdateOrder, updateOrder);
router.delete('/delete-order/:orderId', deleteOrder);

export default router;
