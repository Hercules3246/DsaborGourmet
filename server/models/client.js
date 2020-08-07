const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const ClientSchema = Schema({
  idClient: Number,
  name: String,
  businessName: String,
  phoneNumber: String,
  route: String,
  neighborhood: String,
  active: Boolean,
});

ClientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("client", ClientSchema);
