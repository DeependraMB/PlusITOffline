const express = require('express');
const router = express.Router();

const insertRoutes = require('./insertRoutes');
const getDetailsRoutes = require('./getDetailsRoutes')

router.use('/insert',insertRoutes);

router.use('/admin', getDetailsRoutes);

module.exports = router;