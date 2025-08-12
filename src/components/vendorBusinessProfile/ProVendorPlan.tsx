import Link from 'next/link'

const ProVendorPlan = () => {
  return (
    <div className="bg-blue-100 p-6 md:p-12 rounded-lg flex flex-col md:flex-row items-center justify-between mb-20 mx-auto shadow-md">
      <div className="text-center md:text-left">
        <p className="text-gray-600 text-sm">
          Boost Your Visibility & Reach the Top
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">
          Get started with <br /> Pro vendor plan
        </h2>
      </div>
      <Link href={'/top-vendor-plan'}>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-md text-sm font-medium mt-4 md:mt-0">
          Get started
        </button>
      </Link>
    </div>
  )
}

export default ProVendorPlan
