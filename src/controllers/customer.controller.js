import { supabase } from '../config/supabase.js';

export const registerCustomer = async (req, res) => {
  const { full_name, email, phone } = req.body;

  const { error } = await supabase
    .from('customers')
    .insert([{ full_name, email, phone }]);

  if (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: 'Customer registered successfully' });
};
