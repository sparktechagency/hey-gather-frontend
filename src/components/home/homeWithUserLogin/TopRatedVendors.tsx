'use client'
import Card from '@/components/card/Card'
import Loader from '@/components/loading/ReactLoader'
import { useGetBusinessDataQuery } from '@/redux/businessApis'

const TopRatedVendors = () => {
  const { data: businessData, isLoading } = useGetBusinessDataQuery(undefined)

  const transformBusinessData = () => {
    if (!businessData?.data || !Array.isArray(businessData.data)) return []

    return businessData.data
      .filter((item: any) => item.vendor_type === 'PREMIUM')
      .map((item: any) => ({
        id: item._id,
        logo: item.img,
        name: item.business_category.name,
        rating: item.rating,
        reviews: item.total_rated,
        status: 'Available',
        categories: item.business_services.map((service: any) => service.name),
        bookings: item.total_booking,
        price: item.price,
        vendorName: item.user_details.name,
        address: item.address,
        businessName: item.businesses?.name,
      }))
  }

  const vendors = transformBusinessData()

  if (isLoading) return <Loader />

  return (
    <div className="mt-50 responsive-width">
      <p className="font-bold text-3xl mb-10 text-center">
        {/* This Week&apos;s Top-Rated Vendors */}
        {/* Top-Rated Vendors */}
        Popular Vendor category
      </p>
      <div className="responsive-width flex items-center justify-start flex-wrap gap-5">
        {vendors.length > 0 ? (
          vendors.map((vendor: any) => <Card key={vendor.id} {...vendor} />)
        ) : (
          <p className="text-gray-500">No premium vendors available.</p>
        )}
      </div>
    </div>
  )
}

export default TopRatedVendors
