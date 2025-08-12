import React, { useState } from 'react'
import logo from '../../../assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavbarUser = () => {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between p-4 poppins z-10">
      <Link href={'/'} className="flex items-center gap-2">
        <Image src={logo} alt="Logo" />
        <div className="text-3xl font-extrabold text-blue-800 poppins">
          HYE GATHER
        </div>
      </Link>

      <ul className="flex space-x-6 items-center">
        <li>
          <Link
            href={'/user/home'}
            className={
              pathname === '/user/home'
                ? 'text-lg font-semibold text-blue-800 underline underline-offset-4 decoration-2'
                : 'text-lg font-semibold text-gray-800 hover:text-blue-800 hover:underline hover:underline-offset-4 hover:decoration-2'
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={'/user/vendors'}
            className={
              location.pathname === '/user/vendors'
                ? 'text-lg font-semibold text-blue-800 underline underline-offset-4 decoration-2'
                : 'text-lg font-semibold text-gray-800 hover:text-blue-800 hover:underline hover:underline-offset-4 hover:decoration-2'
            }
          >
            Vendors
          </Link>
        </li>
        <li>
          <Link
            href={'/user/my-bookings'}
            className={
              location.pathname === '/user/my-bookings'
                ? 'text-lg font-semibold text-blue-800 underline underline-offset-4 decoration-2'
                : 'text-lg font-semibold text-gray-800 hover:text-blue-800 hover:underline hover:underline-offset-4 hover:decoration-2'
            }
          >
            My bookings
          </Link>
        </li>
        <li>
          <Link
            href={'/user/messages'}
            className={
              location.pathname === '/user/messages'
                ? 'text-lg font-semibold text-blue-800 underline underline-offset-4 decoration-2'
                : 'text-lg font-semibold text-gray-800 hover:text-blue-800 hover:underline hover:underline-offset-4 hover:decoration-2'
            }
          >
            Messages
          </Link>
        </li>
        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-5 font-bold py-3 poppins bg-cyan-300 rounded-lg hover:bg-blue-200 transition-all duration-300"
          >
            Profile ▼
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white  overflow-hidden">
              <Link
                href={'/user/profile'}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Profile
              </Link>
              <Link
                href={'/user/settings'}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Settings
              </Link>
              <Link
                href={'/user/notifications'}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Notifications
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default NavbarUser
