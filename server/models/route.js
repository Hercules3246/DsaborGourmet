const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const RouteSchema = Schema({
  name: String,
  description: String,
  dia: String,
  active: Boolean,
});

RouteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("route", RouteSchema);
