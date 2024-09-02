const { CarModel } = require("../Models/CarsModel");

const ListNewCar = async (req, res) => {
  try {
    const { make, model, year, mileage, price, description, images, auctionEndTime } = req.body;

    if (isNaN(new Date(auctionEndTime).getTime())) {
      return res.status(400).json({ message: "Invalid auction end time format" });
    }

    const newCar = new CarModel({
      make,
      model,
      year,
      mileage,
      price,
      description,
      images,
      auctionEndTime,
      currentBid: 0,
      bidHistory: [],
    });

    await newCar.save();

    res.status(201).json({ message: "Car listed successfully", car: newCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = ListNewCar;
