const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  age: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patient", patientSchema);
