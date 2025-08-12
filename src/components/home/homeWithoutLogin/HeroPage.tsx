import React from 'react'
import { CiCircleChevRight } from 'react-icons/ci'
import Link from 'next/link'
import Image from 'next/image'

const HeroPage = () => {
  return (
    <div className="responsive-width  flex h-screen  max-lg:flex-col-reverse max-lg:gap-5 items-center justify-between ">
      {/* Left section */}
      <section>
        <div className="w-full max-w-[600px]   flex flex-col gap-5">
          <div className="flex items-center gap-3 ">
            <Image
              src="/bestVendor.svg"
              alt="bestVendor"
              className="w-7"
              width={10}
              height={10}
            />
            <div className="text-xl  ">
              Bringing the Best Vendors to Your Event
            </div>
          </div>

          <div className=" font-bold text-3xl mt-5 ">
            Plan Your Dream Event Effortlessly!
          </div>

          <div className="mt-5">
            <div className="flex gap-2 items-center ">
              <CiCircleChevRight className="text-blue-800 text-[56px]" />
              <div>
                Design Your Perfect Event, No Limits. Choose from the best
                vendors for a seamless experience.
              </div>
            </div>
            <div className="flex gap-2 items-center  mt-5">
              <CiCircleChevRight className="text-blue-800 text-5xl" />
              <div>
                Unleash Your Creativity. Build your event with top-tier vendors
                at your fingertips.
              </div>
            </div>
          </div>

          <div className="mt-5">
            Find the perfect vendors for any occasion, from weddings to
            corporate events.
          </div>

          <div className="mt-7">
            <Link
              href={'/sign-in'}
              className="text-white p-4 max-md:text-xs rounded-lg poppins  bg-blue-800 hover:bg-blue-700 max-lg:text-sm transition-all duration-300"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* right section */}
      <section className="max-lg:w-none ">
        <Image
          src="/heroPageRightPicture.png"
          alt="heroPageRightPicture"
          className="max-lg:w-[500px] w-[800px]"
          width={800}
          height={800}
        />
      </section>
    </div>
  )
}

export default HeroPage
