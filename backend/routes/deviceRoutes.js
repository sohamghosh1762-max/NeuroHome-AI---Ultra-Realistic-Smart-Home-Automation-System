const express = require("express");

const router = express.Router();

const {
    getDevices,
    createDevice,
    updateDevice
} = require("../controllers/deviceController");

router.get("/", getDevices);

router.post("/", createDevice);

router.put("/:id", updateDevice);

module.exports = router;