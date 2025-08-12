'use client'

import { useGetProfileDataQuery } from '@/redux/profileApis'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaMoneyBillWave, FaCreditCard, FaHistory } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'

const Earnings = () => {
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

      <div className="max-w-[800px] mt-20 mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-blue-500 rounded-lg mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
            <FaMoneyBillWave className="text-blue-600 text-5xl" />
          </div>
          <div className="ml-4">
            <p className="text-gray-800 text-sm">Total Earnings</p>
            <p className="text-2xl font-semibold text-blue-700 ">
              ${getProfileData?.data?.earnings}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Earnings
