import { Button, Input, Modal, Rate } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Payment from '../payment/Payment'
import toast from 'react-hot-toast'
import { useCreatePaymentMutation } from '@/redux/paymentApis'
import { useRouter } from 'next/navigation'
import { useCreateReviewMutation } from '@/redux/reviewRatingApis'

interface CardProps {
  id: string
  bookingType: string
  image: string
  name: string
  email: string
  phone: string
  bookingFor: string
  selectServices: string[]
  eventName?: string
  eventLocation?: string
  eventTime?: string
  numberOfGuests?: string
  eventDuration?: string
  additionalRequirements?: string
  additionalNote?: string
  amountPaid?: string
  timeLeft?: string
  price: number
  requested_by?: string
  is_paid?: boolean
  business_service: string
}

enum PurposeType {
  BOOKING = 'BOOKING',
}

interface PriceData {
  name: string
  unit_amount: number
  quantity: number
  booking_id: string
}

interface PaymentRequest {
  price_data: PriceData[]
  purpose: PurposeType
}

const MyBookingsModel = ({
  id,
  bookingType,
  image,
  name,
  email,
  price,
  phone,
  bookingFor,
  selectServices,
  eventName,
  eventLocation,
  eventTime,
  numberOfGuests,
  eventDuration,
  additionalRequirements,
  additionalNote,
  amountPaid,
  is_paid,
  timeLeft,
  requested_by,
  business_service,
}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createPayment, { isLoading: isCreatingPayment }] =
    useCreatePaymentMutation()
  const router = useRouter()

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [createReview, { isLoading: isCreatingReview }] =
    useCreateReviewMutation()

  // const handleSubmit = () => {
  //   console.log(business_service, rating, review)
  //   createReview({
  //     service: business_service,
  //     rating: String(rating),
  //     description: review,
  //   }).unwrap()
  //   toast.success('Review submitted successfully!')
  //   setIsReviewModalOpen(false)
  //   setRating(0)
  //   setReview('')
  // }

  const handleSubmit = () => {
    if (isNaN(rating) || rating <= 0) {
      toast.error('Please provide a valid rating.')
      return
    }

    if (!review.trim()) {
      toast.error('Please provide a review description.')
      return
    }

    createReview({
      service: business_service,
      rating: rating,
      description: review,
    })
      .unwrap()
      .then(() => {
        toast.success('Review submitted successfully!')
        setIsReviewModalOpen(false)
        setRating(0)
        setReview('')
      })
      .catch((error) => {
        toast.error('Failed to submit review. Please try again.')
        console.error('Review submission error:', error)
      })
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const handlePaymentClick = () => {
    setIsPaymentModalOpen(true)
  }

  const handlePaymentModalCancel = () => {
    setIsPaymentModalOpen(false)
  }
  const handleSubscribe = async () => {
    try {
      const payload: PaymentRequest = {
        price_data: [
          {
            name: name,
            unit_amount: price ?? 0,
            quantity: 1,
            booking_id: id,
          },
        ],
        purpose: PurposeType.BOOKING,
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
    <>
      <div
        onClick={showModal}
        className="mt-2 cursor-pointer bg-blue-600 flex items-center justify-center text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
      >
        View Details
      </div>

      <Modal
        title={
          <div className="flex items-center mb-5 justify-center text-center text-3xl">
            {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)} booking
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelText={
          bookingType === 'paymentRequest' ? (
            <div onClick={handlePaymentClick} style={{ color: 'red' }}>
              Payment
            </div>
          ) : bookingType === 'completed' ? (
            <div onClick={() => setIsReviewModalOpen(true)}>Get Rating</div>
          ) : null
        }
        cancelButtonProps={{
          style: {
            display:
              bookingType !== 'ongoing' &&
              bookingType !== 'canceled' &&
              bookingType !== 'requested'
                ? 'inline-block'
                : 'none',
          },
        }}
        centered
      >
        <div className="mx-auto bg-white rounded-xl space-y-4">
          <div className="flex items-center space-x-4 mb-3">
            <div>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-sm text-gray-500">{email}</p>
              <p className="text-sm text-gray-500">{phone}</p>
            </div>
          </div>

          <Link href={`/chat`}>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
              Send Message
            </button>
          </Link>

          <div className="space-y-3 text-md">
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                Booking For:{' '}
                <span className="font-normal bg-gray-100 px-3 py-1 rounded-lg">
                  {bookingFor}
                </span>
              </p>
              <div className="text-sm flex gap-2 bg-red-200 p-2 items-center justify-center  font-bold">
                <p className="font-semibold">Price:</p>
                <span className="text-[16px]">${price}</span>
                <span className="text-[16px]">
                  {is_paid ? '(Paid) ' : '(unpaid)'}
                </span>
              </div>
            </div>

            <div>
              <p className="font-semibold">Event Name:</p>
              <span>{eventName}</span>
            </div>
            <div>
              <p className="font-semibold">Event Location:</p>
              <span>{eventLocation}</span>
            </div>
            <div>
              <p className="font-semibold">Serving Time:</p>
              <span>{eventTime}</span>
            </div>
            <div>
              <p className="font-semibold">Number of guests:</p>
              <span>{numberOfGuests}</span>
            </div>
            <div>
              <p className="font-semibold">Event Duration:</p>
              <span>{eventDuration}</span>
            </div>
          </div>

          <div>
            <p className="font-semibold">Select Service:</p>
            <div className="flex gap-2 mt-1">
              {selectServices.map((service: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 px-3 py-1 rounded-md text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="text-gray-600 text-sm">
            <p className="font-semibold">
              Additional Requirements or Services Needed:
            </p>

            <p>{additionalRequirements || 'None specified'}</p>
          </div>

          <div className="text-gray-600 text-sm">
            <p className="font-semibold">Additional Note:</p>

            <p>{additionalNote || 'None specified'}</p>
          </div>

          {bookingType === 'ongoing' && (
            <div className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md">
              <p>{timeLeft}</p>
            </div>
          )}

          {bookingType === 'requested' && (
            <div className="flex justify-end text-[16px]">
              <div>
                <p className="font-semibold text-red-500">Price: {price}</p>
                <button
                  onClick={handlePaymentClick}
                  // onClick={handleSubscribe}
                  className="border rounded-lg px-2 py-1 bg-blue-600 text-white hover:bg-white hover:text-black"
                >
                  Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        open={isPaymentModalOpen}
        onCancel={handlePaymentModalCancel}
        footer={null}
        centered
      >
        <Payment
          price={price}
          name={name}
          email={email}
          phone={phone}
          id={id}
          handleSubscribe={handleSubscribe}
        />
      </Modal>

      <Modal
        open={isReviewModalOpen}
        onCancel={() => setIsReviewModalOpen(false)}
        footer={null}
        centered
      >
        <div className="space-y-4">
          <p className="text-lg font-semibold">
            How Would You Rate This Vendor Overall?
          </p>
          <Rate onChange={setRating} value={rating} />

          <div>
            <p className="text-lg font-semibold">Review</p>
            <Input.TextArea
              rows={4}
              placeholder="Enter your Review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <Button
            type="primary"
            className="bg-blue-600 w-full text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default MyBookingsModel
