import { BsMessenger, BsTelegram } from 'react-icons/bs'
import { IoLogoWhatsapp } from 'react-icons/io'
import { SiImessage } from 'react-icons/si'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black  text-white py-8 poppins px-5 ">
      <div className=" mx-auto flex flex-col lg:flex-row justify-between responsive-width">
        <div className="flex flex-col mb-6 md:mb-0">
          <h2 className="text-3xl font-extrabold text-blue-700 viga">
            HYE GATHER
          </h2>
          <p className="mt-2  poppins">
            Connecting event organizers with the best vendors for every
            occasion.
          </p>
          <section>
            <p className="font-semibold text-blue-500 mt-5 poppins">
              Follow Us
            </p>
            <div className="flex mt-4 space-x-4 text-2xl items-center ">
              <Link href="/" target="_blank">
                <FaFacebook className="cursor-pointer text-blue-700 hover:text-gray-200 " />
              </Link>

              <Link href="/" target="_blank">
                <FaLinkedin className="cursor-pointer text-blue-500 hover:text-gray-200 " />
              </Link>

              <Link href="/" target="_blank">
                <FaInstagramSquare className="cursor-pointer text-pink-500 hover:text-gray-200 " />
              </Link>
            </div>
          </section>
        </div>

        <div className="flex flex-col mb-6 md:mb-0">
          <h3 className="font-semibold text-blue-500 text-xl">Explore</h3>
          <ul className="mt-5 flex flex-col gap-5 ">
            {/* <li>
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore-vendors" className="hover:text-blue-500">
                Explore Vendors
              </Link>
            </li> */}
            <li>
              <Link href="/contact-us" className="hover:text-blue-500">
                Contact Us
              </Link>
            </li>
            {/* <li>
              <Link href="/about-us" className="hover:text-blue-500">
                About Us
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="flex flex-col mb-6 md:mb-0">
          <h3 className="font-semibold text-blue-500 text-xl">Support</h3>
          <ul className="mt-5 flex flex-col gap-5 ">
            {/* <li>
              <Link href="/#faq" className="hover:text-blue-500">
                FAQ
              </Link>
            </li> */}
            <li>
              <Link
                href="/terms-and-conditions"
                className="hover:text-blue-500"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy-and-policy" className="hover:text-blue-500">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm">
        <p>
          &copy; Copyright {new Date().getFullYear()}, All Rights Reserved by{' '}
          <Link href="/" className="text-blue-500 hover:underline">
            HyeGather.com
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
