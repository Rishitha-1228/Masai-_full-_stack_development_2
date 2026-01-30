import { supabase } from '../config/supabaseClient.js';

// ➕ Add Todo
export const addTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ message: 'Title and userId required' });
  }

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { data, error } = await supabase
    .from('todos')
    .insert([{ title, description, user_id: userId }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ todo: data[0] });
};

// 📥 Get User Todos
export const getUserTodos = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ todos: data });
};

// ✏️ Update Todo
export const updateTodo = async (req, res) => {
  const { todoId } = req.params;

  const { data, error } = await supabase
    .from('todos')
    .update(req.body)
    .eq('id', todoId)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data.length) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json({ updatedTodo: data[0] });
};

// ❌ Delete Todo  ✅ THIS MUST EXIST
export const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: 'Todo deleted successfully' });
};
