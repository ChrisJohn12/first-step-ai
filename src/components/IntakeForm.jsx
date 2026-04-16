import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import posthog from 'posthog-js'
import getRecommendation from '../api/recommendation'

console.log('VITE_POSTHOG_KEY:', import.meta.env.VITE_POSTHOG_KEY)

function track(event, props) {
  console.log('PostHog event fired:', event, props ?? '')
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

const cardStyle = {
  backgroundColor: '#1A1D27',
  border: '1px solid #2A2D3E',
  borderRadius: '16px',
  padding: '32px',
}

const labelStyle = {
  color: '#8B8FA8',
  fontSize: '13px',
  fontWeight: '500',
  marginBottom: '6px',
  display: 'block',
}

const inputStyle = {
  width: '100%',
  backgroundColor: '#0F1117',
  border: '1px solid #2A2D3E',
  borderRadius: '8px',
  padding: '10px 12px',
  color: '#F0F0F0',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
}

export default function IntakeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    platform: '',
    monthlyOrders: '',
    timeDrain: '',
    currentTools: '',
  })
  const [loading, setLoading] = useState(false)
  const [recommendation, setRecommendation] = useState(null)
  const [error, setError] = useState(null)
  const [btnHover, setBtnHover] = useState(false)

  const [formStarted, setFormStarted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    if (!formStarted) {
      track('form_started')
      setFormStarted(true)
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleFocus(e) {
    e.target.style.borderColor = '#6C63FF'
    e.target.style.boxShadow = '0 0 0 2px rgba(108,99,255,0.2)'
  }

  function handleBlur(e) {
    e.target.style.borderColor = '#2A2D3E'
    e.target.style.boxShadow = 'none'
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    track('form_completed', { platform: formData.platform, timeDrain: formData.timeDrain })
    try {
      const result = await getRecommendation(formData)
      setRecommendation(result)
      track('recommendation_generated', { platform: formData.platform, timeDrain: formData.timeDrain })
      onSubmit?.(formData)
    } catch (err) {
      console.error('getRecommendation failed:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (recommendation) {
    return (
      <div style={cardStyle}>
        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
            style={{ backgroundColor: 'rgba(0,212,100,0.15)', color: '#00D464' }}
          >
            ✓
          </div>
          <h2 className="text-xl font-bold" style={{ color: '#F0F0F0' }}>
            Your top automation opportunity
          </h2>
        </div>

        <div
          className="prose prose-sm max-w-none"
          style={{ color: '#F0F0F0' }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 style={{ color: '#F0F0F0', fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 style={{ color: '#F0F0F0', fontSize: '17px', fontWeight: '600', marginTop: '20px', marginBottom: '8px' }}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 style={{ color: '#F0F0F0', fontSize: '15px', fontWeight: '600', marginTop: '16px', marginBottom: '6px' }}>{children}</h3>
              ),
              p: ({ children }) => (
                <p style={{ color: '#C8CAD8', fontSize: '14px', lineHeight: '1.7', marginBottom: '12px' }}>{children}</p>
              ),
              ol: ({ children }) => (
                <ol style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>{children}</ol>
              ),
              li: ({ children }) => {
                return (
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      backgroundColor: '#0F1117',
                      border: '1px solid #2A2D3E',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#C8CAD8',
                      fontSize: '14px',
                      lineHeight: '1.6',
                    }}
                  >
                    {children}
                  </li>
                )
              },
              ul: ({ children }) => (
                <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>{children}</ul>
              ),
              strong: ({ children }) => (
                <strong style={{ color: '#F0F0F0', fontWeight: '600' }}>{children}</strong>
              ),
              code: ({ children }) => (
                <code style={{ backgroundColor: '#0F1117', color: '#00D4FF', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>{children}</code>
              ),
            }}
          >
            {recommendation}
          </ReactMarkdown>
        </div>

        <button
          onClick={() => {
            track('start_over_clicked')
            setRecommendation(null)
            setFormStarted(false)
            setFormData({ businessName: '', email: '', platform: '', monthlyOrders: '', timeDrain: '', currentTools: '' })
          }}
          className="mt-6 rounded-lg px-4 py-2 text-sm transition"
          style={{ border: '1px solid #2A2D3E', color: '#8B8FA8', backgroundColor: 'transparent', cursor: 'pointer' }}
          onMouseEnter={(e) => { e.target.style.borderColor = '#6C63FF'; e.target.style.color = '#F0F0F0' }}
          onMouseLeave={(e) => { e.target.style.borderColor = '#2A2D3E'; e.target.style.color = '#8B8FA8' }}
        >
          Start over
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={cardStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div>
          <label htmlFor="businessName" style={labelStyle}>Business name</label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required
            placeholder="Acme Store"
            value={formData.businessName}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="platform" style={labelStyle}>E-commerce platform</label>
          <select
            id="platform"
            name="platform"
            required
            value={formData.platform}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="" disabled>Select your platform</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="monthlyOrders" style={labelStyle}>Monthly orders</label>
          <input
            id="monthlyOrders"
            name="monthlyOrders"
            type="number"
            required
            min="0"
            placeholder="e.g. 150"
            value={formData.monthlyOrders}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="timeDrain" style={labelStyle}>Biggest time drain</label>
          <select
            id="timeDrain"
            name="timeDrain"
            required
            value={formData.timeDrain}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="" disabled>Select the biggest drain on your time</option>
            {TIME_DRAINS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="currentTools" style={labelStyle}>
            Current AI tools{' '}
            <span style={{ fontWeight: '400', color: '#5A5D72' }}>(optional)</span>
          </label>
          <input
            id="currentTools"
            name="currentTools"
            type="text"
            placeholder="e.g. ChatGPT, Klaviyo AI, none"
            value={formData.currentTools}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
          />
        </div>

        {error && (
          <p style={{ color: '#FF6B6B', fontSize: '13px' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            marginTop: '4px',
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
            color: '#fff',
            fontWeight: '700',
            fontSize: '15px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            boxShadow: btnHover && !loading ? '0 0 20px rgba(108,99,255,0.5)' : 'none',
            transition: 'box-shadow 0.2s ease, opacity 0.2s ease',
          }}
        >
          {loading ? 'Analyzing your store…' : 'Get my free recommendation'}
        </button>

      </div>
    </form>
  )
}
