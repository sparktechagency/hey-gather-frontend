import {
  FaQuestionCircle,
  FaDollarSign,
  FaStar,
  FaCalendarCheck,
} from 'react-icons/fa'

const EventMarketplace = () => {
  return (
    <div className="p-6    responsive-width">
      <div className=" mx-auto text-center max-lg:mb-20 max-md:h-screen">
        <h2 className="text-3xl font-semibold mb-4">
          Join the Ultimate Event Marketplace
        </h2>
        <p className="text-[14px] mb-10 text-gray-600">
          Thousands of vendors and event organizers connect daily on HYE GATHER
          to create unforgettable experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  h-[200px]">
          <div className=" p-6 rounded-lg shadow-md border text-center bg-gray-100">
            <FaQuestionCircle className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-3xl font-semibold">500+</h3>
            <p className="text-gray-500">event inquiries processed</p>
          </div>

          <div className=" p-6 rounded-lg shadow-md border text-center bg-gray-100">
            <FaDollarSign className="text-4xl text-green-600 mb-4" />
            <h3 className="text-3xl font-semibold">$50k+</h3>
            <p className="text-gray-500">in transactions secured</p>
          </div>

          <div className=" p-6 rounded-lg shadow-md border text-center bg-gray-100">
            <FaStar className="text-4xl text-yellow-600 mb-4" />
            <h3 className="text-3xl font-semibold">300+</h3>
            <p className="text-gray-500">vendors offering premium services</p>
          </div>

          <div className=" p-6 rounded-lg shadow-md border text-center bg-gray-100">
            <FaCalendarCheck className="text-4xl text-purple-600 mb-4" />
            <h3 className="text-3xl font-semibold">1.5K+</h3>
            <p className="text-gray-500">successful events planned</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventMarketplace
