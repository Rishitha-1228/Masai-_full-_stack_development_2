module.exports = (req, res) => {
  res.status(404).json({ message: "Request is not Found" });
};
