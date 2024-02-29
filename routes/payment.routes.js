const { Router } = require("express");
const { processPayment } = require("../controllers/payment.controller");

const router = Router();

router.post("/payment", processPayment);

module.exports = router;