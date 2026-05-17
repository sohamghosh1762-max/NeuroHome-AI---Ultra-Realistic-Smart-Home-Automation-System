const Device = require("../models/Device");

exports.getDevices = async (req, res) => {
    try {

        const devices = await Device.find();

        res.json(devices);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.createDevice = async (req, res) => {

    try {

        const newDevice = new Device(req.body);

        await newDevice.save();

        res.status(201).json(newDevice);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.updateDevice = async (req, res) => {

    try {

        const updatedDevice =
        await Device.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedDevice);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};