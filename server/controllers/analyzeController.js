const openaiService = require('../services/openaiService');

exports.analyze = async (req, res) => {
  try {
    if (!req.file) {
      console.log("파일 없음");
      return res.status(400).json({ error: '파일이 없습니다.' });
    }

    console.log("파일 있음:", req.file.originalname, req.file.mimetype);
    const base64 = req.file.buffer?.toString('base64');
    
    if (!base64) {
      console.log("buffer 없음");
      return res.status(500).json({ error: '파일 버퍼 없음' });
    }

    const result = await openaiService.analyzeLocationFromImage(`data:image/jpeg;base64,${base64}`);
    res.json(result);
  } catch (err) {
    console.error("❌ 서버 분석 에러:", err.message);
    console.error(err.stack);
    res.status(500).json({ error: '분석 실패' });
  }
};