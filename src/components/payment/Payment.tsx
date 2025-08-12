'use client'

import { useGetPromoCodeQuery } from '@/redux/promoCodesApis'
import { useCreateVendorPaymentMutation } from '@/redux/vendorPaymentApis'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const Payment = ({
  price,
  name,
  email,
  phone,
  id,
  handleSubscribe,
}: {
  price: number
  name: string
  email: string
  phone: string
  id: string
  handleSubscribe: () => void
}) => {
  const [showPromo, setShowPromo] = useState(false)
  const [inputPromoCode, setInputPromoCode] = useState('')
  const [verifyPromoCode, setVerifyPromoCode] = useState('')
  const [finalPrice, setFinalPrice] = useState(price)
  const [appliedPromo, setAppliedPromo] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [createVendorPayment, { isLoading: isCreatingPayment }] =
    useCreateVendorPaymentMutation()

  const {
    data: promoData,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPromoCodeQuery(
    { promoCode: verifyPromoCode },
    { skip: verifyPromoCode === '' }
  )

  useEffect(() => {
    if (!appliedPromo) {
      setFinalPrice(price)
    }
  }, [price, appliedPromo])

  useEffect(() => {
    if (!isVerifying) return

    toast.dismiss('verifying-promo')

    if (!isFetching) {
      if (isError || !promoData || !promoData.success) {
        const errorMessage = promoData?.message || 'Invalid promo code'
        toast.error(errorMessage)

        setAppliedPromo(false)
        setFinalPrice(price)
        setIsVerifying(false)
        return
      }

      if (promoData.data) {
        const promo = promoData.data

        const currentDate = new Date()
        const startDate = new Date(promo.start_date)
        const endDate = new Date(promo.end_date)

        if (
          promo.is_active &&
          currentDate >= startDate &&
          currentDate <= endDate
        ) {
          if (promo.type === 'fixed') {
            setFinalPrice(Math.max(0, price - promo.amount))
            toast.success(`Promo code applied! $${promo.amount} discount`)
            setAppliedPromo(true)
          } else if (promo.type === 'percentage') {
            const discountAmount = (price * promo.amount) / 100
            setFinalPrice(price - discountAmount)
            toast.success(`Promo code applied! ${promo.amount}% discount`)
            setAppliedPromo(true)
          }
        } else {
          toast.error('Promo code is expired or not active yet')
          setAppliedPromo(false)
          setFinalPrice(price)
        }
      } else {
        toast.error('Error processing promo code')
        setAppliedPromo(false)
        setFinalPrice(price)
      }

      setIsVerifying(false)
    }
  }, [promoData, isFetching, isError, error, price, isVerifying])

  const handlePromoToggle = () => {
    setShowPromo(!showPromo)
    if (!showPromo) {
      resetPromoState()
    }
  }

  const resetPromoState = () => {
    setInputPromoCode('')
    setVerifyPromoCode('')
    setAppliedPromo(false)
    setFinalPrice(price)
    setIsVerifying(false)
  }

  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPromoCode(e.target.value)
  }

  const applyPromoCode = () => {
    if (inputPromoCode.trim() === '') {
      toast.error('Please enter a promo code')
      return
    }

    setAppliedPromo(false)
    setFinalPrice(price)

    setIsVerifying(true)
    setVerifyPromoCode(inputPromoCode.trim())

    refetch()

    toast.loading('Verifying promo code...', { id: 'verifying-promo' })
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      toast.loading('Processing payment...', { id: 'creating-payment' })

      const paymentData = {
        price_data: [
          {
            name: name,
            unit_amount: finalPrice,
            quantity: 1,
            booking_id: id,
          },
        ],
        purpose: 'BOOKING',
      }

      const response = await createVendorPayment(paymentData).unwrap()

      toast.dismiss('creating-payment')

      if (response.success) {
        toast.success('Payment created successfully!')

        if (response.url) {
          window.location.href = response.url
        }
      } else {
        toast.error(response.message || 'Failed to create payment')
      }
      handleSubscribe()
    } catch (error) {
      toast.dismiss('creating-payment')
      toast.error('Error creating payment')
      console.error('Payment error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Payment Information
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          value={`$${finalPrice}`}
          type="text"
          className="mt-1 block w-full outline-none px-4 py-2 border border-gray-300 rounded-md"
          readOnly
        />
        {appliedPromo && (
          <p className="text-sm text-green-600 mt-1">
            Promo code applied: {verifyPromoCode}
          </p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="promoToggle"
            checked={showPromo}
            onChange={handlePromoToggle}
            className="w-5 h-5 mr-2"
          />
          <label
            htmlFor="promoToggle"
            className="text-sm font-medium text-gray-700"
          >
            Apply Promo Code
          </label>
        </div>
      </div>

      {showPromo && (
        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputPromoCode}
              onChange={handlePromoChange}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Promo Code"
              disabled={isVerifying}
            />
            <button
              type="button"
              onClick={applyPromoCode}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300"
              disabled={isVerifying || inputPromoCode.trim() === ''}
            >
              {isVerifying ? 'Checking...' : 'Apply'}
            </button>
          </div>
          {appliedPromo && inputPromoCode !== verifyPromoCode && (
            <p className="text-xs text-amber-600 mt-1">
              Click Apply to use this new promo code instead of the current one.
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        disabled={isSubmitting || isVerifying}
      >
        {isSubmitting ? 'Processing...' : 'Continue'}
      </button>
    </div>
  )
}

export default Payment
