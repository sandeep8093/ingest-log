const express = require('express');
const router = express.Router();
const logController = require('../controllers/log.controller');

// Route for adding a new log
router.post('/ingest', logController.ingestLog);

// Route for the leaderboard list by language
router.get('/search', logController.queryLog);

module.exports = router;