import { useState } from 'react'
import posthog from 'posthog-js'

function cleanText(text) {
  return text.replace(/ — /g, ', ').replace(/—/g, ', ')
}

function parseRecommendation(rawText) {
  const text = cleanText(rawText)

  const toolMatch = text.match(/\*\*Recommendation:\*\*\s*(.+?)(?:\n|$)/)
  const problemMatch = text.match(/\*\*The Problem\*\*\s*\n+(.+?)(?:\n\n|\*\*|$)/s)
  const stepsBlockMatch = text.match(/\*\*3 Steps.*?\*\*\s*\n+([\s\S]+?)(?:\n\n\*\*|$)/)
  const timeSavedMatch = text.match(/\*\*Time Saved:\*\*\s*(.+?)(?:\n|$)/)
  const costMatch = text.match(/\*\*Monthly Cost:\*\*\s*(.+?)(?:\n|$)/)
  const bottomLineMatch = text.match(/\*\*Bottom Line:\*\*\s*(.+?)(?:\n|$)/)

  const steps = stepsBlockMatch
    ? [...stepsBlockMatch[1].matchAll(/^\d+\.\s*(.+)/gm)].map(m => m[1].trim())
    : []

  return {
    toolName: toolMatch?.[1]?.trim() ?? '',
    problem: problemMatch?.[1]?.trim() ?? '',
    steps,
    timeSaved: timeSavedMatch?.[1]?.trim() ?? '',
    cost: costMatch?.[1]?.trim() ?? '',
    bottomLine: bottomLineMatch?.[1]?.trim() ?? '',
  }
}

export default function ResultCard({ recommendation, onStartOver }) {
  const parsed = parseRecommendation(recommendation)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  function handleStartOver() {
    posthog.capture('start_over_clicked')
    onStartOver()
  }

  async function handleEmailSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setEmailLoading(true)
    posthog.capture('email_captured', { email })
    // TODO: wire up to Supabase or email provider
    await new Promise((r) => setTimeout(r, 600))
    setEmailSubmitted(true)
    setEmailLoading(false)
  }

  return (
    <div>
      {/* Gradient border wrapper */}
      <div style={{
        background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
        padding: '2px',
        borderRadius: '18px',
        marginBottom: '16px',
      }}>
        <div style={{ backgroundColor: '#1A1D27', borderRadius: '16px', padding: '48px' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
              backgroundColor: 'rgba(0,212,100,0.15)',
              border: '1px solid rgba(0,212,100,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#00D464', fontSize: '20px', fontWeight: '700',
            }}>
              ✓
            </div>
            <div>
              <div style={{ color: '#8B8FA8', fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>
                AI Action Plan
              </div>
              <h2 style={{ color: '#F0F0F0', fontSize: '20px', fontWeight: '800', margin: 0, lineHeight: '1.2' }}>
                Your AI Action Plan
              </h2>
            </div>
          </div>

          {/* Recommended tool pill */}
          {parsed.toolName && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(108,99,255,0.08)',
              border: '1px solid rgba(108,99,255,0.25)',
              borderRadius: '10px',
            }}>
              <div style={{ color: '#8B8FA8', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                Recommended Tool
              </div>
              <div style={{ color: '#6C63FF', fontSize: '18px', fontWeight: '700' }}>{parsed.toolName}</div>
            </div>
          )}

          {/* Header / content divider */}
          <div style={{ height: '1px', backgroundColor: '#2A2D3E', margin: '28px 0' }} />

          {/* Problem */}
          {parsed.problem && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ color: '#8B8FA8', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  The Problem
                </div>
                <p style={{ color: '#C8CAD8', fontSize: '14px', lineHeight: '1.75', margin: 0 }}>{parsed.problem}</p>
              </div>
              <div style={{ height: '1px', backgroundColor: '#2A2D3E', marginBottom: '24px' }} />
            </>
          )}

          {/* Steps */}
          {parsed.steps.length > 0 && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ color: '#8B8FA8', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                  3 Steps to Get Started
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {parsed.steps.map((step, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'flex-start',
                        backgroundColor: '#0F1117',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        borderLeft: '3px solid #6C63FF',
                      }}
                    >
                      <span style={{ color: '#6C63FF', fontWeight: '700', fontSize: '14px', flexShrink: 0, minWidth: '18px', marginTop: '1px' }}>
                        {i + 1}
                      </span>
                      <span style={{ color: '#C8CAD8', fontSize: '14px', lineHeight: '1.65' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: '1px', backgroundColor: '#2A2D3E', marginBottom: '24px' }} />
            </>
          )}

          {/* Stat boxes */}
          <div>
            <div style={{ color: '#8B8FA8', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
              What You Get
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
              <div style={{
                backgroundColor: '#0F1117',
                border: '1px solid rgba(108,99,255,0.25)',
                borderRadius: '10px',
                padding: '10px 12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>⏱</div>
                <div style={{
                  color: '#6C63FF', fontSize: '16px', fontWeight: '700', marginBottom: '2px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {parsed.timeSaved || '—'}
                </div>
                <div style={{ color: '#8B8FA8', fontSize: '11px', fontWeight: '500' }}>Weekly time saved</div>
              </div>
              <div style={{
                backgroundColor: '#0F1117',
                border: '1px solid rgba(0,212,255,0.25)',
                borderRadius: '10px',
                padding: '10px 12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>💰</div>
                <div style={{
                  color: '#00D4FF', fontSize: '16px', fontWeight: '700', marginBottom: '2px',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {parsed.cost || '—'}
                </div>
                <div style={{ color: '#8B8FA8', fontSize: '11px', fontWeight: '500' }}>Monthly cost</div>
              </div>
            </div>

            {/* Bottom Line — full width */}
            {parsed.bottomLine && (
              <div style={{
                backgroundColor: 'rgba(108,99,255,0.07)',
                border: '1px solid rgba(108,99,255,0.2)',
                borderRadius: '10px',
                padding: '12px 16px',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>✦</span>
                <div>
                  <div style={{ color: '#8B8FA8', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px' }}>
                    Bottom Line
                  </div>
                  <p style={{ color: '#C8CAD8', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                    {parsed.bottomLine}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Email capture */}
      <div style={{
        backgroundColor: '#1A1D27',
        border: '1px solid #2A2D3E',
        borderRadius: '14px',
        padding: '32px',
        marginBottom: '12px',
      }}>
        {emailSubmitted ? (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>✓</div>
            <p style={{ color: '#F0F0F0', fontWeight: '600', fontSize: '15px', margin: '0 0 4px' }}>
              Plan sent! Check your inbox.
            </p>
            <p style={{ color: '#5A5D72', fontSize: '13px', margin: 0 }}>
              We'll follow up with more tips for your store.
            </p>
          </div>
        ) : (
          <>
            <h3 style={{ color: '#F0F0F0', fontSize: '16px', fontWeight: '700', margin: '0 0 4px' }}>
              Want us to send you this plan?
            </h3>
            <p style={{ color: '#5A5D72', fontSize: '13px', margin: '0 0 16px' }}>
              No spam. Just your plan.
            </p>
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => { e.target.style.borderColor = '#6C63FF'; e.target.style.boxShadow = '0 0 0 2px rgba(108,99,255,0.2)' }}
                onBlur={(e) => { e.target.style.borderColor = '#2A2D3E'; e.target.style.boxShadow = 'none' }}
                style={{
                  flex: 1,
                  backgroundColor: '#0F1117',
                  border: '1px solid #2A2D3E',
                  borderRadius: '8px',
                  padding: '20px',
                  color: '#F0F0F0',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={emailLoading || !email.trim()}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: emailLoading || !email.trim() ? 'not-allowed' : 'pointer',
                  opacity: emailLoading || !email.trim() ? 0.6 : 1,
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.2s ease',
                }}
              >
                {emailLoading ? '…' : 'Send my plan'}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Start over — full width, below card */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <p style={{ color: '#5A5D72', fontSize: '12px', margin: '0 0 8px' }}>
          Want a different recommendation? Start over.
        </p>
        <button
          onClick={handleStartOver}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: '10px',
            border: '1px solid #2A2D3E',
            color: '#F0F0F0',
            backgroundColor: '#1A1D27',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'border-color 0.2s ease, background-color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6C63FF'; e.currentTarget.style.backgroundColor = '#22253A' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2A2D3E'; e.currentTarget.style.backgroundColor = '#1A1D27' }}
        >
          ← Start over
        </button>
      </div>
    </div>
  )
}
