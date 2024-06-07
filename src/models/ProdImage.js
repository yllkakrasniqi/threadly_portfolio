const mongoose = require("mongoose");

const ProdImage_Schema = mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    filename: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    prod_color_id: { type: mongoose.Schema.ObjectId, ref: "ProdColor" },
  },
  { autoCreate: false }
);

module.exports = ProdImage = mongoose.model("ProdImage", ProdImage_Schema);
