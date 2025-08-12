'use client'
import { useGetProfileDataQuery } from '@/redux/profileApis'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

const MySubscription = () => {
  const { data: getProfileData } = useGetProfileDataQuery()

  const navigate = useRouter()

  return (
    <div className="responsive-width">
      <p
        className="!pl-5 mt-5 text-gray-800 flex items-center gap-1 hover:text-blue-500 cursor-pointer"
        onClick={() => navigate.back()}
      >
        <IoMdArrowRoundBack />
        Back
      </p>
      <div className=" max-w-[900px] mt-20 mx-auto py-7 px-6 bg-white rounded-lg shadow-2xl">
        <div className="flex max-sm:flex-col items-center py-8 px-6 bg-gradient-to-r from-blue-100 to-blue-500 rounded-lg mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
            <span className="text-blue-600 text-2xl">👑</span>
          </div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">
              Your subscription is active until:
            </p>
            <p className="text-lg font-semibold text-gray-900 max-sm:text-center">
              {getProfileData?.data?.use_type === 'BASIC'
                ? new Date(
                    Date.parse(getProfileData?.data?.createdAt) +
                      30 * 24 * 60 * 60 * 1000
                  ).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : getProfileData?.data?.use_type === 'PREMIUM' &&
                  new Date(
                    Date.parse(getProfileData?.data?.createdAt) +
                      365 * 24 * 60 * 60 * 1000
                  ).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Last Purchase Date
          </label>
          <input
            type="text"
            value={new Date(
              Date.parse(getProfileData?.data?.createdAt)
            ).toLocaleString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600  outline-none cursor-not-allowed"
          />
        </div>

        {/* <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Subscription Expiry Date
          </label>
          <input
            type="text"
            value={subscriptionExpiry}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 outline-none cursor-not-allowed"
          />
        </div> */}

        {/* <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mb-2 hover:bg-blue-700 transition">
          Change Subscription
        </button>
        <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition">
          Cancel Subscription
        </button> */}
      </div>
    </div>
  )
}

export default MySubscription
