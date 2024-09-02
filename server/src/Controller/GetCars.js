const { CarModel } = require("../Models/CarsModel");

const GetCars = async (req, res) => {
  try {
    const { make, year, sortBy, sortOrder = "asc", page = 1, limit = 9 } = req.query;
    let query = {};
    if (make) query.make = brand;
    if (year) query.year = year;

    let sortCriteria;
    if (sortBy) {
      sortCriteria = {};
      sortCriteria[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const cars = await CarModel.find(query)
      .sort(sortCriteria || { createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalDocuments = await CarModel.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      docs: cars,
      totalDocs: totalDocuments,
      totalPages: totalPages,
      limit: parseInt(limit),
      page: parseInt(page),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = GetCars;
