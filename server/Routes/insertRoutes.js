const express = require('express');
const router = express.Router();
const insertController = require('../Controllers/insertController');
const Assembly = require('../Models/Assembly');

router.post("/district", async(req, res)=> {
    try {
        await insertController.postAddDistrict(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
})

router.post("/constituency", async(req, res)=> {
    try {
        await insertController.postAddConstituency(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
})

router.post("/assembly", async(req, res)=> {
    try {
        await insertController.postAddAssembly(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
})

module.exports = router;