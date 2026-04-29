import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function buildEmailHtml(recommendation) {
  const clean = recommendation.replace(/ — /g, ', ').replace(/—/g, ', ')

  const toolMatch = clean.match(/\*\*Recommendation:\*\*\s*(.+?)(?:\n|$)/)
  const problemMatch = clean.match(/\*\*The Problem\*\*\s*\n+(.+?)(?:\n\n|\*\*|$)/s)
  const stepsBlockMatch = clean.match(/\*\*3 Steps.*?\*\*\s*\n+([\s\S]+?)(?:\n\n\*\*|$)/)
  const timeSavedMatch = clean.match(/\*\*Time Saved:\*\*\s*(.+?)(?:\n|$)/)
  const costMatch = clean.match(/\*\*Monthly Cost:\*\*\s*(.+?)(?:\n|$)/)
  const bottomLineMatch = clean.match(/\*\*Bottom Line:\*\*\s*(.+?)(?:\n|$)/)

  const toolName = toolMatch?.[1]?.trim() ?? ''
  const problem = problemMatch?.[1]?.trim() ?? ''
  const steps = stepsBlockMatch
    ? [...stepsBlockMatch[1].matchAll(/^\d+\.\s*(.+)/gm)].map(m => m[1].trim())
    : []
  const timeSaved = timeSavedMatch?.[1]?.trim() ?? ''
  const cost = costMatch?.[1]?.trim() ?? ''
  const bottomLine = bottomLineMatch?.[1]?.trim() ?? ''

  const stepsHtml = steps.map((s, i) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #2A2D3E; vertical-align: top;">
        <span style="color: #6C63FF; font-weight: 700; margin-right: 12px;">${i + 1}.</span>
        <span style="color: #C8CAD8;">${s}</span>
      </td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#0F1117;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F1117;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="padding-bottom:24px;text-align:center;">
          <p style="margin:0;color:#6C63FF;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">First Step AI</p>
          <h1 style="margin:8px 0 0;color:#F0F0F0;font-size:26px;font-weight:800;">Your AI Action Plan</h1>
        </td></tr>

        <!-- Card -->
        <tr><td style="background:linear-gradient(135deg,#6C63FF,#00D4FF);border-radius:18px;padding:2px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#1A1D27;border-radius:16px;">
            <tr><td style="padding:40px;">

              ${toolName ? `
              <!-- Tool pill -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr><td style="background-color:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.3);border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 4px;color:#8B8FA8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Recommended Tool</p>
                  <p style="margin:0;color:#6C63FF;font-size:20px;font-weight:700;">${toolName}</p>
                </td></tr>
              </table>` : ''}

              <hr style="border:none;border-top:1px solid #2A2D3E;margin:0 0 24px;">

              ${problem ? `
              <!-- Problem -->
              <p style="margin:0 0 6px;color:#8B8FA8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">The Problem</p>
              <p style="margin:0 0 24px;color:#C8CAD8;font-size:14px;line-height:1.75;">${problem}</p>
              <hr style="border:none;border-top:1px solid #2A2D3E;margin:0 0 24px;">` : ''}

              ${steps.length > 0 ? `
              <!-- Steps -->
              <p style="margin:0 0 12px;color:#8B8FA8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">3 Steps to Get Started</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                ${stepsHtml}
              </table>
              <hr style="border:none;border-top:1px solid #2A2D3E;margin:0 0 24px;">` : ''}

              <!-- Stats -->
              <p style="margin:0 0 12px;color:#8B8FA8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">What You Get</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="48%" style="background-color:#0F1117;border:1px solid rgba(108,99,255,0.25);border-radius:10px;padding:14px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:20px;">&#9200;</p>
                    <p style="margin:0 0 2px;color:#6C63FF;font-size:16px;font-weight:700;">${timeSaved || '—'}</p>
                    <p style="margin:0;color:#8B8FA8;font-size:11px;">Weekly time saved</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background-color:#0F1117;border:1px solid rgba(0,212,255,0.25);border-radius:10px;padding:14px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:20px;">&#128176;</p>
                    <p style="margin:0 0 2px;color:#00D4FF;font-size:16px;font-weight:700;">${cost || '—'}</p>
                    <p style="margin:0;color:#8B8FA8;font-size:11px;">Monthly cost</p>
                  </td>
                </tr>
              </table>

              ${bottomLine ? `
              <!-- Bottom line -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="background-color:rgba(108,99,255,0.07);border:1px solid rgba(108,99,255,0.2);border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 4px;color:#8B8FA8;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;">Bottom Line</p>
                  <p style="margin:0;color:#C8CAD8;font-size:13px;line-height:1.6;">${bottomLine}</p>
                </td></tr>
              </table>` : ''}

            </td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:32px 0;text-align:center;">
          <p style="margin:0 0 20px;color:#8B8FA8;font-size:13px;">Ready to take the first step?</p>
          <a href="https://first-step-ai-ten.vercel.app" style="display:inline-block;padding:14px 32px;background:linear-gradient(90deg,#6C63FF,#00D4FF);color:#fff;font-weight:700;font-size:14px;text-decoration:none;border-radius:10px;">
            Get Another Recommendation
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:8px;text-align:center;border-top:1px solid #2A2D3E;">
          <p style="margin:16px 0 0;color:#5A5D72;font-size:12px;">
            First Step AI &mdash; <a href="https://first-step-ai-ten.vercel.app" style="color:#6C63FF;text-decoration:none;">first-step-ai-ten.vercel.app</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, recommendation } = req.body ?? {}

  if (!email || !recommendation) {
    return res.status(400).json({ error: 'Missing email or recommendation' })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'First Step AI <onboarding@resend.dev>',
      to: [email],
      subject: 'Your AI Action Plan from First Step AI',
      html: buildEmailHtml(recommendation),
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(400).json({ error: error.message })
    }

    return res.status(200).json({ success: true, id: data.id })
  } catch (err) {
    console.error('Send plan error:', err)
    return res.status(500).json({ error: err.message })
  }
}
