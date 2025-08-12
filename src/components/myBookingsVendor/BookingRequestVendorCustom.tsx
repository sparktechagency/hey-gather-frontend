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
  useManualBookingsMutation,
} from '@/redux/bookingsApis'
import { useGetBusinessDataQuery } from '@/redux/businessApis'
import { useGetProfileDataQuery } from '@/redux/profileApis'

const { Option } = Select

interface BookingRequestProps {
  isVisible: boolean
  onClose: () => void
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
  booking_for: 'OTHERS'
  otherDetails: {
    name: string
    email: string
    phone: string
  }
}

const BookingRequestVendorCustom: React.FC<BookingRequestProps> = ({
  isVisible,
  onClose,
}) => {
  const [createBooking, { isLoading }] = useCreateBookingsMutation()
  const [customCreateBooking, { isLoading: isCustomLoading }] =
    useManualBookingsMutation()

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

  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [price, setPrice] = useState<string>('')

  const [formData, setFormData] = useState<BookingFormData>({
    event_name: '',
    phoneNumber: '',
    location: '',
    date: '',
    time: '',
    number_of_guests: '',
    duration: '',
    additional_services: '',
    business_service: '',
    category: '',
    services: [],
    is_paid: false,
    booking_for: 'OTHERS',
    otherDetails: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const filteredServices = allBusinessServices.filter(
    (service) => service.category === selectedCategory
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name.startsWith('otherDetails.')) {
      const fieldName = name.split('.')[1]
      setFormData((prevData) => ({
        ...prevData,
        otherDetails: {
          ...prevData.otherDetails,
          [fieldName]: value,
        },
      }))
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleDateChange = (date: any, dateString: string | string[]) => {
    const dateValue = Array.isArray(dateString) ? dateString[0] : dateString
    setFormData((prevData) => ({ ...prevData, date: dateValue || '' }))
  }

  const handleTimeChange = (time: any, timeString: string | string[]) => {
    const timeValue = Array.isArray(timeString) ? timeString[0] : timeString
    setFormData((prevData) => ({ ...prevData, time: timeValue || '' }))
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
      business_service: '',
      category: '',
      services: [],
      is_paid: false,
      booking_for: 'OTHERS',
      otherDetails: {
        name: '',
        email: '',
        phone: '',
      },
    })
    setSelectedServices([])
    setSelectedCategory('')
    setPrice('')
    setStep(1)
  }

  const handleSubmit = async () => {
    if (!validateStep()) {
      toast.error('Please fill all required fields.')
      return
    }

    try {
      const bookingData = {
        ...formData,
        price: Number(price),
        additional_services: formData.additional_services || '',
        number_of_guests: formData.number_of_guests,
      }
      const response = await customCreateBooking(bookingData).unwrap()
      toast.success(response.message || 'Custom booking created successfully!')

      // Reset form and close modal
      resetForm()
      onClose()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create custom booking')
    }
  }

  const handleModalClose = () => {
    resetForm()
    onClose()
  }

  const validateStep = (): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.otherDetails.name &&
          formData.otherDetails.email &&
          formData.otherDetails.phone
        )
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
        return formData.services.length > 0 && !!price && parseFloat(price) > 0
      default:
        return false
    }
  }

  const getStepTitle = (step: number): string => {
    const titles = {
      1: 'Customer Details',
      2: 'Event Information',
      3: 'Number of Guests',
      4: 'Event Duration',
      5: 'Date & Time',
      6: 'Additional Services',
      7: 'Services & Pricing',
    }
    return titles[step as keyof typeof titles] || 'Booking Details'
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!isVisible) {
      resetForm()
    }
  }, [isVisible])

  return (
    <Modal
      title={`Create Custom Booking - ${getStepTitle(step)} (${step}/7)`}
      open={isVisible}
      onCancel={handleModalClose}
      footer={null}
      width={600}
      destroyOnClose={true}
      centered
      maskClosable={false}
    >
      {step === 1 && (
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-4">
              Please provide customer details for this booking:
            </p>
            <div>
              <label className="block text-sm font-medium mb-1">Name:</label>
              <Input
                name="otherDetails.name"
                value={formData.otherDetails.name}
                onChange={handleChange}
                className="mt-1 h-[42px] block w-full"
                placeholder="Enter Customer Name"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Email:</label>
              <Input
                name="otherDetails.email"
                value={formData.otherDetails.email}
                onChange={handleChange}
                className="mt-1 h-[42px] block w-full"
                placeholder="Enter Customer Email"
                type="email"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Phone Number:
              </label>
              <Input
                name="otherDetails.phone"
                value={formData.otherDetails.phone}
                onChange={handleChange}
                className="mt-1 h-[42px] block w-full"
                placeholder="Enter Customer Phone Number"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button
              onClick={handleModalClose}
              className="w-1/3 h-[42px] bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleNext}
              className="w-1/3 h-[42px] bg-blue-800"
              disabled={!validateStep()}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Name:
            </label>
            <Input
              name="event_name"
              value={formData.event_name}
              onChange={handleChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Enter Event Name"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Phone Number:
            </label>
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Enter Phone Number"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Event Location:
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Enter Event Location"
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
              disabled={!validateStep()}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div>
            <label className="block text-sm font-medium mb-2">
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
              disabled={!validateStep()}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div>
            <label className="block text-sm font-medium mb-2">
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
            <Button onClick={handlePrev} className="w-1/3 h-[42px] bg-gray-200">
              Previous
            </Button>
            <Button
              type="primary"
              onClick={handleNext}
              className="w-1/3 h-[42px] bg-blue-800"
              disabled={!validateStep()}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Date:
            </label>
            <DatePicker
              onChange={handleDateChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Select Date"
              format="YYYY-MM-DD"
              disabledDate={(current) =>
                current && current.isBefore(new Date(), 'day')
              }
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">
              Serving Time:
            </label>
            <TimePicker
              format="h:mm A"
              onChange={handleTimeChange}
              className="mt-1 h-[42px] block w-full"
              placeholder="Select Time"
              use12Hours
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
              disabled={!validateStep()}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Additional services needed:
            </label>
            <Input.TextArea
              name="additional_services"
              value={formData.additional_services || ''}
              onChange={handleChange}
              className="mt-1 block w-full"
              placeholder="E.g., Champagne, VIP Seating, Special decorations"
              rows={4}
              maxLength={500}
              showCount
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
              disabled={!validateStep()}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 7 && (
        <div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Category:
            </label>
            <Select
              style={{ width: '100%' }}
              placeholder="Select category"
              value={selectedCategory || undefined}
              onChange={handleCategoryChange}
              className="mt-1"
              showSearch
              filterOption={(input, option) =>
                option?.children
                  ?.toString()
                  .toLowerCase()
                  .includes(input.toLowerCase()) || false
              }
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
              <label className="block text-sm font-medium mb-1">
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
                showSearch
                filterOption={(input, option) =>
                  option?.label
                    ?.toString()
                    .toLowerCase()
                    .includes(input.toLowerCase()) || false
                }
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

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Price:</label>
            <Input
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 h-[42px] block w-full"
              placeholder="Enter price"
              type="number"
              min="0"
              step="0.01"
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
              disabled={!validateStep()}
            >
              Create Custom Booking
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default BookingRequestVendorCustom
