const { getPresignedUrl } = require('../services/presignedService.js');

exports.generatePresignUrl = (req, res) => {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: 'filename 쿼리 파라미터가 필요합니다' });
  }

  try {
    const url = getPresignedUrl(filename);
    res.json({ url });
  } catch (err) {
    console.error('presign error:', err);
    res.status(500).json({ error: '서버 오류로 URL을 생성할 수 없습니다' });
  }
};

//