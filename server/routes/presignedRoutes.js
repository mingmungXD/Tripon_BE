const express = require('express');
const router = express.Router();

const { generatePresignUrl } = require('../controllers/presignedController');

router.get('/', generatePresignUrl);

module.exports = router;