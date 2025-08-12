import Image from 'next/image'

const UserHeroPage = () => {
  return (
    <div className="responsive-width flex flex-col xl:flex-row gap-10 items-center justify-between   ">
      <div className="max-w-xl mt-20">
        <h1 className="text-3xl font-bold text-gray-900">
          Plan Your Dream Event Effortlessly!
        </h1>
        <p className="text-gray-700 mt-3">
          Design and customize your perfect event with ease. Choose from
          top-rated vendors for a seamless and unforgettable experience.
        </p>

        <ul className="mt-4 space-y-2">
          <li className="flex items-center text-gray-700">
            <span className="text-blue-500 mr-2">✔</span> Manage all your event
            details in one place
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-blue-500 mr-2">✔</span> Get real-time updates
            on your bookings
          </li>
          <li className="flex items-center text-gray-700">
            <span className="text-blue-500 mr-2">✔</span> Secure and hassle-free
            payments
          </li>
        </ul>
      </div>

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
      {/* <div className="flex flex-col gap-3 mt-20">
        <div className="flex justify-end max-md:items-center max-md:justify-center items-end gap-3">
          <Image
            src="/dJs.jpg"
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
            src="/food.jpg"
            alt="Chef"
            className="max-w-52 w-full h-52 rounded-lg shadow-md object-cover max-md:hidden"
            width={5000}
            height={50}
          />
          <Image
            src="/photography.jpg"
            alt="Photographer"
            className="max-w-72 w-full h-72  rounded-lg shadow-md object-cover "
            width={5000}
            height={50}
          />
        </div>
      </div> */}
    </div>
  )
}

export default UserHeroPage
