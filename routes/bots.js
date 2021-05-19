const receiverHandler =  require('../controller/receiverHandler');
const express = require("express");
const router = express.Router();

router.post("/receiver", receiverHandler.receiver);

module.exports = router;
