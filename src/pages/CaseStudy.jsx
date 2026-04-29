import { Link } from 'react-router-dom'
import BuildTimeline from '../components/BuildTimeline'

const ACCENT = '#2563EB'
const TEXT = '#1A1A1A'
const MUTED = '#6B7280'
const BORDER = '#E5E5E5'
const BG = '#F9FAFB'

const metrics = [
  { value: '6', label: 'Weeks to ship' },
  { value: '4', label: 'Anthropic certifications' },
  { value: '4', label: 'Questions in intake' },
  { value: '1', label: 'AI-powered recommendation' },
]

export default function CaseStudy() {
  return (
    <div style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", backgroundColor: '#fff', color: TEXT, minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ borderBottom: `1px solid ${BORDER}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', color: TEXT, fontWeight: '700', fontSize: '16px' }}>
          First Step <span style={{ color: ACCENT }}>AI</span>
        </Link>
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

        {/* Hero */}
        <div style={{ padding: '64px 0 48px', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#EFF6FF', borderRadius: '6px', marginBottom: '20px' }}>
            <span style={{ color: ACCENT, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Case Study
            </span>
          </div>
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

        {/* ── Project overview metrics ── */}
        <section style={{ padding: '56px 0 0' }}>
          <h2 style={{ fontSize: '13px', fontWeight: '600', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '24px' }}>
            Project Overview
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '56px' }}>
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  backgroundColor: BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '12px',
                  padding: '24px 20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '36px', fontWeight: '800', color: ACCENT, letterSpacing: '-1px', marginBottom: '6px' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '13px', color: MUTED, fontWeight: '500' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Build timeline ── */}
          <h2 style={{ fontSize: '13px', fontWeight: '600', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '28px' }}>
            6-Week Build
          </h2>
          <BuildTimeline />
        </section>

        {/* ── The Problem ── */}
        <section style={{ padding: '64px 0 0', borderTop: `1px solid ${BORDER}`, marginTop: '56px' }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: '#FFF7ED', borderRadius: '6px', marginBottom: '20px' }}>
            <span style={{ color: '#EA580C', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              The Problem
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '800', letterSpacing: '-0.3px', marginBottom: '20px', color: TEXT }}>
            E-commerce sellers know they should automate — but don't know where to start
          </h2>
          <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8, marginBottom: '16px' }}>
            Small online sellers are overwhelmed by tool options. Zapier, Klaviyo, Gorgias,
            Tidio — the landscape is fragmented and the onboarding burden is high. Most sellers
            churn in trial because they can't identify which automation would actually move the
            needle for their specific situation.
          </p>
          <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.8 }}>
            First Step AI collapses the discovery process into 4 targeted questions and uses
            Claude to output a single, concrete recommendation — removing decision paralysis at
            the exact moment sellers are most open to change.
          </p>
        </section>

      </div>
    </div>
  )
}
