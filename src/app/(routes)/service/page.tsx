'use client'
import { useState, useEffect } from 'react'
import ServiceCard from '@/components/businessService/ServiceCard'
import { useGetProfileDataQuery } from '@/redux/profileApis'
import Loader from '@/components/loading/ReactLoader'

const Service = () => {
  const { data: profileData, isLoading, error } = useGetProfileDataQuery()
  const [businessId, setBusinessId] = useState<string | null>(null)

  useEffect(() => {
    if (profileData?.data?.business_profile) {
      setBusinessId(profileData?.data?.business_profile[0]?._id)
    }
  }, [profileData])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-700">
            Unable to load your profile data. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  if (!businessId) {
    return (
      <div className="flex justify-center items-center h-[80vh] p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center max-w-md">
          <h2 className="text-xl font-semibold text-yellow-600 mb-2">
            Business Profile Not Found
          </h2>
          <p className="text-gray-700 mb-4">
            You need to create a business profile before adding services.
          </p>
          <a
            href="/business/create"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Create Business Profile
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
        <p className="text-gray-600 mt-2">
          Create and manage the services you offer to your customers
        </p>
      </div>

      <div className="bg-white overflow-hidden">
        <ServiceCard businessId={businessId} />
      </div>
    </div>
  )
}

export default Service
