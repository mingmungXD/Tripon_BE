const express = require('express');
const router = express.Router();
const multer = require('multer');
const analyzeController = require('../controllers/analyzeController');

const upload = multer();

router.post('/', upload.single('file'), analyzeController.analyze);

module.exports = router;
