import Image from 'next/image'
import Link from 'next/link'

const VendorHeroPage = () => {
  return (
    <div className="responsive-width flex flex-col xl:flex-row gap-10 items-center justify-between   ">
      {/* Left Side - Text & Search */}
      <div className="max-w-[600px] mt-20">
        <h1 className="text-3xl font-bold text-gray-900">
          Expand your business with Hye Gather
        </h1>
        <p className="text-gray-700 mt-3 text-justify">
          Connect with clients, showcase your services, and manage your bookings
          effortlessly. Join our platform to reach more customers and streamline
          your event services.
        </p>

        <ul className="mt-4 space-y-2">
          <li className="flex items-center text-gray-700">
            <span className="text-blue-500 mr-2">✔</span> Get discovered by top
            event organizers
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-blue-500 mr-2">✔</span> Manage your bookings
            and availability easily
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-blue-500 mr-2">✔</span> Secure payments and
            hassle-free transactions
          </li>
        </ul>

        <div className="mt-6">
          <Link
            href={'/top-vendor-plan'}
            className="max-sm:flex  max-sm:flex-col gap-1"
          >
            <button className="px-2 py-3 max-sm:w-full bg-blue-600  text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - Images */}
      <div className="flex flex-col gap-3 mt-20">
        <div className="flex justify-end max-md:items-center max-md:justify-center items-end gap-3">
          <Image
            src="/djjj.png"
            alt="Bartender"
            className="max-w-72 w-full h-72 rounded-lg shadow-md object-cover"
            width={5000}
            height={50}
          />
          <Image
            src="/bar.jpg"
            alt="DJ"
            className="max-w-52 w-full h-52 rounded-lg shadow-md object-cover max-md:hidden "
            width={5000}
            height={50}
          />
        </div>
        <div className="flex justify-start max-md:items-center max-md:justify-center items-start gap-3">
          <Image
            src="/carsss.png"
            alt="Chef"
            className="max-w-52 w-full h-52 rounded-lg shadow-md object-cover max-md:hidden"
            width={5000}
            height={50}
          />
          <Image
            src="/foods.png"
            alt="Photographer"
            className="max-w-72 w-full h-72  rounded-lg shadow-md object-cover "
            width={5000}
            height={50}
          />
        </div>
      </div>
    </div>
  )
}

export default VendorHeroPage
