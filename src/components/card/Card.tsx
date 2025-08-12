import { url } from '@/redux/main/server'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'

interface CardProps {
  id: string
  logo?: string
  name?: string
  rating: number
  reviews?: number
  status?: string
  categories?: string[]
  bookings?: number
  price?: number
  businessName?: string
}

const Card: React.FC<CardProps> = ({
  id,
  logo,
  name,
  rating,
  reviews,
  status,
  categories,
  bookings,
  price,
  businessName,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center sm:flex-row gap-4 max-w-[700px] w-full border border-gray-200">
      <div className="flex-shrink-0 w-[180px]  max-sm:max-w-[400px] max-sm:w-full">
        <Image
          src={`${url}/${logo}`}
          alt="Vendor Logo"
          width={5000}
          height={500}
          className="rounded-md object-cover object-center h-[120px] max-sm:h-full"
        />
      </div>
      <div className="flex-1 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {'\u2B50'.repeat(Math.floor(rating))}
          <span className="text-gray-600 ml-1">
            {rating} ({reviews})
          </span>
        </div>
        <p className="text-red-600 text-sm mt-1 font-bold">{status}</p>

        <div className="mt-2 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
          <p className="text-sm font-medium text-gray-700">
            Vendor service category:
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {categories?.map((category, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md text-xs"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-sm text-gray-600">
          {bookings} Bookings on {businessName}
        </p>
        <p className="text-md font-semibold">
          Get started for as low as <span className="text-black">${price}</span>
        </p>
        <Link
          href={`/vendor-details/${id}`}
          className="mt-2 bg-blue-600 flex items-center justify-center text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          onClick={() => Cookies.set('vendor-Id', id)}
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default Card
