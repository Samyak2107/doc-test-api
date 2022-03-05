const express = require("express");
const router = express.Router();
// const { check, validationResult, body } = require("express-validator");

/* Controllers */
const patientsController = require("../controllers/patients");

// router.post(
//   "/sign-up",
//   [check("email").isEmail(), check("password").isLength({ min: 6 })],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//       });
//     }
//     usersController.handleNewUser(req, res);
//   }
// );

// router.post("/login", (req, res) => {
//   usersController.handleLogin(req, res);
// });

// router.post("/refresh", (req, res) => {
//   usersController.handleRefreshToken(req, res);
// });

router.post("/patient", (req, res) => {
  patientsController.handleNewPatient(req, res);
});

router.get("/patient-list", (req, res) => {
  patientsController.handleSendPatients(req, res);
});

module.exports = router;
