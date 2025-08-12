'use client'

import { useState } from 'react'
import { usePostConnectStripeAccountMutation } from '@/redux/paymentApis'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/navigation'

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'IN', name: 'India' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'BR', name: 'Brazil' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'CN', name: 'China' },
  { code: 'MX', name: 'Mexico' },
  { code: 'RU', name: 'Russia' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'TR', name: 'Turkey' },
  { code: 'AR', name: 'Argentina' },
  // Add more if needed
]

const ConnectStripePage = () => {
  const [selectedCountry, setSelectedCountry] = useState('US')
  const [postConnectStripeAccount, { isLoading }] =
    usePostConnectStripeAccountMutation()

  const navigate = useRouter()

  const handleConnect = async () => {
    try {
      const response: any = await postConnectStripeAccount({
        country: selectedCountry,
      }).unwrap()

      if (response.success && response.url) {
        window.location.href = response.url
      } else {
        alert(response.message || 'Failed to connect to Stripe.')
      }
    } catch (error: any) {
      console.error('Error:', error)
      alert(error?.data?.message || 'Something went wrong.')
    }
  }

  return (
    <div className="responsive-width">
      <p
        className="!pl-5 mt-5 text-gray-800 flex items-center gap-1 hover:text-blue-500 cursor-pointer"
        onClick={() => navigate.back()}
      >
        <IoMdArrowRoundBack />
        Back
      </p>

      

      <div className=" mt-40 flex items-center justify-center px-4">
        <div className="bg-white border rounded-2xl p-8 w-full max-w-[600px] text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Connect to Stripe
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Choose your country to start the onboarding process.
          </p>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleConnect}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-transform duration-200 ${
              isLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            }`}
          >
            {isLoading ? 'Connecting...' : 'Connect with Stripe'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectStripePage
