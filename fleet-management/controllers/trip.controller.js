const supabase = require("../config/supabase");

exports.createTrip = async (req, res) => {
  const { role, customer_id, vehicle_id, passengers, distance_km, location, start_date } = req.body;

  if (role !== "customer") {
    return res.status(403).json({ message: "Only customers can create trips" });
  }

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .single();

  if (!vehicle.isAvailable) {
    return res.status(400).json({ message: "Vehicle not available" });
  }

  if (passengers > vehicle.allowed_passengers) {
    return res.status(400).json({ message: "Passenger limit exceeded" });
  }

  await supabase.from("vehicles")
    .update({ isAvailable: false })
    .eq("id", vehicle_id);

  const { data, error } = await supabase.from("trips").insert([{
    customer_id,
    vehicle_id,
    passengers,
    distance_km,
    location,
    start_date
  }]).select();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json(data[0]);
};

exports.updateTrip = async (req, res) => {
  const { data, error } = await supabase
    .from("trips")
    .update(req.body)
    .eq("id", req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.json(data[0]);
};

exports.getTrip = async (req, res) => {
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(404).json({ message: "Trip not found" });

  res.json(data);
};

exports.deleteTrip = async (req, res) => {
  await supabase.from("trips").delete().eq("id", req.params.id);
  res.json({ message: "Trip deleted" });
};

exports.endTrip = async (req, res) => {
  const { data: trip } = await supabase
    .from("trips")
    .select("*")
    .eq("id", req.params.id)
    .single();

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", trip.vehicle_id)
    .single();

  const tripCost = trip.distance_km * vehicle.rate_per_km;

  await supabase.from("trips").update({
    isCompleted: true,
    tripCost
  }).eq("id", req.params.id);

  await supabase.from("vehicles")
    .update({ isAvailable: true })
    .eq("id", trip.vehicle_id);

  res.json({ message: "Trip ended", tripCost });
};
