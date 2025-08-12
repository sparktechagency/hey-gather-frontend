'use client'

import { useCreatePaymentMutation } from '@/redux/paymentApis'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { FaCheckCircle } from 'react-icons/fa'

interface PriceData {
  name: string
  unit_amount: number
  quantity: number
  booking_id?: string
}

type SubscriptionType = 'MONTHLY' | 'YEARLY'
type PurposeType = 'BOOKING' | 'BASIC' | 'PREMIUM'

interface PaymentRequest {
  price_data: PriceData[]
  subscription_type?: SubscriptionType
  purpose: PurposeType
  currency?: string
}

interface PaymentResponse {
  success: boolean
  message: string
  url: string
}

interface SubscriptionBenefit {
  monthly_benefits: string[]
  yearly_benefits: string[]
  monthly_price: number
  yearly_price: number
  monthly_tag: string
  yearly_tag: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface SubscriptionResponse {
  success: boolean
  message: string
  data: SubscriptionBenefit[]
}
export default function VendorPlan() {
  const [createPayment, { isLoading: isCreatingPayment }] =
    useCreatePaymentMutation()

  const handleSubscribe = async () => {
    try {
      const payload: PaymentRequest = {
        price_data: [
          {
            name: 'subscription',
            unit_amount: 69.99,
            quantity: 1,
          },
        ],
        subscription_type: 'MONTHLY',
        purpose: 'PREMIUM',
      }

      const response = await createPayment(payload).unwrap()

      if (response.success && response.url) {
        window.location.href = response.url
      }
    } catch (error) {
      console.error('Payment creation failed:', error)
    }
  }

  const features = [
    'Priority Listing',
    'Exclusive Badge',
    'Higher Visibility',
    'Unlimited Updates',
    'Collaboration Tools',
    'Dedicated Support',
    'Mobile App Access',
    'All Integrations Included',
  ]

  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4 mb-10">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-gray-900">
          Our Exclusive Top Vendor Plan
        </h2>
        <p className="text-gray-500">
          Boost Your Visibility & Get More Bookings!
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border p-8 max-w-[800px] w-full">
        <div className="flex justify-between items-center mb-4">
          <Image
            src="/premium.svg"
            alt="badge"
            className="w-20 h-20"
            width={5000}
            height={50}
          />
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-md font-semibold">
            $69.99/mo
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Premium Vendor Plan
        </h3>
        <p className="text-gray-500 mb-4">
          For vendors who want to stand out and maximize their bookings.
        </p>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mb-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-gray-800"
            >
              <FaCheckCircle className="text-blue-600" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          onClick={handleSubscribe}
        >
          Get started
        </button>
      </div>
    </div>
  )
}
