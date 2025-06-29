const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const presignRoutes = require('./routes/presignRoutes');
app.use('/api', presignRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});