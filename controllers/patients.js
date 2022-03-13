const mongoose = require("mongoose");
const Patient = require("../models/patient");

const handleNewPatient = (req, res) => {
  const {
    id,
    name,
    age,
    gender,
    mobile,
    address,
    complaints,
    findings,
    investigation,
    advice,
    treatment,
    finalDiagnosis,
  } = req.body;
  const newPatient = new Patient({
    id,
    name,
    age,
    gender,
    mobile,
    address,
    complaints,
    findings,
    investigation,
    advice,
    treatment,
    finalDiagnosis,
  });
  newPatient
    .save()
    .then((patient) => {
      res.json(patient);
    })
    .catch((err) => {
      res.json(err);
    });
};

const handleSendPatients = (req, res) => {
  Patient.find()
    .then((patients) => {
      res.json(patients);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = { handleNewPatient, handleSendPatients };
