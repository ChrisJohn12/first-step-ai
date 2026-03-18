# Post-Purchase Follow-Up Automation

## Trigger Conditions
- Shopify order status changes to "fulfilled" (shipping label created)
- 5 days have passed since delivery confirmation with no inbound support email
- Customer has placed at least 1 order (applies to all buyers)
- Store processes 100+ orders/month with high customer service email volume

## Recommendation
Use Shopify Flow + Klaviyo (or Shopify Email) to send a 2-step automated post-purchase sequence that proactively answers common questions (shipping delays, returns, product usage) before customers need to email in — reducing inbound support volume.

## Expected Time Savings
5–8 hours per week

## Setup Steps
1. In Shopify Flow, create a workflow triggered by "Order fulfilled" — add a 5-day wait, then send a webhook or trigger a Klaviyo flow.
2. Build a 2-email Klaviyo sequence:
   - **Email 1 (Day 5 post-fulfillment):** "How's everything with your order?" — include tracking link, return policy link, and FAQ answers for top 3 support questions (e.g., "Where is my order?", "How do I return?", "How do I use this product?").
   - **Email 2 (Day 10, only if no reply/support ticket opened):** Soft review request with a direct link to leave a Shopify or Google review.
3. In Klaviyo, suppress Email 2 for any customer who opened a support ticket or replied to Email 1 (use a Gorgias or Zendesk integration tag, or a Shopify tag applied by your helpdesk).

## Estimated Monthly Cost
- Shopify Flow: Free (included with Shopify Basic+)
- Klaviyo: Free up to 500 contacts, ~$45/month for 5,000 contacts
- Total: $0–$45/month
