const getRecommendation = async (sellerData, conversationHistory = []) => {
  const response = await fetch("http://localhost:3001/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `You are a practical AI advisor for small 
      e-commerce sellers. Your job is to analyze a seller's 
      specific situation and identify the single highest ROI 
      automation opportunity available to them right now.

      Your response must:
      - Name one specific tool (not a category of tools)
      - Explain the problem it solves in one sentence
      - Give exactly 3 setup steps they can do today
      - Estimate weekly time savings in hours
      - State the monthly cost or confirm it is free

      Do not give multiple options. Do not use technical 
      jargon. Write like you are talking to a busy store 
      owner who has 10 minutes to read this.`,
      messages: conversationHistory.length > 0
        ? conversationHistory
        : [
            {
              role: "user",
              content: `Here are my store details:
              Platform: ${sellerData.platform}
              Monthly orders: ${sellerData.monthlyOrders}
              Biggest time drain: ${sellerData.timeDrain}
              Current AI tools: ${sellerData.currentTools}`
            }
          ]
    })
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('Anthropic API error:', data);
    throw new Error(data.error?.message ?? `HTTP ${response.status}`);
  }
  return data.content[0].text;
};

export default getRecommendation;
