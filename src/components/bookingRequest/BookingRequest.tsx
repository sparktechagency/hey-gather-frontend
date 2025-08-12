'use client'

import { useState } from 'react'
import {
  Modal,
  Button,
  Input,
  Radio,
  DatePicker,
  TimePicker,
  Select,
} from 'antd'
import toast from 'react-hot-toast'
import { useCreateBookingsMutation } from '@/redux/bookingsApis'

const { Option } = Select

interface BookingRequestProps {
  vendorId?: string
  services?: Array<{ _id: string; name: string }>
  categoryId?: string
}

interface BookingFormData {
  event_name: string
  phoneNumber: string
  location: string
  date: string
  time: string
  number_of_guests: string
  duration: string
  additional_services?: string
  additional_note?: string
  business_service: string
  category: string
  services: string[]
}

const BookingRequest: React.FC<BookingRequestProps> = ({
  vendorId,
  services = [],
  categoryId = '',
}) => {
  const [createBooking, { isLoading }] = useCreateBookingsMutation()
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const [formData, setFormData] = useState<BookingFormData>({
    event_name: '',
    phoneNumber: '',
    location: '',
    date: '',
    time: '',
    number_of_guests: '',
    duration: '',
    additional_services: '',
    additional_note: '',
    business_service: vendorId || '',
    category: categoryId || '',
    services: [],
  })

  const handleNext = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1)
    } else {
      toast.error('Please fill all required fields.')
    }
  }

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleDateChange = (date: any, dateString: string | string[]) => {
    setFormData((prevData) => ({ ...prevData, date: dateString as string }))
  }

  const handleTimeChange = (time: any, timeString: string | string[]) => {
    setFormData((prevData) => ({ ...prevData, time: timeString as string }))
  }

  const handleServiceChange = (values: string[]) => {
    setSelectedServices(values)
    setFormData((prevData) => ({ ...prevData, services: values }))
  }

  const handleRadioChange = (e: any, field: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: e.target.value }))
  }

  const handleModalOpen = () => {
    setVisible(true)
    setStep(1)
  }

  const handleSubmit = async () => {
    try {
      const bookingData = {
        category: formData.category,
        services: formData.services,
        date: formData.date,
        time: formData.time,
        number_of_guests: formData.number_of_guests,
        duration: formData.duration,
        additional_services: formData.additional_services || '',
        business_service: formData.business_service,
        location: formData.location,
        event_name: formData.event_name,
        additional_note: formData.additional_note || '',
      }

      const response = await createBooking(bookingData).unwrap()

      toast.success(
        response.message || 'Booking request submitted successfully!'
      )
      setVisible(false)
      resetForm()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to submit booking request')
    }
  }

  const resetForm = () => {
    setFormData({
      event_name: '',
      phoneNumber: '',
      location: '',
      date: '',
      time: '',
      number_of_guests: '',
      duration: '',
      additional_services: '',
      additional_note: '',
      business_service: vendorId || '',
      category: categoryId || '',
      services: [],
    })
    setSelectedServices([])
  }

  const validateStep = (): boolean => {
    const validations: Record<number, boolean> = {
      1: !!(formData.event_name && formData.phoneNumber && formData.location),
      2: !!(formData.date && formData.time),
      3: !!formData.number_of_guests,
      4: !!formData.duration,
      5: true,
      6: true,
      7: formData.services.length > 0,
    }

    return validations[step] || false
  }
  return (
    <>
      <div
        onClick={handleModalOpen}
        className="relative inline-block px-8 py-4 mt-4 text-white font-bold text-lg rounded-full 
             bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg cursor-pointer 
             transition-all duration-300 ease-in-out overflow-hidden group"
      >
        <span
          className="relative z-10 flex items-center justify-center gap-2 px-6 py-2
               bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full
               group-hover:from-blue-600 group-hover:to-indigo-500 transition-all duration-300"
        >
          <svg
            className="w-5 h-5 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-4.553a.5.5 0 00-.707-.707L14 9.293 9.293 4.586a1 1 0 00-1.414 0L4.586 8.879a1 1 0 000 1.414l7.414 7.414a1 1 0 001.414 0l5.707-5.707a.5.5 0 00-.707-.707L15 10z"
            />
          </svg>
          Check Availability
        </span>
      </div>

      <Modal
        title={
          <span
            className="flex items-center justify-center"
            style={{ fontSize: '28px', fontWeight: '500', textAlign: 'center' }}
          >
            Check Availability
          </span>
        }
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={500}
        centered
      >
        {step === 1 && (
          <div>
            <div>
              <label className="block text-sm font-medium">Event Name:</label>
              <Input
                name="event_name"
                value={formData.event_name}
                onChange={handleChange}
                className="mt-1 h-[42px] block w-full"
                placeholder="Event Name"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Phone Number:</label>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 h-[42px] block w-full"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">
                Event Location:
              </label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 h-[42px] block w-full"
                placeholder="Event Location"
                required
              />
            </div>
            <div className="mt-6">
              <Button
                type="primary"
                onClick={handleNext}
                className="w-full h-[42px] bg-blue-800"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div>
              <label className="block text-sm font-medium">Event Date:</label>
              <DatePicker
                onChange={handleDateChange}
                className="mt-1 h-[42px] block w-full"
                placeholder="Select Date"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Serving Time :</label>
              <TimePicker
                format="h:mm A"
                onChange={handleTimeChange}
                className="mt-1 h-[42px] block w-full"
                placeholder="Select Time"
                required
              />
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handlePrev}
                className="w-1/3 h-[42px] bg-gray-200"
              >
                Previous
              </Button>
              <Button
                type="primary"
                onClick={handleNext}
                className="w-1/3 h-[42px] bg-blue-800"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div>
              <label className="block text-sm font-medium">
                Number of Guests:
              </label>
              <Radio.Group
                value={formData.number_of_guests}
                onChange={(e) => handleRadioChange(e, 'number_of_guests')}
                className="mt-1 flex flex-col gap-2"
              >
                <Radio value="10-50">10-50</Radio>
                <Radio value="50-100">50-100</Radio>
                <Radio value="100-150">100-150</Radio>
                <Radio value="150-200">150-200</Radio>
                <Radio value="200-250">200-250</Radio>
                <Radio value="250-300">250-300</Radio>
                <Radio value="300-400">300-400</Radio>
                <Radio value="More than 400">More than 400</Radio>
              </Radio.Group>
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handlePrev}
                className="w-1/3 h-[42px] bg-gray-200"
              >
                Previous
              </Button>
              <Button
                type="primary"
                onClick={handleNext}
                className="w-1/3 h-[42px] bg-blue-800"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div>
              <label className="block text-sm font-medium">
                Event Duration:
              </label>
              <Radio.Group
                value={formData.duration}
                onChange={(e) => handleRadioChange(e, 'duration')}
                className="mt-1 flex flex-col gap-2"
              >
                <Radio value="2 hours">2 hours</Radio>
                <Radio value="2-4 hours">2-4 hours</Radio>
                <Radio value="4-6 hours">4-6 hours</Radio>
                <Radio value="6-10 hours">6-10 hours</Radio>
                <Radio value="10-12 hours">10-12 hours</Radio>
                <Radio value="More than 12 hours">More than 12 hours</Radio>
              </Radio.Group>
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handlePrev}
                className="w-1/3 h-[42px] bg-gray-200"
              >
                Previous
              </Button>
              <Button
                type="primary"
                onClick={handleNext}
                className="w-1/3 h-[42px] bg-blue-800"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <div>
              <label className="block text-sm font-medium">
                Additional services needed:
              </label>
              <Input.TextArea
                name="additional_services"
                value={formData.additional_services}
                onChange={handleChange}
                className="mt-1 block w-full"
                placeholder="E.g., Champagne, VIP Seating, Special decorations"
                rows={3}
              />
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handlePrev}
                className="w-1/3 h-[42px] bg-gray-200"
              >
                Previous
              </Button>
              <Button
                type="primary"
                onClick={handleNext}
                className="w-1/3 h-[42px] bg-blue-800"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <div>
              <label className="block text-sm font-medium">
                Additional note:
              </label>
              <Input.TextArea
                name="additional_note"
                value={formData.additional_note}
                onChange={handleChange}
                className="mt-1 block w-full"
                placeholder="E.g., Any special requests or notes"
                rows={3}
              />
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handlePrev}
                className="w-1/3 h-[42px] bg-gray-200"
              >
                Previous
              </Button>
              <Button
                type="primary"
                onClick={handleNext}
                className="w-1/3 h-[42px] bg-blue-800"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <div>
              <label className="block text-sm font-medium">
                Select Services:
              </label>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select services"
                value={selectedServices}
                onChange={handleServiceChange}
                optionLabelProp="label"
                className="mt-1"
              >
                {services?.map((service) => (
                  <Option
                    key={service._id}
                    value={service._id}
                    label={service.name}
                  >
                    {service.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={handlePrev}
                className="w-1/3 h-[42px] bg-gray-200"
              >
                Previous
              </Button>
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={isLoading}
                className="w-1/3 h-[42px] bg-blue-800"
              >
                Submit Request
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default BookingRequest
