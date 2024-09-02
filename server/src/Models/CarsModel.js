const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }],
    currentBid: { type: Number, default: 0 },
    bidHistory: [
      {
        amount: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    auctionEndTime: {
      type: Date,
      required: true,
      default: function () {
        return Date.now() + 7 * 24 * 60 * 60 * 1000;
      },
    },
  },
  { timestamps: true }
);

const CarModel = mongoose.model("cars", CarSchema);

module.exports = {
  CarModel,
};
