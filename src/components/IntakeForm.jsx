import { useState } from 'react'
import posthog from 'posthog-js'
import getRecommendation from '../api/recommendation'

function track(event, props) {
  posthog.capture(event, props)
}

const PLATFORMS = [
  'Shopify',
  'WooCommerce',
  'BigCommerce',
  'Magento',
  'Squarespace',
  'Wix',
  'Other',
]

const TIME_DRAINS = [
  'Customer support / answering questions',
  'Writing product descriptions',
  'Order follow-ups & tracking',
  'Inventory management',
  'Marketing & social media',
  'Returns & refunds',
  'Other',
]

const QUESTIONS = [
  {
    key: 'platform',
    question: 'What platform are you selling on?',
    type: 'select',
    options: PLATFORMS,
    placeholder: 'Select your platform',
    required: true,
  },
  {
    key: 'monthlyOrders',
    question: 'How many orders do you get per month?',
    type: 'number',
    placeholder: 'e.g. 150',
    required: true,
  },
  {
    key: 'timeDrain',
    question: 'What takes up most of your time right now?',
    type: 'select',
    options: TIME_DRAINS,
    placeholder: 'Select the biggest drain on your time',
    required: true,
  },
  {
    key: 'currentTools',
    question: 'Any AI tools you\'re already using?',
    type: 'text',
    placeholder: 'e.g. ChatGPT, Klaviyo AI, or "none"',
    required: false,
    hint: 'Optional — skip if none',
  },
]

const cardStyle = {
  backgroundColor: '#1A1D27',
  border: '1px solid #2A2D3E',
  borderRadius: '16px',
  padding: '32px',
}

const inputStyle = {
  width: '100%',
  backgroundColor: '#0F1117',
  border: '1px solid #2A2D3E',
  borderRadius: '8px',
  padding: '12px 14px',
  color: '#F0F0F0',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
}

function handleFocus(e) {
  e.target.style.borderColor = '#6C63FF'
  e.target.style.boxShadow = '0 0 0 2px rgba(108,99,255,0.2)'
}

function handleBlur(e) {
  e.target.style.borderColor = '#2A2D3E'
  e.target.style.boxShadow = 'none'
}

export default function IntakeForm({ onRecommendation }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({
    platform: '',
    monthlyOrders: '',
    timeDrain: '',
    currentTools: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(true)
  const [formStarted, setFormStarted] = useState(false)

  const q = QUESTIONS[currentQ]
  const isLast = currentQ === QUESTIONS.length - 1
  const isFirst = currentQ === 0
  const currentValue = answers[q.key]
  const canAdvance = !q.required || currentValue?.toString().trim() !== ''

  function handleAnswer(value) {
    if (!formStarted) {
      track('form_started')
      setFormStarted(true)
    }
    setAnswers((prev) => ({ ...prev, [q.key]: value }))
  }

  function goTo(newQ) {
    setVisible(false)
    setTimeout(() => {
      setCurrentQ(newQ)
      setVisible(true)
    }, 160)
  }

  function goNext() {
    if (!canAdvance) return
    goTo(currentQ + 1)
  }

  function goBack() {
    goTo(currentQ - 1)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !isLast && canAdvance) {
      e.preventDefault()
      goNext()
    }
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)
    track('form_completed', { platform: answers.platform, timeDrain: answers.timeDrain })
    try {
      const result = await getRecommendation(answers)
      track('recommendation_generated', { platform: answers.platform, timeDrain: answers.timeDrain })
      onRecommendation?.(result, answers)
    } catch (err) {
      console.error('getRecommendation failed:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={cardStyle}>

      {/* Progress bar */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ color: '#6C63FF', fontSize: '12px', fontWeight: '600', letterSpacing: '0.04em' }}>
            Step {currentQ + 1} of 4
          </span>
          <span style={{ color: '#5A5D72', fontSize: '12px' }}>
            {currentQ === 3 ? 'Last step' : `${3 - currentQ} step${3 - currentQ !== 1 ? 's' : ''} left`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '3px',
                borderRadius: '2px',
                backgroundColor: i <= currentQ ? '#6C63FF' : '#2A2D3E',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.16s ease',
      }}>
        <h3 style={{
          color: '#F0F0F0',
          fontSize: '20px',
          fontWeight: '700',
          lineHeight: '1.35',
          marginBottom: q.hint ? '6px' : '20px',
        }}>
          {q.question}
        </h3>

        {q.hint && (
          <p style={{ color: '#5A5D72', fontSize: '13px', marginBottom: '20px', marginTop: 0 }}>
            {q.hint}
          </p>
        )}

        {q.type === 'select' && (
          <select
            value={currentValue}
            onChange={(e) => handleAnswer(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="" disabled>{q.placeholder}</option>
            {q.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        )}

        {q.type === 'number' && (
          <input
            type="number"
            min="0"
            value={currentValue}
            placeholder={q.placeholder}
            onChange={(e) => handleAnswer(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
        )}

        {q.type === 'text' && (
          <input
            type="text"
            value={currentValue}
            placeholder={q.placeholder}
            onChange={(e) => handleAnswer(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
        )}
      </div>

      {error && (
        <p style={{ color: '#FF6B6B', fontSize: '13px', marginTop: '12px' }}>{error}</p>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
        {!isFirst && (
          <button
            type="button"
            onClick={goBack}
            style={{
              padding: '13px 20px',
              borderRadius: '10px',
              border: '1px solid #2A2D3E',
              color: '#8B8FA8',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              flexShrink: 0,
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6C63FF'; e.currentTarget.style.color = '#F0F0F0' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2A2D3E'; e.currentTarget.style.color = '#8B8FA8' }}
          >
            ← Back
          </button>
        )}

        {!isLast ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance}
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: '10px',
              border: 'none',
              background: canAdvance
                ? 'linear-gradient(90deg, #6C63FF, #00D4FF)'
                : '#2A2D3E',
              color: canAdvance ? '#fff' : '#5A5D72',
              fontWeight: '700',
              fontSize: '15px',
              cursor: canAdvance ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
              color: '#fff',
              fontWeight: '700',
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: loading ? 'none' : '0 0 20px rgba(108,99,255,0.4)',
              transition: 'opacity 0.2s ease',
            }}
          >
            {loading ? 'Analyzing your store…' : 'Get my recommendation'}
          </button>
        )}
      </div>

    </div>
  )
}
