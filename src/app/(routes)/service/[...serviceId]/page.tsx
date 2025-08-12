'use client'
import Loader from '@/components/loading/ReactLoader'
import { useGetBusinessDataQuery } from '@/redux/businessApis'
import { url } from '@/redux/main/server'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'

const EachService = () => {
  const navigate = useRouter()
  const pathName = usePathname()
  const serviceId = pathName.split('/')[2]

  const { data: businessData, isLoading: isBusinessLoading } =
    useGetBusinessDataQuery({ _id: serviceId })

  if (isBusinessLoading)
    return (
      <div>
        <Loader />
      </div>
    )

  if (
    !businessData ||
    !businessData.success ||
    !businessData.data ||
    businessData.data.length === 0
  ) {
    return <div>No service data found</div>
  }

  const service = businessData.data[0]

  return (
    <div className="responsive-width !mb-20">
      <div
        className="mt-10 mb-5 flex gap-2 items-center cursor-pointer hover:text-blue-500 transition-all"
        onClick={() => navigate.back()}
      >
        <IoMdArrowRoundBack />
        Back
      </div>
      <div className="max-w-2xl max-sm:flex-col bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-gray-300">
        <div className="flex-shrink-0">
          <Image
            src={`${url}/${service.img}`}
            alt={service.business_category?.name || 'Service'}
            width={280}
            height={180}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            {service.business_category?.name || 'Service'}
          </h2>
          <p className="text-gray-600 text-sm mt-1">Overview</p>
          <p className="text-gray-800 flex items-center gap-2 mt-2 text-sm">
            📅 {service.total_booking} Booking
            {service.total_booking !== 1 ? 's' : ''} on this vendor
          </p>
          <p className="text-gray-800 font-medium text-sm mt-2">
            Vendor service category:
          </p>
          <div className="flex gap-2 mt-1 flex-wrap">
            {service.business_services.map((category: any) => (
              <span
                key={category._id}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs"
              >
                {category.name}
              </span>
            ))}
          </div>
          <p className="text-gray-800 flex items-center gap-2 mt-2 text-sm">
            💲 Price: $${service.price}
          </p>
          <p className="text-gray-800 flex items-center gap-2 mt-2 text-sm">
            👤 Vendor: {service.user_details.name}
          </p>
          <p className="text-gray-800 flex items-center gap-2 mt-2 text-sm">
            ⭐ Rating: {service.rating}/5 ({service.total_rated} reviews)
          </p>
        </div>
      </div>
      <div>
        <div className="font-bold text-2xl mt-5">Images</div>

        <div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {service.photos &&
              service.photos.map((photo: any, index: number) => (
                <Image
                  key={index}
                  src={`${url}/${photo}`}
                  alt={`Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-md"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EachService
