const express = require('express');
const router = express.Router();
const { generatePresignUrl } = require('../controllers/presignController');

router.get('/presign', generatePresignUrl);

module.exports = router;