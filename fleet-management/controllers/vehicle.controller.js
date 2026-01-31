const supabase = require("../config/supabase");

exports.addVehicle = async (req, res) => {
  const { role, owner_id, name, registration_number, allowed_passengers, rate_per_km } = req.body;

  if (role !== "owner") {
    return res.status(403).json({ message: "Only owners can add vehicles" });
  }

  const { error } = await supabase.from("vehicles").insert([{
    name,
    registration_number,
    allowed_passengers,
    rate_per_km,
    owner_id
  }]);

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: "Vehicle added successfully" });
};

exports.assignDriver = async (req, res) => {
  const { driver_id } = req.body;

  const { error } = await supabase
    .from("vehicles")
    .update({ driver_id })
    .eq("id", req.params.id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Driver assigned successfully" });
};

exports.getVehicle = async (req, res) => {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(404).json({ error: error.message });

  res.json(data);
};
