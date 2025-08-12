'use client'
import Loader from '@/components/loading/ReactLoader'
import EarningStatics from '@/components/vendorBusinessProfile/EarningStatics'
import ProVendorPlan from '@/components/vendorBusinessProfile/ProVendorPlan'
import VendorBusinessCard from '@/components/vendorBusinessProfile/VendorBusinessCard'
import VendorBusinessInformation from '@/components/vendorBusinessProfile/VendorBusinessInformation'
import { useGetProfileDataQuery } from '@/redux/profileApis'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const { data: businessResponse, isLoading } = useGetProfileDataQuery()

  const [pending, setPending] = useState(null)
  const [completed, setCompleted] = useState(null)

  useEffect(() => {
    setPending(businessResponse?.data?.bookings?.[0]?.pending)
    setCompleted(businessResponse?.data?.bookings?.[0]?.completed)
  }, [businessResponse])

  if (isLoading) return <Loader />

  if (!businessResponse?.data) {
    return (
      <p className="text-center text-2xl mt-2">No business data available</p>
    )
  }

  const vendorBusinessInfo = {
    stats: [
      {
        id: 1,
        label: 'New Booking Requests',
        value: pending,
        icon: '/new-booking.svg',
      },
      {
        id: 2,
        label: 'Total Business Services',
        value: businessResponse?.data?.total_service ?? 0,
        icon: '/total-service.svg',
      },
      {
        id: 3,
        label: 'Total Completed Bookings',
        value: completed,
        icon: '/total-booking.svg',
      },
      {
        id: 5,
        label: 'Total Earnings',
        value: businessResponse?.data?.earnings ?? 0,
        icon: '/total-earning.svg',
      },
    ],
  }

  const vendorBusinessData = {
    id: businessResponse?.data?.business_profile?.[0]?._id,
    logo: businessResponse?.data?.business_profile?.[0]?.banner,
    businessName: businessResponse?.data?.business_profile?.[0]?.name,
    about: businessResponse?.data?.business_profile?.[0]?.desc,
    vendorType: businessResponse?.data?.use_type,
  }

  return (
    <div className="responsive-width">
      <VendorBusinessCard {...vendorBusinessData} />
      <VendorBusinessInformation stats={vendorBusinessInfo.stats} />
      <EarningStatics />
      <ProVendorPlan />
    </div>
  )
}

export default Dashboard
