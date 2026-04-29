import BuildTimeline from '../components/BuildTimeline'

const ACCENT = '#2563EB'
const TEXT = '#1A1A1A'
const MUTED = '#6B7280'
const BORDER = '#E5E5E5'

const metrics = [
  { value: '6 weeks', label: 'Timeline' },
  { value: '4', label: 'Anthropic certifications' },
  { value: '4', label: 'Intake questions' },
  { value: 'Live', label: 'Deployment status' },
]

const screenshots = [
  {
    src: '/images/first-step-ai/userflow-1.png',
    caption: 'Landing page hero and feature cards',
  },
  {
    src: '/images/first-step-ai/userflow-2.png',
    caption: 'Step 3 of 4 — one question at a time',
  },
  {
    src: '/images/first-step-ai/userflow-3.png',
    caption: 'AI Action Plan with personalized recommendation',
  },
]

const designDecisions = [
  {
    assumption: '6 fields all visible',
    decision: '4 questions one at a time',
    rationale: 'Lower cognitive load, higher completion',
  },
  {
    assumption: 'Email in intake form',
    decision: 'Email after recommendation',
    rationale: 'Value delivered before ask',
  },
  {
    assumption: 'List of tool options',
    decision: 'One specific tool + 3 steps',
    rationale: 'Decision fatigue removed',
  },
  {
    assumption: 'Free in all CTAs',
    decision: 'Free removed entirely',
    rationale: 'Avoids anchoring value at zero',
  },
  {
    assumption: 'Direct browser API call',
    decision: 'Vercel serverless proxy',
    rationale: 'CORS resolved, API key never exposed',
  },
  {
    assumption: 'Open-ended prompt',
    decision: 'Constrained output format',
    rationale: 'Consistent actionable output every time',
  },
]

const promptConstraints = [
  { constraint: 'Name one specific tool', rationale: 'Eliminates decision fatigue' },
  { constraint: 'Explain the problem in one sentence', rationale: 'User sees themselves immediately' },
  { constraint: 'Give exactly 3 steps for today', rationale: 'Achievable, not overwhelming' },
  { constraint: 'Estimate time savings in hours', rationale: 'Concrete ROI' },
  { constraint: 'State the monthly cost', rationale: 'Removes final objection' },
  { constraint: 'Write for a busy owner with 10 minutes', rationale: 'Persona embedded in output' },
]

function SectionLabel({ children, color = '#EFF6FF', textColor = ACCENT }) {
  return (
    <div style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: color, borderRadius: '6px', marginBottom: '20px' }}>
      <span style={{ color: textColor, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {children}
      </span>
    </div>
  )
}

function DesignDecisionsTable() {
  return (
    <div style={{ border: `1px solid ${BORDER}`, borderRadius: '8px', overflow: 'hidden', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontSize: '12px',
              fontWeight: '600',
              color: MUTED,
              backgroundColor: '#F9FAFB',
              letterSpacing: '0.04em',
              width: '30%',
            }}>
              Starting assumption
            </th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontSize: '12px',
              fontWeight: '700',
              color: ACCENT,
              backgroundColor: '#fff',
              letterSpacing: '0.04em',
              width: '35%',
            }}>
              Design decision
            </th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontSize: '12px',
              fontWeight: '600',
              color: MUTED,
              backgroundColor: '#fff',
              letterSpacing: '0.04em',
              width: '35%',
            }}>
              Rationale
            </th>
          </tr>
        </thead>
        <tbody>
          {designDecisions.map((row, i) => {
            const bg = i % 2 === 0 ? '#FAFAF9' : '#fff'
            return (
              <tr key={i} style={{ borderBottom: i < designDecisions.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: MUTED, backgroundColor: '#F9FAFB', verticalAlign: 'top' }}>
                  {row.assumption}
                </td>
                <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: '600', color: TEXT, backgroundColor: bg, verticalAlign: 'top' }}>
                  {row.decision}
                </td>
                <td style={{ padding: '14px 16px', fontSize: '14px', color: MUTED, backgroundColor: bg, verticalAlign: 'top' }}>
                  {row.rationale}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function SystemPromptCallout() {
  return (
    <div style={{
      backgroundColor: '#EFF6FF',
      borderLeft: `4px solid ${ACCENT}`,
      borderRadius: '8px',
      padding: '24px',
    }}>
      <p style={{ margin: '0 0 20px', fontSize: '13px', fontWeight: '600', color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        System prompt constraints
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {promptConstraints.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px 24px',
              padding: '12px 0',
              borderBottom: i < promptConstraints.length - 1 ? '1px solid rgba(37,99,235,0.12)' : 'none',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '600', color: TEXT }}>
              {item.constraint}
            </span>
            <span style={{ fontSize: '14px', color: MUTED }}>
              {item.rationale}
            </span>
          </div>
        ))}
      </div>
      <p style={{ margin: '20px 0 0', fontSize: '14px', color: MUTED, fontStyle: 'italic', lineHeight: 1.7 }}>
        "The system prompt is a design specification. Every constraint is a UX decision."
      </p>
    </div>
  )
}

export default function CaseStudy() {
  return (
    <div style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", backgroundColor: '#fff', color: TEXT, minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${BORDER}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ textDecoration: 'none', color: TEXT, fontWeight: '700', fontSize: '16px' }}>
          First Step <span style={{ color: ACCENT }}>AI</span>
        </a>
        <a
          href="https://first-step-ai-ten.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '8px 18px',
            backgroundColor: ACCENT,
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '13px',
          }}
        >
          Try it live →
        </a>
      </nav>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── Hero ── */}
        <div style={{ padding: '64px 0 48px', borderBottom: `1px solid ${BORDER}` }}>
          <SectionLabel>Case Study</SectionLabel>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: '800', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: '16px', color: TEXT }}>
            First Step AI
          </h1>
          <p style={{ fontSize: '18px', color: MUTED, lineHeight: 1.7, maxWidth: '600px', marginBottom: '28px' }}>
            An AI-powered onboarding agent for e-commerce sellers — answers 4 questions
            about your store and delivers a personalized automation recommendation in seconds.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['React', 'Claude API', 'Vercel', 'Resend'].map((tag) => (
              <span key={tag} style={{
                padding: '5px 12px',
                border: `1px solid ${BORDER}`,
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                color: MUTED,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Metrics bar ── */}
        <section style={{ padding: '48px 0 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  backgroundColor: '#fff',
                  border: `1px solid ${BORDER}`,
                  borderRadius: '12px',
                  padding: '24px 16px',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontSize: m.value.length > 4 ? '24px' : '36px',
                  fontWeight: '800',
                  color: ACCENT,
                  letterSpacing: '-0.5px',
                  marginBottom: '6px',
                  lineHeight: 1.1,
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '13px', color: MUTED, fontWeight: '500' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── The product ── */}
        <section style={{ padding: '64px 0 0', borderTop: `1px solid ${BORDER}`, marginTop: '56px' }}>
          <SectionLabel>The product</SectionLabel>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '800', letterSpacing: '-0.3px', marginBottom: '12px', color: TEXT }}>
            A guided AI audit in 60 seconds
          </h2>
          <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, marginBottom: '40px', maxWidth: '580px' }}>
            Sellers answer 4 targeted questions and receive one specific, implementable
            automation recommendation — no upsell, no signup wall.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
            {screenshots.map((s) => (
              <figure key={s.src} style={{ margin: 0 }}>
                <div style={{ border: `1px solid ${BORDER}`, borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F9FAFB' }}>
                  <img src={s.src} alt={s.caption} style={{ width: '100%', display: 'block' }} />
                </div>
                <figcaption style={{ marginTop: '10px', fontSize: '13px', color: MUTED, textAlign: 'center', fontStyle: 'italic' }}>
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="https://first-step-ai-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: ACCENT,
                color: '#fff',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '15px',
              }}
            >
              Try First Step AI →
            </a>
          </div>
        </section>

        {/* ── How it was built ── */}
        <section style={{ padding: '64px 0 0', borderTop: `1px solid ${BORDER}`, marginTop: '56px' }}>
          <SectionLabel>How it was built</SectionLabel>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '800', letterSpacing: '-0.3px', marginBottom: '12px', color: TEXT }}>
            6 weeks from idea to live product
          </h2>
          <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, marginBottom: '40px', maxWidth: '580px' }}>
            Built solo using Claude Code for scaffolding, component generation, and API
            integration — alongside 4 Anthropic certifications completed in parallel.
          </p>
          <BuildTimeline />
        </section>

        {/* ── The Problem ── */}
        <section style={{ padding: '64px 0 0', borderTop: `1px solid ${BORDER}`, marginTop: '56px' }}>
          <SectionLabel color="#FFF7ED" textColor="#EA580C">The Problem</SectionLabel>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '800', letterSpacing: '-0.3px', marginBottom: '20px', color: TEXT }}>
            Sellers know they should automate — but don't know where to start
          </h2>
          <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, marginBottom: '16px' }}>
            Small online sellers are overwhelmed by tool options. Zapier, Klaviyo, Gorgias,
            Tidio — the landscape is fragmented and the onboarding burden is high. Most sellers
            churn during trial because they can't identify which automation would actually move
            the needle for their specific situation.
          </p>
          <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8 }}>
            First Step AI collapses the discovery process into 4 targeted questions and uses
            Claude to output a single, concrete recommendation — removing decision paralysis at
            the exact moment sellers are most open to change.
          </p>
        </section>

        {/* ── Design Process ── */}
        <section style={{ padding: '64px 0 0', borderTop: `1px solid ${BORDER}`, marginTop: '56px' }}>
          <SectionLabel>Design Process</SectionLabel>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '800', letterSpacing: '-0.3px', marginBottom: '12px', color: TEXT }}>
            Key design decisions
          </h2>
          <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, marginBottom: '32px', maxWidth: '580px' }}>
            Every assumption from the original brief was tested against the goal of getting
            sellers to a recommendation without friction or drop-off.
          </p>
          <DesignDecisionsTable />
        </section>

        {/* ── Technical Architecture ── */}
        <section style={{ padding: '64px 0 0', borderTop: `1px solid ${BORDER}`, marginTop: '56px' }}>
          <SectionLabel>Technical Architecture</SectionLabel>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '800', letterSpacing: '-0.3px', marginBottom: '12px', color: TEXT }}>
            The system prompt as a design spec
          </h2>
          <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, marginBottom: '32px', maxWidth: '580px' }}>
            The Claude prompt isn't just an instruction — it's a UX document. Each constraint
            maps directly to a user experience outcome.
          </p>
          <SystemPromptCallout />
        </section>

      </div>
    </div>
  )
}
