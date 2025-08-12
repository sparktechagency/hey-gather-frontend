'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/card/Card'
import BookingForm from '@/components/bookingForm/BookingForm'
import VendorTabs from '@/components/vendorTabs/VendorTabs'
import { useGetBusinessDataQuery } from '@/redux/businessApis'
import { use } from 'react'
import { url } from '@/redux/main/server'
import Loader from '@/components/loading/ReactLoader'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface Category {
  name: string
  id: string
}

interface Vendor {
  id: string
  _id: string
  name: string
  img: string
  rating: number
  reviews: number
  status: string
  categories: string[]
  bookings: number
  price: number
  description?: string
  images?: string[]
  businesses?: {
    _id: string
    name: string
    user: string
  }
  total_rated?: number
  total_booking?: number
  vendor_type?: string
  user_details?: {
    _id: string
    name: string
  }
  business_services?: {
    _id: string
    name: string
  }[]
  business_category?: {
    _id: string
    name: string
  }
  services?: {
    name: string
    image: string
  }[]
  reviews_comment?: {
    _id: string
    user: string
    description: string
    rating: number
    createdAt: string
  }[]
}

interface PageParams {
  id: string
}

interface VendorDetailsPageProps {
  params: PageParams
}

const VendorDetailsPage = () => {
  const router = useRouter()
  // const vendorId = params.id
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const vendorId = Cookies.get('vendor-Id')

  const { data: vendorData, isLoading } = useGetBusinessDataQuery({
    _id: vendorId,
  })

  useEffect(() => {
    if (vendorData) {
      setVendor(vendorData?.data[0] as Vendor)
      setLoading(false)
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [vendorData, isLoading])

  const handleBack = (): void => {
    router.back()
  }

  if (loading || isLoading) {
    return <Loader />
  }

  if (!vendor) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-lg text-gray-600">Vendor not found</p>
          <button
            onClick={() => router.push('/vendors')}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Browse Vendors
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 010 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Vendors
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-full md:w-1/3">
                <Image
                  src={`${url}/${vendor?.img}`}
                  alt={vendor.name}
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                  width={300}
                  height={300}
                />
              </div>
              <div className="w-full md:w-2/3">
                <h1 className="text-2xl font-bold mb-2">
                  {vendor?.businesses?.name}
                </h1>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="mr-1">{vendor?.rating.toFixed(1)}</span>
                  <span className="text-gray-500">({vendor?.total_rated})</span>
                </div>
                <div className="mb-2">
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2">
                    Available
                  </span>
                  {vendor?.categories?.map((category, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm mr-2"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">{vendor.total_booking}</span>{' '}
                  bookings on this vendor
                </p>
                <p className="text-lg font-bold">
                  Starting from ${vendor?.price}
                </p>
                <Link
                  href={`/chat?id=${vendor?.businesses?.user}`}
                  className="inline-block px-6 py-3 !mt-3 text-white font-semibold  bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 cursor-pointer"
                >
                  Send Message
                </Link>
              </div>
            </div>
            <VendorTabs vendor={vendor} />
          </div>
        </div>

        <div>
          <section>
            <BookingForm vendor={vendor} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default VendorDetailsPage
