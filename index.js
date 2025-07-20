const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors({
  origin: ['https://tripon-fe.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const analyzeRoutes = require('./server/routes/analyzeRoutes');
const feedbackRoutes = require('./server/routes/feedbackRoutes');
const presignedRoutes = require('./server/routes/presignedRoutes');

app.use('/api/analyze', analyzeRoutes);
//app.use('/api/feedback', feedbackRoutes);
app.use('/api/presign', presignedRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


