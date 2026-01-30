const supabase = require('../config/supabaseClient');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// CREATE USER
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password, age } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase.from('users').insert([
    { name, email, password: hashedPassword, age }
  ]);

  if (error)
    return res.status(400).json({ message: error.message });

  res.status(201).json({ message: 'User created successfully' });
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('id,name,email,age,role,created_at');

  if (error)
    return res.status(500).json({ message: error.message });

  res.json(data);
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (!data)
    return res.status(404).json({ message: 'User not found' });

  res.json(data);
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('users')
    .update(req.body)
    .eq('id', id);

  if (error)
    return res.status(400).json({ message: error.message });

  res.json({ message: 'User updated successfully' });
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error)
    return res.status(400).json({ message: error.message });

  res.json({ message: 'User deleted successfully' });
};
