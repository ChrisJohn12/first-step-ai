import { useState } from 'react'
import IntakeForm from './components/IntakeForm'
import ResultCard from './components/ResultCard'

const COLORS = {
  bg: '#0F1117',
  card: '#1A1D27',
  purple: '#6C63FF',
  cyan: '#00D4FF',
  text: '#F0F0F0',
  muted: '#8B8FA8',
  border: '#2A2D3E',
}

const features = [
  {
    icon: '✦',
    title: 'AI-Powered Insights',
    desc: 'Get personalized recommendations based on your unique business needs.',
    accent: COLORS.purple,
  },
  {
    icon: '⚡',
    title: 'Quick & Simple',
    desc: 'Answer just 4 questions to unlock your highest-ROI automation.',
    accent: COLORS.cyan,
  },
  {
    icon: '◎',
    title: 'Actionable Results',
    desc: 'Receive specific, implementable steps you can take today.',
    accent: '#FF6B9D',
  },
]

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [recommendation, setRecommendation] = useState(null)
  const [formKey, setFormKey] = useState(0)

  function handleRecommendation(result) {
    setRecommendation(result)
  }

  function handleStartOver() {
    setRecommendation(null)
    setFormKey((k) => k + 1)
  }

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', fontFamily: 'inherit' }}>

      {/* Navbar */}
      <nav style={{
        borderBottom: `1px solid ${COLORS.border}`,
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ color: COLORS.text, fontWeight: '700', fontSize: '17px', letterSpacing: '-0.3px' }}>
          First Step <span style={{ color: COLORS.purple }}>AI</span>
        </span>
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 18px',
            color: '#fff',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Get Started →
        </button>
      </nav>

      {/* Hero */}
      <div style={{ padding: '90px 24px 60px', textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        {/* Eyebrow pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <span style={{
            background: 'rgba(108,99,255,0.12)',
            border: `1px solid rgba(108,99,255,0.3)`,
            borderRadius: '999px',
            padding: '6px 16px',
            color: COLORS.purple,
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            ✦ AI AUDIT FOR ONLINE SELLERS
          </span>
        </div>

        <h1 style={{
          color: COLORS.text,
          fontSize: 'clamp(32px, 6vw, 52px)',
          fontWeight: '800',
          lineHeight: '1.15',
          letterSpacing: '-1px',
          marginBottom: '20px',
        }}>
          Find your best automation{' '}
          <span style={{ background: 'linear-gradient(90deg, #6C63FF, #00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            opportunity
          </span>{' '}
          in minutes
        </h1>

        <p style={{ color: COLORS.muted, fontSize: '17px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '520px', margin: '0 auto 36px' }}>
          Answer 4 questions and get a specific, actionable recommendation
          to save you the most time this week.
        </p>

        <button
          onClick={() => {
            setShowForm(true)
            setTimeout(() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' }), 50)
          }}
          style={{
            background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 36px',
            color: '#fff',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 0 32px rgba(108,99,255,0.35)',
            transition: 'box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 48px rgba(108,99,255,0.55)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 32px rgba(108,99,255,0.35)'}
        >
          Get Started →
        </button>

        {/* Gradient line */}
        <div style={{
          margin: '56px auto 0',
          height: '1px',
          maxWidth: '400px',
          background: 'linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)',
          opacity: 0.5,
        }} />
      </div>

      {/* Feature cards */}
      <div style={{ padding: '0 24px 80px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                backgroundColor: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '16px',
                padding: '28px 24px',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = f.accent
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.border
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: `${f.accent}1A`,
                border: `1px solid ${f.accent}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: f.accent,
                marginBottom: '16px',
              }}>
                {f.icon}
              </div>
              <h3 style={{ color: COLORS.text, fontWeight: '700', fontSize: '15px', marginBottom: '8px' }}>
                {f.title}
              </h3>
              <p style={{ color: COLORS.muted, fontSize: '13px', lineHeight: '1.65' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form / Result section */}
      <div
        id="form-section"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px 100px',
          display: showForm ? 'block' : 'none',
        }}
      >
        {recommendation ? (
          <ResultCard
            recommendation={recommendation}
            onStartOver={handleStartOver}
          />
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ color: COLORS.text, fontSize: '26px', fontWeight: '700', marginBottom: '8px' }}>
                What's your biggest time drain?
              </h2>
              <p style={{ color: COLORS.muted, fontSize: '14px' }}>
                Answer 4 quick questions and get a specific action plan built for your store.
              </p>
            </div>
            <IntakeForm key={formKey} onRecommendation={handleRecommendation} />
          </>
        )}
      </div>


    </div>
  )
}
