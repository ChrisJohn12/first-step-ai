import { useState } from 'react'

const PLATFORMS = [
  'Shopify',
  'WooCommerce',
  'BigCommerce',
  'Magento',
  'Squarespace',
  'Wix',
  'Other',
]

export default function IntakeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    platform: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    onSubmit?.(formData)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-green-50 p-8 text-center">
        <div className="text-4xl">✓</div>
        <h2 className="text-xl font-semibold text-green-800">You're on the list!</h2>
        <p className="text-green-700">We'll be in touch at {formData.email}.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-md sm:p-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Get early access</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tell us a bit about your store and we'll reach out with next steps.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="businessName" className="text-sm font-medium text-gray-700">
          Business name
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          required
          placeholder="Acme Store"
          value={formData.businessName}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="platform" className="text-sm font-medium text-gray-700">
          E-commerce platform
        </label>
        <select
          id="platform"
          name="platform"
          required
          value={formData.platform}
          onChange={handleChange}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="" disabled>
            Select your platform
          </option>
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="mt-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
      >
        Request access
      </button>
    </form>
  )
}
