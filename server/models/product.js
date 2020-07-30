const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const ProductSchema = Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  order: Number,
});

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("product", ProductSchema);
