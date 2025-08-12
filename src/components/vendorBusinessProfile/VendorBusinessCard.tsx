import { useGetBusinessDataQuery } from '@/redux/businessApis'
import { url } from '@/redux/main/server'
import { Image } from 'antd'
import Link from 'next/link'

interface CardProps {
  id?: string
  logo?: string
  rating?: number
  businessName?: string
  about?: string
  startPrice?: number
  reviews?: number
  vendorType?: string
  services?: { name: string }[]
}

const VendorBusinessCard: React.FC<CardProps> = ({
  id,
  logo,
  businessName,
  rating,
  services,
  startPrice,
  about,
  reviews,
  vendorType,
}) => {
  const { data: categoryData } = useGetBusinessDataQuery({
    business: id,
  })

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row gap-4 w-full border border-gray-200">
      <div className="flex-1">
        <div className="flex gap-5">
          <div className="flex-shrink-0 w-[100px] sm:w-[140px] flex justify-center items-center">
            {logo && (
              <Image
                src={`${url}/${logo}`}
                alt="Vendor Logo"
                width={200}
                height={150}
                className="rounded-md object-cover object-center h-[150px]"
              />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{businessName}</h3>
            {rating !== undefined && reviews !== undefined && (
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                {'\u2B50'.repeat(Math.floor(rating || 0))}
                <span className="text-gray-600 ml-1">
                  {rating} ({reviews})
                </span>
              </div>
            )}
            <p className="text-blue-600 text-sm font-medium">{vendorType}</p>
            {startPrice !== undefined && (
              <p className="mt-1 font-semibold">
                Get started for as low as{' '}
                <span className="text-black">${startPrice}</span>
              </p>
            )}

            <div className="mt-3 font-bold mb-2">My Services Category:</div>
            <div className="flex flex-wrap gap-2 ">
              {categoryData?.data?.flatMap((category: any) =>
                category?.business_services?.map((service: any) => (
                  <div
                    key={service._id}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs"
                  >
                    {service.name}
                  </div>
                ))
              )}
            </div>
            {services && services.length > 0 && (
              <>
                <p className="text-gray-800 font-medium text-sm mt-2">
                  My service categories:
                </p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-xs"
                    >
                      {service.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {about && (
          <p className="text-sm text-gray-600 mt-2 max-w-[700px] text-justify">
            {about}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Link
          href={'/business/create'}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full"
        >
          Edit business information
        </Link>
        <div className="bg-blue-100 p-3 rounded-md w-full text-center">
          <p className="text-blue-600 text-sm font-medium">
            Become a Premium Vendor
          </p>
          <Link href={'/top-vendor-plan'}>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-2 w-full">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VendorBusinessCard
