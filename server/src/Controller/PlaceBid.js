const { CarModel } = require("../Models/CarsModel");

const PlaceBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const userId = req.user.id;

    const car = await CarModel.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const existingBidIndex = car.bidHistory.findIndex((bid) => bid.user?.toString() === userId);

    if (existingBidIndex !== -1) {
      car.bidHistory[existingBidIndex].amount = amount;
      car.bidHistory[existingBidIndex].timestamp = new Date();
    } else {
      car.bidHistory.push({
        user: userId,
        amount: amount,
        timestamp: new Date(),
      });
    }

    console.log(amount);
    console.log(car.currentBid);
    if (amount > car.currentBid) {
      console.log("greater");
      car.currentBid = amount;
    }
    await car.save();

    res.status(200).json({ message: "Bid placed successfully", car });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = PlaceBid;
