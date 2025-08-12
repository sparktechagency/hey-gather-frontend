'use client'

import { useState, useEffect, useCallback } from 'react'
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
import {
  useCreateBookingsMutation,
  useCustomCreateBookingsMutation,
} from '@/redux/bookingsApis'
import { useGetBusinessDataQuery } from '@/redux/businessApis'
import { useGetProfileDataQuery } from '@/redux/profileApis'

const { Option } = Select

interface BookingRequestProps {
  onClose: () => void
  userId?: string
}

interface BusinessService {
  _id: string
  name: string
  category: string
}

interface BusinessCategory {
  _id: string
  name: string
}

interface BookingFormData {
  user: string
  event_name: string
  phoneNumber: string
  location: string
  date: string
  time: string
  number_of_guests: string
  duration: string
  additional_services?: string
  business_service: string
  category: string
  services: string[]
  is_paid: boolean
}

const BookingRequestVendor: React.FC<BookingRequestProps> = ({
  onClose,
  userId,
}) => {
  const [createBooking, { isLoading }] = useCreateBookingsMutation()
  const [customCreateBooking, { isLoading: isCustomLoading }] =
    useCustomCreateBookingsMutation()

  const { data: getProfileData } = useGetProfileDataQuery()

  const businessId = getProfileData?.data?.business_profile[0]?._id
  const { data: getBusinessServiceData } = useGetBusinessDataQuery({
    business: businessId,
  })

  const businessData = getBusinessServiceData?.data

  const businessCategories: BusinessCategory[] =
    businessData?.map((item: any) => item.business_category) || []
  const allBusinessServices: BusinessService[] =
    businessData?.flatMap((item: any) =>
      item.business_services.map((service: any) => ({
        ...service,
        category: item.business_category._id,
      }))
    ) || []

  const businessServiceId = getBusinessServiceData?.data?.map((item: any) => ({
    id: item._id,
    category: item.business_category._id,
  }))

  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [price, setPrice] = useState<string>('')

  const [formData, setFormData] = useState<BookingFormData>({
    user: userId || '',
    event_name: '',
    phoneNumber: '',
    location: '',
    date: '',
    time: '',
    number_of_guests: '',
    duration: '',
    additional_services: '',
    business_service: businessData?._id || '',
    category: '',
    services: [],
    is_paid: false,
  })

  const filteredServices = allBusinessServices.filter(
    (service) => service.category === selectedCategory
  )

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

  const findBusinessServiceId = useCallback(
    (selectedCategory: string, businessServiceData: any[]) => {
      const matchedService = businessServiceData?.find(
        (service) => service.business_category._id === selectedCategory
      )

      return matchedService ? matchedService._id : null
    },
    []
  )

  useEffect(() => {
    if (selectedCategory && getBusinessServiceData?.data) {
      const correspondingBusinessServiceId = findBusinessServiceId(
        selectedCategory,
        getBusinessServiceData.data
      )

      setFormData((prevData) => ({
        ...prevData,
        business_service: correspondingBusinessServiceId || '',
        category: selectedCategory,
      }))
    }
  }, [selectedCategory, getBusinessServiceData, findBusinessServiceId])
  const handleCategoryChange = (value: string) => {
    const correspondingBusinessService = getBusinessServiceData?.data?.find(
      (service: any) => service.business_category._id === value
    )

    setSelectedCategory(value)
    setSelectedServices([])

    setFormData((prev) => ({
      ...prev,
      category: value,
      services: [],
      business_service: correspondingBusinessService?._id || '',
    }))
  }
  const handleServiceChange = (values: string[]) => {
    setSelectedServices(values)
    setFormData((prevData) => ({ ...prevData, services: values }))
  }

  const handleRadioChange = (e: any, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    try {
      console.log(formData.number_of_guests)
      console.log(typeof formData.number_of_guests)
      const bookingData = {
        ...formData,
        price: Number(price),
        additional_services: formData.additional_services || '',
        number_of_guests: formData.number_of_guests,
      }
      const response = await customCreateBooking(bookingData).unwrap()
      toast.success(response.message || 'Custom booking created successfully!')
      onClose()
      resetForm()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create custom booking')
    }
  }

  const resetForm = () => {
    setFormData({
      user: '',
      event_name: '',
      phoneNumber: '',
      location: '',
      date: '',
      time: '',
      number_of_guests: '',
      duration: '',
      additional_services: '',
      business_service: businessData?._id || '',
      category: businessData?.business_category?._id || '',
      services: [],
      is_paid: false,
    })
    setSelectedServices([])
    setPrice('')
    setStep(1)
  }

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        return !!formData.user
      case 2:
        return !!(
          formData.event_name &&
          formData.phoneNumber &&
          formData.location
        )
      case 3:
        return !!formData.number_of_guests
      case 4:
        return !!formData.duration
      case 5:
        return !!(formData.date && formData.time)
      case 6:
        return !!formData.additional_services
      case 7:
        return formData.services.length > 0 && !!price
      default:
        return false
    }
  }

  return (
    <>
      {step === 1 && (
        <div>
          <div>
            <label className="block text-sm font-medium">User ID:</label>
            <Input
              name="user"
              value={userId || formData.user}
              onChange={handleChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Enter User ID"
              required
              disabled={userId ? true : false}
            />
          </div>
          <div className="mt-6 flex justify-between">
            <Button onClick={onClose} className="w-1/3 h-[42px] bg-gray-200">
              Cancel
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

      {step === 2 && (
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
            <label className="block text-sm font-medium">Event Location:</label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Event Location"
              required
            />
          </div>
          <div className="mt-6 flex justify-between">
            <Button onClick={handlePrev} className="w-1/3 h-[42px] bg-gray-200">
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
            <Button onClick={handlePrev} className="w-1/3 h-[42px] bg-gray-200">
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
            <label className="block text-sm font-medium">Event Duration:</label>
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
            <Button onClick={handlePrev} className="w-1/3 h-[42px] bg-gray-200">
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
            <label className="block text-sm font-medium">Event Date:</label>
            <DatePicker
              onChange={handleDateChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Select Date"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Serving Time:</label>
            <TimePicker
              format="h:mm A"
              onChange={handleTimeChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Select Time"
              required
            />
          </div>
          <div className="mt-6 flex justify-between">
            <Button onClick={handlePrev} className="w-1/3 h-[42px] bg-gray-200">
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
            <Button onClick={handlePrev} className="w-1/3 h-[42px] bg-gray-200">
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
              Select Category:
            </label>
            <Select
              style={{ width: '100%' }}
              placeholder="Select category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="mt-1"
            >
              {businessCategories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>

          {selectedCategory && (
            <div className="mt-4">
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
                disabled={!selectedCategory}
              >
                {filteredServices.map((service) => (
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
          )}

          {/* <div className="mt-4">
            <label className="block text-sm font-medium">
              Selected Business Service ID:
            </label>
            <Input
              value={businessServiceId}
              className="mt-1 h-[42px] block w-full"
              disabled
            />
          </div> */}

          <div className="mt-4">
            <label className="block text-sm font-medium">Price:</label>
            <Input
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 h-[42px] block w-full"
              placeholder="Enter price"
              type="number"
              required
            />
          </div>

          <div className="mt-6 flex justify-between">
            <Button onClick={handlePrev} className="w-1/3 h-[42px] bg-gray-200">
              Previous
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={isCustomLoading}
              className="w-1/3 h-[42px] bg-blue-800"
            >
              Create Custom Booking
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default BookingRequestVendor
