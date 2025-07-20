const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.analyzeLocationFromImage = async (base64Image) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `이 여행 사진을 보고 촬영된 국가와 도시를 추론해줘. 절대로 마크다운이나 백틱(\`\`\`)을 쓰지 말고, 반드시 이 형식으로만 응답해줘: {"country": "국가명", "city": "도시명", "confidence": "신뢰도(1-10)"}`,
          },
          {
            type: 'image_url',
            image_url: { url: base64Image },
          },
        ]
      }
    ],
    max_tokens: 300
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
};


exports.analyzePersonalityFromImages = async (imageDescriptions) => {
  const prompt = `
이 사람의 성격과 여행 스타일을 감성적으로 분석해줘.
칭찬은 예쁘게, 단점은 뼈 때리게 말해줘.
10줄 내외로 작성해줘.

${imageDescriptions.map((desc, i) => `${i + 1}. ${desc}`).join('\n')}

형식:
제목: ~
설명: ~
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  const content = res.choices[0].message.content;
  const match = content.match(/제목:\s*(.+)\n설명:\s*(.+)/s);

  return {
    title: match?.[1]?.trim() || '분석 실패',
    description: match?.[2]?.trim() || content.trim(),
  };
};
