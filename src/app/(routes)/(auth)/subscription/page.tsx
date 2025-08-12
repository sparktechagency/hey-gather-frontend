'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  useCreatePaymentMutation,
  useGetSubscriptionQuery,
} from '@/redux/paymentApis'

type PlanType = 'monthly' | 'yearly'
type SubscriptionType = 'MONTHLY' | 'YEARLY'
type PaymentRequest = {
  price_data: {
    name: string
    unit_amount: number
    quantity: number
  }[]
  subscription_type: SubscriptionType
  purpose: PurposeType
}
type PurposeType = 'BASIC'
const Subscription: React.FC = () => {
  const [plan, setPlan] = useState<PlanType>('monthly')
  const router = useRouter()
  const [createPayment, { isLoading: isCreatingPayment }] =
    useCreatePaymentMutation()
  const { data: subscriptionData, isLoading: isLoadingSubscriptions } =
    useGetSubscriptionQuery()

  const subscription = subscriptionData?.data?.[0]

  const handleSubscribe = async () => {
    if (!subscription) return

    try {
      const payload: PaymentRequest = {
        price_data: [
          {
            name: 'subscription',
            unit_amount:
              plan === 'monthly'
                ? subscription.monthly_price
                : subscription.yearly_price,
            quantity: 1,
          },
        ],
        subscription_type: plan === 'monthly' ? 'MONTHLY' : 'YEARLY',
        purpose: 'BASIC',
      }

      const response = await createPayment(payload).unwrap()

      if (response.success && response.url) {
        window.location.href = response.url
        router.push('/vendor-home')
      }
    } catch (error) {
      console.error('Payment creation failed:', error)
    }
  }

  return (
    <div className="flex">
      <div className="w-1/2 max-lg:hidden">
        <Image
          src="/subscribe.png"
          alt="Subscription"
          className="w-full h-full object-cover"
          width={5000}
          height={50}
          priority
        />
      </div>
      <div className="w-1/2 flex flex-col max-lg:w-full items-center justify-center min-h-screen px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Choose Your Subscription Plan
          </h2>
          <p className="text-gray-600 text-sm">
            Get the best features to grow your business!
          </p>
        </div>

        {isLoadingSubscriptions ? (
          <div className="p-6 rounded-lg shadow-md max-w-lg w-full text-center">
            <p>Loading subscription options...</p>
          </div>
        ) : (
          subscription && (
            <div className="p-6 rounded-lg shadow-md max-w-lg w-full">
              <div className="flex justify-center space-x-2 mb-6">
                <button
                  className={`cursor-pointer px-6 py-2 rounded-lg ${
                    plan === 'monthly'
                      ? 'bg-blue-800 text-white shadow'
                      : 'bg-gray-200'
                  } transition-all duration-700`}
                  onClick={() => setPlan('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`cursor-pointer px-6 py-2 rounded-lg ${
                    plan === 'yearly'
                      ? 'bg-blue-800 text-white shadow'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => setPlan('yearly')}
                >
                  Yearly
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex gap-2">
                  {plan === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
                  {plan === 'monthly' && subscription.monthly_tag && (
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs flex items-center rounded-full">
                      {subscription.monthly_tag}
                    </span>
                  )}
                  {plan === 'yearly' && subscription.yearly_tag && (
                    <span className="bg-green-100 text-green-600 px-2 py-1 text-xs flex items-center rounded-full">
                      {subscription.yearly_tag}
                    </span>
                  )}
                </h3>

                <p className="text-2xl font-bold text-blue-600 mt-2">
                  $
                  {plan === 'monthly'
                    ? subscription.monthly_price
                    : subscription.yearly_price}
                  {plan === 'yearly' ? '/month billed annually' : '/month'}
                </p>

                <ul className="mt-4 space-y-2">
                  {(plan === 'monthly'
                    ? subscription.monthly_benefits
                    : subscription.yearly_benefits
                  ).map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✔</span> {benefit}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleSubscribe}
                  disabled={isCreatingPayment}
                  className="cursor-pointer mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400"
                >
                  {isCreatingPayment ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Subscription
