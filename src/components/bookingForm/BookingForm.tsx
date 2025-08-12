// 'use client'

// import Link from 'next/link'
// import { useState } from 'react'
// import BookingRequest from '../bookingRequest/BookingRequest'
// import { useCreateBookingsMutation } from '@/redux/bookingsApis'

// interface Vendor {
//   id: string
//   _id: string
//   name: string
//   img: string
//   rating: number
//   reviews: number
//   status: string
//   categories: string[]
//   bookings: number
//   price: number
//   description?: string
//   images?: string[]
//   services?: {
//     name: string
//   }[]
// }

// interface VendorTabsProps {
//   vendor: Vendor
// }
// const BookingForm: React.FC<VendorTabsProps> = ({ vendor }) => {
//   const [createBooking] = useCreateBookingsMutation()

//   console.log(vendor)

//   const [bookingFor, setBookingFor] = useState('')
//   const [service, setService] = useState('')

//   const handleBookingForChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setBookingFor(e.target.value)
//   }

//   const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setService(e.target.value)
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log(`Booking for: ${bookingFor}, Service: ${service}`)
//   }

//   return (
//     <div className=" bg-white p-6 mb-10 rounded-lg shadow-md ">
//       <h2 className="text-xl font-bold mb-4 text-center">Check availability</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Select Service */}
//         <div className="flex flex-col">
//           <label htmlFor="service" className="font-semibold">
//             Select Service:
//           </label>
//           <select
//             id="service"
//             value={service}
//             onChange={handleServiceChange}
//             className="border border-gray-300 p-2 rounded-md outline-none"
//           >
//             <option value="">Select Multiple</option>

//             {vendor?.business_services?.map((service) => (
//               <option key={service._id} value={service._id}>
//                 {service.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
//           <BookingRequest />
//           <Link
//             href={'/chat'}
//             type="button"
//             className="bg-transparent border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-md text-sm font-semibold w-full sm:w-auto hover:bg-blue-600 hover:text-white"
//           >
//             Send message
//           </Link>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default BookingForm

'use client'

import Link from 'next/link'
import { useState } from 'react'
import BookingRequest from '../bookingRequest/BookingRequest'
import { useCreateBookingsMutation } from '@/redux/bookingsApis'

interface Service {
  _id: string
  name: string
}

interface BusinessService {
  _id: string
  name: string
}

interface Vendor {
  id?: string
  _id: string
  name: string
  img?: string
  rating?: number
  reviews?: number
  status?: string
  categories?: string[]
  bookings?: number
  price?: number
  description?: string
  images?: string[]
  business_services?: BusinessService[]
  services?: {
    name: string
    image: string
  }[]
  category_id?: string
  business_category?: {
    _id: string
    name: string
  }
}

interface BookingFormProps {
  vendor: Vendor
}

const BookingForm: React.FC<BookingFormProps> = ({ vendor }) => {
  return (
    <div className="bg-white ">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <BookingRequest
            vendorId={vendor?._id}
            services={vendor?.business_services || []}
            categoryId={vendor?.business_category?._id}
          />
        </div>
      </div>
    </div>
  )
}

export default BookingForm
