const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  complaints: { type: String, required: true },
  findings: { type: String, required: true },
  advice: { type: String, required: true },
  treatment: { type: String, required: true },
  finalDiagnosis: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patient", patientSchema);
