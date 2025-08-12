import Image from 'next/image'
import Link from 'next/link'
import { RiMessage2Fill } from 'react-icons/ri'
import MyBookingsModel from './MyBookingsModel'
import { url } from '@/redux/main/server'
import { useEffect, useState } from 'react'

interface User {
  name: string
  email: string
  phone: string
  img: string
  _id: string
}
interface Vendor {
  name: string
  email: string
  phone: string
  img: string
  _id: string
}

interface Category {
  name: string
  img: string
  _id: string
}

interface Service {
  _id: string
  name: string
}

interface BookingData {
  _id: string
  user: User[]
  vendor: Vendor[]
  category: Category[]
  date: string
  time: string
  number_of_guests: string
  duration: string
  additional_services?: string
  additional_note?: string
  event_name: string
  status: string
  paid_to_vendor: boolean
  price: number
  location: string
  services: Service[]
  is_paid: boolean
  requested_by: string
  business_service: string
}

interface CardProps {
  booking: BookingData
}

const mapStatusToBookingType = (status: string): string => {
  switch (status) {
    case 'accepted':
      return 'ongoing'
    case 'completed':
      return 'completed'
    case 'canceled':
      return 'canceled'
    case 'pending':
      return 'requested'
    default:
      return 'requested'
  }
}

const formatDateTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const MyBookingsCard: React.FC<CardProps> = ({ booking }) => {
  const {
    _id,
    user,
    category,
    vendor,
    date,
    time,
    number_of_guests,
    duration,
    additional_services,
    additional_note,
    event_name,
    status,
    price,
    location,
    services,
    is_paid,
    requested_by,
    business_service,
  } = booking

  const userData = vendor[0] || {
    name: 'Unknown',
    email: 'Unknown',
    phone: 'Unknown',
    img: '/placeholder.png',
  }

  const categoryData = category[0] || { name: 'Unknown' }

  const serviceNames = services.map((service) => service.name)

  const bookingType = mapStatusToBookingType(status)
  const [timeLeft, setTimeLeft] = useState('')
  const getTargetDateTime = (dateString: string, timeString: string) => {
    if (!dateString || !timeString) return new Date('Invalid')

    const dateObj = new Date(dateString)
    const timeObj = new Date(timeString)

    const year = dateObj.getUTCFullYear()
    const month = dateObj.getUTCMonth()
    const day = dateObj.getUTCDate()

    const hours = timeObj.getUTCHours()
    const minutes = timeObj.getUTCMinutes()
    const seconds = timeObj.getUTCSeconds()

    const combinedDate = new Date(year, month, day, hours, minutes, seconds)

    return combinedDate
  }

  useEffect(() => {
    if (status !== 'accepted' || !date || !time) {
      setTimeLeft('')
      return
    }

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const targetDateTime = getTargetDateTime(date, time).getTime()
      const difference = targetDateTime - now

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft('Event Started')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      const timeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`

      setTimeLeft(timeString)
    }, 1000)

    return () => clearInterval(interval)
  }, [status, date, time])

  const modelProps = {
    id: _id,
    bookingType,
    image:
      userData?.img || 'https://dummyimage.com/600x400/a8a8a8/fff&text=img',
    name: userData.name,
    vendorId: userData._id,
    email: userData.email,
    phone: userData.phone,
    bookingFor: categoryData.name,
    selectServices: serviceNames,
    eventName: event_name,
    eventLocation: location,
    eventTime: formatDateTime(time),
    numberOfGuests: number_of_guests,
    eventDuration: duration,
    additionalRequirements: additional_services || '',
    additionalNote: additional_note || '',
    amountPaid: is_paid ? `$${price}` : '',
    requested_by,
    timeLeft: status === 'accepted' ? `Time left : ${timeLeft}` : '',
    price,
    is_paid,
    business_service,
  }

  return (
    <div className="bg-white grid mb-5  mt-5 flex-col shadow-md rounded-lg px-6 py-5 sm:flex-row gap-4 sm:max-w-[600px] max-w-[430px] w-full border border-gray-200">
      <div>
        <Image
          src={`${url}/${userData.img}`}
          alt="Vendor Logo"
          width={5000}
          height={500}
          className="rounded-full flex items-center justify-center mx-auto mb-1 object-cover object-center w-[100px] h-[100px]"
        />
        <h3 className="text-lg font-semibold bg-gray-300 px-2 pt-2">
          {userData.name}
        </h3>
        <div className="bg-gray-300text-sm p-2 bg-gray-300">
          <div className=" text-xs">{userData.email}</div>
          <div className=" text-xs">
            <strong>Phone :</strong> {userData.phone}
          </div>
          <Link
            href={`chat?id=${userData._id}&name=${userData.name}`}
            className="flex bg-gray-300 justify-center items-center gap-1 mt-2"
          >
            <RiMessage2Fill className="text-2xl text-blue-800 text-center cursor-pointer transition duration-300 ease-in-out hover:text-blue-700 animate-pulse" />
          </Link>
        </div>
      </div>

      <div className="flex-1 ">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div>
              <p className="text-md font-bold mb-3">Booking For</p>
              <span className="bg-blue-100 p-2 rounded-lg mt-1 font-semibold text-red-600">
                {categoryData.name}
              </span>
            </div>
            <p className="text-md font-bold mt-4 mb-1">Select Services</p>
            <div className="flex gap-3 flex-wrap w-[205px]">
              {serviceNames.map((service, index) => (
                <div key={index} className="bg-blue-100 rounded-lg p-2">
                  {service}
                </div>
              ))}
            </div>
          </div>

          <MyBookingsModel {...modelProps} />
        </div>
      </div>
    </div>
  )
}

export default MyBookingsCard
