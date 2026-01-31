const supabase = require("../config/supabase");

exports.analytics = async (req, res) => {
  const customers = await supabase.from("users").select("id", { count: "exact" }).eq("role", "customer");
  const owners = await supabase.from("users").select("id", { count: "exact" }).eq("role", "owner");
  const drivers = await supabase.from("users").select("id", { count: "exact" }).eq("role", "driver");
  const vehicles = await supabase.from("vehicles").select("id", { count: "exact" });
  const trips = await supabase.from("trips").select("id", { count: "exact" });

  res.json({
    total_customers: customers.count,
    total_owners: owners.count,
    total_drivers: drivers.count,
    total_vehicles: vehicles.count,
    total_trips: trips.count
  });
};
