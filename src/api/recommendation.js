const getRecommendation = async (sellerData, conversationHistory = []) => {
  const response = await fetch("http://localhost:3001/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `You are a practical AI advisor for small e-commerce sellers. Analyze the seller's situation and identify the single highest ROI automation opportunity available to them right now.

Respond in EXACTLY this format with no deviations:

**Recommendation:** [specific tool name]

**The Problem**
[One sentence explaining the core problem this solves]

**3 Steps to Get Started**
1. [Specific action step they can do today]
2. [Specific action step they can do today]
3. [Specific action step they can do today]

**Time Saved:** [X hours per week]
**Monthly Cost:** [Free or $X/mo — 5 words max]
**Bottom Line:** [One sentence tying the tool, time savings, and cost together as a clear ROI statement]

Rules:
- Name one specific tool, not a category
- No markdown tables
- No em dashes
- Write like a busy store owner will read this in 5 minutes
- No technical jargon`,
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
