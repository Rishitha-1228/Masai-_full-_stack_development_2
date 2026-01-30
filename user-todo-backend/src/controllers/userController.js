import { supabase } from '../config/supabaseClient.js';

export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: 'User registered', user: data[0] });
};
