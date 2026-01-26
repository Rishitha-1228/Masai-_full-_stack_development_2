import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import customerRoutes from './routes/customer.routes.js';
import orderRoutes from './routes/order.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
