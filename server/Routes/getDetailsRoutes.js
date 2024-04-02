const express = require('express');
const router = express.Router();
const District = require('../Models/DistrictModel');
const Constituency = require('../Models/Constituency');
const Assembly = require('../Models/Assembly');

router.get("/districtV4", async(req, res)=> {
    const districts = await District.find(); 
    res.json(districts);
});

router.get('/constituencies/:district', async (req, res) => {
    const { district } = req.params;
    try {
        const constituencies = await Constituency.find({ district: district });
        res.status(200).json(constituencies);
    } catch (error) {
        console.error('Error fetching constituencies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/assemblies/:constituencyId', async (req, res) => {
    const { constituencyId } = req.params;
    try {
       
        const assemblies = await Assembly.find({ constituency: constituencyId });
        res.status(200).json(assemblies);
    } catch (error) {
        console.error('Error fetching assemblies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
