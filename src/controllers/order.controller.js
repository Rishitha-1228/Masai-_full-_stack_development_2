import { supabase } from '../config/supabase.js';

export const createOrder = async (req, res) => {
  const { product_name, quantity, price, customerId } = req.body;

  const { data: customer } = await supabase
    .from('customers')
    .select('id')
    .eq('id', customerId)
    .single();

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const { error } = await supabase.from('orders').insert([{
    product_name,
    quantity,
    price,
    customer_id: customerId
  }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Order created' });
};

export const getOrders = async (req, res) => {
  const { customerId } = req.params;

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', customerId);

  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;

  const { error } = await supabase
    .from('orders')
    .update(req.body)
    .eq('id', orderId);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Order updated' });
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Order deleted' });
};
