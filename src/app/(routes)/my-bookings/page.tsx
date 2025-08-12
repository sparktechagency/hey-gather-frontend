'use client'

import Loader from '@/components/loading/ReactLoader'
import MyBookingsCard from '@/components/myBookings/MyBookingsCard'
import { useGetBookingsQuery } from '@/redux/bookingsApis'
import { Tabs } from 'antd'
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

const MyBookings = () => {
  const [click, setClicked] = useState('USER')

  const { data: getAllBookings, isLoading, refetch } = useGetBookingsQuery()

  // const {
  //   data: getAllBookings,
  //   isLoading,
  //   refetch,
  // } = useGetBookingsQuery({
  //   requested_by: click,
  // })

  const [activeTab, setActiveTab] = useState('1')
  useEffect(() => {
    if (activeTab === '2') {
      setClicked('USER')
    } else if (activeTab === '3') {
      setClicked('VENDOR')
    }
  }, [activeTab, getAllBookings])
  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  if (isLoading) {
    return <Loader />
  }

  const getBookingsByStatus = (status: string) => {
    if (!getAllBookings?.data) return []

    return getAllBookings?.data?.filter((booking: BookingData) => {
      switch (status) {
        case 'ongoing':
          return booking.status === 'accepted'
        case 'requested':
          return booking.status === 'pending'
        case 'paymentRequest':
          return booking.status === 'pending'
        case 'completed':
          return booking.status === 'completed'
        case 'canceled':
          return booking.status === 'canceled'
        default:
          return false
      }
    })
  }

  const tabItems = [
    {
      key: '1',
      label: ' My Inquiries',
      children: (
        <div>
          <div className="text-lg font-semibold">
            Vendors you reached out to.
          </div>
          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('requested')?.length > 0 ? (
              getBookingsByStatus('requested')?.map((booking: BookingData) => (
                <div key={booking._id}>
                  <MyBookingsCard booking={booking} />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No booking requests found
              </div>
            )}
          </div>
        </div>
      ),
    },

    {
      key: '2',
      label: <div>Vendor Offers</div>,
      children: (
        <div>
          <div className="text-lg font-semibold">
            Vendor has responded; you can accept their offer.
          </div>

          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('paymentRequest').length > 0 ? (
              getBookingsByStatus('paymentRequest').map(
                (booking: BookingData) => (
                  <div key={booking._id}>
                    <MyBookingsCard booking={booking} />
                  </div>
                )
              )
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No payment pending bookings found
              </div>
            )}
          </div>
        </div>
      ),
    },

    {
      key: '3',
      label: 'Upcoming Events',
      children: (
        <div>
          <div className="text-lg font-semibold">
            Vendors you’ve booked, event pending.
          </div>

          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('ongoing')?.length > 0 ? (
              getBookingsByStatus('ongoing')?.map((booking: BookingData) => (
                <div key={booking._id} className="flex ">
                  <MyBookingsCard booking={booking} />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No ongoing bookings found
              </div>
            )}
          </div>
        </div>
      ),
    },


    {
      key: '4',
      label: ' Past Events',
      children: (
        <div>
          <div className="text-lg font-semibold">
            Vendors you’ve used and can review
          </div>
          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('completed').length > 0 ? (
              getBookingsByStatus('completed').map((booking: BookingData) => (
                <div key={booking._id}>
                  <MyBookingsCard booking={booking} />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No completed bookings found
              </div>
            )}
            <div />
          </div>
          <div />
        </div>
      ),
    },

    {
      key: '5',
      label: 'Canceled Events',
      children: (
        <div>
          <div className="text-lg font-semibold">
            Events or vendors you canceled.
          </div>

          <div className="flex gap-5 flex-wrap">
            {getBookingsByStatus('canceled').length > 0 ? (
              getBookingsByStatus('canceled').map((booking: BookingData) => (
                <div key={booking._id}>
                  <MyBookingsCard booking={booking} />
                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500">
                No canceled bookings found
              </div>
            )}
          </div>
        </div>
      ),
    },

    // {
    //   key: '2',
    //   label: ' My Inquiries',
    //   children: (
    //     <div>
    //       <div className="text-lg font-semibold">
    //         Vendors you reached out to.
    //       </div>
    //       <div className="flex gap-5 flex-wrap">
    //         {getBookingsByStatus('requested')?.length > 0 ? (
    //           getBookingsByStatus('requested')?.map((booking: BookingData) => (
    //             <div key={booking._id}>
    //               <MyBookingsCard booking={booking} />
    //             </div>
    //           ))
    //         ) : (
    //           <div className="mt-4 text-center text-gray-500">
    //             No booking requests found
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   ),
    // },
   
   
    
  ]

  return (
    <div className="responsive-width px-2 pt-5 bg-white rounded-lg space-y-6 poppins mb-20">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        className="!border-b-0 poppins"
        items={tabItems}
      />
    </div>
  )
}

export default MyBookings
