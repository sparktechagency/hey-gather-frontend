import Link from 'next/link'
import { TiTick } from 'react-icons/ti'
const RoleSelection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold ">Tell us who you are</h2>
        <p className="text-gray-600 mt-3">
          Select an option to personalize your experience on Hye Gather.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-7xl max-sm:max-w-full w-full   rounded-lg ">
        <div
          className=" rounded-lg p-6 flex flex-col justify-between items-center shadow-md"
          // style={{
          //   backgroundImage: `url(${'/roleVendor.png'})`,
          //   backgroundSize: 'contain',
          //   backgroundPosition: 'center',
          // }}
        >
          <div>
            <h3 className="text-3xl max-md:text-2xl m-10 text-center font-semibold text-gray-900">
              I’m a Vendor
            </h3>
            <p className=" text-sm text-center mt-2">
              Showcase your services, connect with clients, and manage all your
              bookings in one place.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <span className="text-blue-800 mr-2 text-2xl ">
                  <TiTick />
                </span>{' '}
                Add and manage your listings.
              </li>
              <li className="flex items-center">
                <span className="text-blue-800 mr-2 text-2xl">
                  <TiTick />
                </span>{' '}
                Track bookings and payments.
              </li>
              <li className="flex items-center">
                <span className="text-blue-800 mr-2 text-2xl">
                  <TiTick />
                </span>{' '}
                Collect reviews and grow your business.
              </li>
            </ul>
          </div>
          <Link
            className="w-full"
            href={{ pathname: '/sign-up', query: { role: 'VENDOR' } }}
          >
            <button className="mt-10 cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Continue as Vendor
            </button>
          </Link>
        </div>

        <div
          className=" rounded-lg p-6 flex flex-col justify-between items-center  shadow-md"
          // style={{
          //   backgroundImage: `url(${'/roleUser.png'})`,
          //   backgroundSize: 'contain',
          //   backgroundPosition: 'center',
          // }}
        >
          <div>
            <h3 className="text-3xl text-center font-semibold text-gray-900 m-10 max-md:text-2xl ">
              I’m Planning an Event
            </h3>
            <p className="text-sm text-center mt-2">
              Easily find and book trusted Armenian vendors for any occasion.
            </p>
            <ul className=" mt-4 space-y-2">
              <li className="flex items-center">
                <span className="text-blue-800 text-2xl mr-2">
                  {' '}
                  <TiTick />
                </span>{' '}
                Browse and compare top-rated vendors.
              </li>
              <li className="flex items-center">
                <span className="text-blue-800 text-2xl mr-2">
                  {' '}
                  <TiTick />
                </span>{' '}
                Send inquiries and manage bookings.
              </li>
              <li className="flex items-center">
                <span className="text-blue-800 text-2xl mr-2">
                  {' '}
                  <TiTick />
                </span>
                Leave reviews and stay organized.
              </li>
            </ul>
          </div>
          <Link
            className="w-full"
            href={{ pathname: '/sign-up', query: { role: 'USER' } }}
          >
            <button className="mt-10 cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
             Continue as Planner
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RoleSelection
