const { CarModel } = require("../Models/CarsModel");

const GetUserBids = async (req, res) => {
  try {
    const userId = req.user.id;

    const carsWithBids = await CarModel.find({ "bidHistory.user": userId });

    const userBids = carsWithBids.map((car) => ({
      _id: car._id,
      make: car.make,
      model: car.model,
      year: car.year,
      images: car.images,
      auctionEndTime: car.auctionEndTime,
      mileage: car.mileage,
      bidHistory: car.bidHistory,
      currentBid: car.currentBid,
      userBid: car.bidHistory.find((bid) => bid.user.toString() === userId),
    }));

    res.status(200).json({ docs: userBids });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = GetUserBids;
