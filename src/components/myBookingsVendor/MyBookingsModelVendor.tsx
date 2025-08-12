import { Button, Form, Input, Modal, Rate } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import BookingRequestVendor from './BookingRequestVendor'
import UpdateBookingModal from './UpdateBookingModal'
import {
  useUpdateBookingsMutation,
  useUpdateBookingStatusMutation,
} from '@/redux/bookingsApis'
import { useCreatePaymentMutation } from '@/redux/paymentApis'
import { useRouter } from 'next/navigation'

interface CardProps {
  id: string
  bookingType: string
  image: string
  userId: string
  name: string
  email: string
  phone: string
  bookingFor: string
  selectServices: string[]
  eventName?: string
  eventLocation?: string
  eventTime?: string
  eventDate?: string
  numberOfGuests?: string
  eventDuration?: string
  additionalRequirements?: string
  additionalNote?: string
  amountPaid?: string
  timeLeft?: string
  requested_by?: string
  price?: number
  is_paid?: boolean
}

const MyBookingsModelVendor = ({
  id,
  bookingType,
  userId,
  image,
  name,
  email,
  phone,
  bookingFor,
  selectServices,
  eventName,
  eventLocation,
  eventTime,
  eventDate,
  numberOfGuests,
  eventDuration,
  additionalRequirements,
  additionalNote,
  amountPaid,
  timeLeft,
  requested_by,
  price,
  is_paid,
}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateBookingModalOpen, setIsUpdateBookingModalOpen] =
    useState(false)
  const [
    isUpdateCompleteBookingModalOpen,
    setIsUpdateCompleteBookingModalOpen,
  ] = useState(false)
  const [isUpdateCancelBookingModalOpen, setIsUpdateCancelBookingModalOpen] =
    useState(false)
  const [updateBookings] = useUpdateBookingsMutation()
  const [updateBookingStatus] = useUpdateBookingStatusMutation()

  const status = ['accepted', 'completed', 'canceled', 'pending']

  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isClickCustomBooking, setIsClickCustomBooking] = useState(false)

  const [isModalVisiblePayment, setIsModalVisiblePayment] = useState(false)

  const handleOpenModalPayment = () => {
    setIsModalVisiblePayment(true)
  }

  const handleAcceptPayment = () => {
    handleSubmit()
    setIsModalVisiblePayment(false)
  }
  const handleAcceptComplete = () => {
    handleSubmitComplete()
    setIsUpdateCompleteBookingModalOpen(false)
  }
  const handleAcceptCancel = () => {
    handleSubmitCancel()
    setIsUpdateCancelBookingModalOpen(false)
  }

  const handleCancelPayment = () => {
    setIsModalVisiblePayment(false)
  }

  const handleSubmit = () => {
    toast.success('Status changed successfully!')
    updateBookingStatus({ id, status: 'accepted' }).unwrap()
    setIsReviewModalOpen(false)
  }
  const handleSubmitCancel = () => {
    toast.success('Status changed successfully!')
    updateBookingStatus({ id, status: 'canceled' }).unwrap()
  }
  const handleSubmitComplete = () => {
    toast.success('Status changed successfully!')
    updateBookingStatus({ id, status: 'completed' }).unwrap()
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // const handleClickCustomBooking = () => {
  //   setIsClickCustomBooking(true)
  // }
  // const handleCancelCustomBooking = () => {
  //   setIsClickCustomBooking(false)
  // }

  const handleUpdateBooking = async (updateData: {
    id: string
    price: string
    additional_services: string
    additional_note: string
  }) => {
    try {
      updateBookings(updateData).unwrap()
      toast.success('Booking updated successfully!')
      setIsUpdateBookingModalOpen(false)
    } catch (error) {
      console.error('Failed to update booking:', error)
      toast.error('Failed to update booking')
    }
  }
  const handleClickUpdateBooking = () => {
    setIsUpdateBookingModalOpen(true)
  }
  const handleCancelClickUpdateBooking = () => {
    setIsUpdateBookingModalOpen(false)
  }

  const handleClickUpdateBookingToComplete = () => {
    setIsUpdateCompleteBookingModalOpen(true)
  }
  const handleCancelClickUpdateBookingToComplete = () => {
    setIsUpdateCompleteBookingModalOpen(false)
  }

  const handleClickCancelBooking = () => {
    setIsUpdateCancelBookingModalOpen(true)
  }
  const handleClickCancelBookingCancelButton = () => {
    setIsUpdateCancelBookingModalOpen(false)
  }

  const handleBookingStatus = async () => {
    try {
      updateBookingStatus({
        id: id,
        status: 'accepted',
      }).unwrap()
      toast.success('Booking goes to ongoing status tab!')
    } catch (error) {
      console.error('Failed to update booking status:', error)
      toast.error('Failed to update booking status')
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
        <div className="mx-auto bg-white rounded-xl space-y-4 w-full">
          <div className="flex items-center  space-x-4 mb-3 w-full">
            <div>
              <h1 className="font-bold text-[16px] underline underline-offset-4">
                User Details
              </h1>
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
                <span className="font-normal bg-blue-100 px-3 py-1 rounded-lg">
                  {bookingFor}
                </span>
              </p>
              <div className="text-sm flex gap-2 bg-red-200 p-2 items-center justify-center  font-bold">
                <p className="font-semibold">Price:</p>
                <span className="text-[16px]">{price}</span>
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
              <p className="font-semibold">Event Date:</p>
              <span>{eventDate}</span>
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

          {amountPaid && is_paid && bookingType === 'requested' && (
            <div
              className="bg-gray-100 text-center py-2 rounded-md text-blue-600 font-semibold hover:bg-blue-100 cursor-pointer"
              onClick={handleOpenModalPayment}
            >
              User Paid: {amountPaid}
              <span className="text-sm text-gray-500"> (Paid)</span>
              <div>Click to Update Status as Accepted</div>
            </div>
          )}
          {bookingType === 'ongoing' && (
            <div className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md">
              <p>{timeLeft}</p>
            </div>
          )}
          {bookingType === 'ongoing' && (
            <div
              className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md cursor-pointer hover:bg-blue-200"
              onClick={handleClickUpdateBookingToComplete}
            >
              <p>Click to Update Status to Completed</p>
            </div>
          )}
          {bookingType === 'requested' && (
            <div className="flex justify-end text-xl">
              <p className="font-semibold text-red-500">
                Price: {price}{' '}
                <span className="text-sm text-gray-500">
                  {is_paid ? '(Paid)' : '(Not Paid)'}
                </span>
              </p>
            </div>
          )}
          {bookingType === 'requested' && !is_paid && (
            <div className="">
              <Button
                className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md w-full h-[42px]"
                onClick={handleClickUpdateBooking}
              >
                Update Booking
              </Button>
            </div>
          )}
          {bookingType === 'requested' && !is_paid && (
            <div className="">
              <Button
                className="bg-blue-100 text-center text-blue-500 text-lg p-2 rounded-md w-full h-[42px]"
                onClick={handleClickCancelBooking}
              >
                Cancel Booking
              </Button>
            </div>
          )}

          <UpdateBookingModal
            id={id}
            isOpen={isUpdateBookingModalOpen}
            onCancel={handleCancelClickUpdateBooking}
            onUpdate={handleUpdateBooking}
            initialData={{
              price,
              additional_services: additionalRequirements,
              additional_note: additionalNote,
            }}
          />
        </div>
      </Modal>

      <Modal
        open={isModalVisiblePayment}
        onOk={handleAcceptPayment}
        onCancel={handleCancelPayment}
        centered
        footer={[
          <Button key="cancel" onClick={handleCancelPayment}>
            Cancel
          </Button>,
          <Button key="accept" type="primary" onClick={handleAcceptPayment}>
            Accept Payment
          </Button>,
        ]}
      >
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Confirm Payment Status</p>
          <p>
            Total Paid Amount: <strong>{amountPaid}</strong>
          </p>
          <p className="text-gray-600 mt-2">
            Are you sure you want to update the status to Accepted?
          </p>
        </div>
      </Modal>

      <Modal
        open={isUpdateCancelBookingModalOpen}
        onOk={handleAcceptCancel}
        onCancel={handleClickCancelBookingCancelButton}
        centered
        footer={[
          <Button key="cancel" onClick={handleClickCancelBookingCancelButton}>
            Cancel
          </Button>,
          <Button key="accept" type="primary" onClick={handleAcceptCancel}>
            Yes, Cancel Booking
          </Button>,
        ]}
      >
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">
            Confirm Cancellation of Booking
          </p>
          <p className="text-gray-600 mt-2">
            Are you sure you want to update the status to Canceled?
          </p>
        </div>
      </Modal>

      <Modal
        open={isUpdateCompleteBookingModalOpen}
        onOk={handleAcceptComplete}
        onCancel={handleCancelClickUpdateBookingToComplete}
        centered
        footer={[
          <Button
            key="cancel"
            onClick={handleCancelClickUpdateBookingToComplete}
          >
            Cancel
          </Button>,
          <Button key="accept" type="primary" onClick={handleAcceptComplete}>
            Accept Completion
          </Button>,
        ]}
      >
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">
            Confirm Completion of Booking
          </p>
          <p className="text-gray-600 mt-2">
            Are you sure you want to update the status to Completed?
          </p>
        </div>
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

export default MyBookingsModelVendor
