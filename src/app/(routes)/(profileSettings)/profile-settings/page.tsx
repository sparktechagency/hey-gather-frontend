'use client'
import Loader from '@/components/loading/ReactLoader'
import { useLogoutMutation } from '@/redux/authApis'
import { url } from '@/redux/main/server'
import { useGetProfileDataQuery } from '@/redux/profileApis'
import {
  User,
  Phone,
  Mail,
  Settings,
  Heart,
  Bell,
  FileText,
  Shield,
  HelpCircle,
  LogOut,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CiBadgeDollar } from 'react-icons/ci'
import { FaStripe } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { LuCrown } from 'react-icons/lu'
import { MdOutlineWorkspacePremium } from 'react-icons/md'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'

const menuItems = [
  // {
  //   id: 1,
  //   title: 'Account Setting',
  //   icon: <Settings className="w-5 h-5" />,
  //   link: '/account-settings',
  // },
  // {
  //   id: 2,
  //   title: 'Favorite Vendor',
  //   icon: <Heart className="w-5 h-5" />,
  //   link: '/favorite-vendors',
  // },

  {
    id: 2,
    title: 'My Subscription',
    icon: <LuCrown className="w-5 h-5" />,
    link: '/my-subscription',
  },
  {
    id: 3,
    title: 'Earnings',
    icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
    link: '/earnings',
  },
  {
    id: 4,
    title: 'Notification',
    icon: <Bell className="w-5 h-5" />,
    link: '/notifications',
  },
  {
    id: 5,
    title: 'Business Profile',
    icon: <ImProfile className="w-5 h-5" />,
    link: '/business/create',
  },
  {
    id: 6,
    title: 'Premium Package',
    icon: <MdOutlineWorkspacePremium className="w-5 h-5" />,
    link: '/top-vendor-plan',
  },
  {
    id: 7,
    title: 'Package Plan',
    icon: <CiBadgeDollar className="w-5 h-5" />,
    link: '/subscription',
  },
  {
    id: 8,
    title: 'Connect Stripe Account',
    icon: <FaStripe className="w-5 h-5" />,
    link: '/connect-stripe-account',
  },
]

const moreItems = [
  {
    id: 8,
    title: 'Terms & Condition',
    icon: <FileText className="w-5 h-5" />,
    link: '/terms-and-conditions',
  },
  {
    id: 9,
    title: 'Privacy Policy',
    icon: <Shield className="w-5 h-5" />,
    link: '/privacy-and-policy',
  },
  {
    id: 10,
    title: 'Help/Support',
    icon: <HelpCircle className="w-5 h-5" />,
    link: '/contact-us',
  },
]

// // {
//   id: 7,
//   title: 'Log Out',
//   icon: <LogOut className="w-5 h-5" />,
//   link: '/home',
// },

const ProfileSettings = () => {
  const { data: profileData, isLoading } = useGetProfileDataQuery()
  const [logout] = useLogoutMutation()

  if (isLoading) return <Loader />

  const handleLogout = () => {
    localStorage.removeItem('token')
    logout()
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    })
    window.location.href = '/home'
  }
  return (
    <div className="responsive-width !h-screen !mb-20 flex justify-center items-center ">
      <div className="max-w-[700px]  w-full mx-auto  rounded-lg   ">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={`${url}/${profileData?.data.img}`}
              alt="User"
              className="w-30 h-30 rounded-full border-4 border-yellow-500"
              width={120}
              height={50}
            />
          </div>
          <h2 className="mt-3 text-xl font-semibold">
            {profileData?.data?.name}
          </h2>
          <p className="text-gray-500 flex items-center gap-1">
            <Phone className="w-4 h-4" /> {profileData?.data?.phone}
          </p>
          <p className="text-gray-500 flex items-center gap-1">
            <Mail className="w-4 h-4 " /> {profileData?.data?.email}
          </p>
          <Link href="/edit-profile">
            <button className="mt-4 bg-blue-800 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <User className="w-5 h-5 " /> Edit Profile
            </button>
          </Link>
        </div>

        <div className="mt-6 bg-gray-100 p-3 rounded-lg ">
          {menuItems
            .filter((item) =>
              profileData?.data?.role !== 'VENDOR'
                ? item.title !== 'My Subscription' &&
                  item.title !== 'Earnings' &&
                  item.title !== 'Business Profile' &&
                  item.title !== 'Premium Package' &&
                  item.title !== 'Package Plan' &&
                  item.title !== 'Connect Stripe Account' 
                  // item.title !== 'Notification'
                : true
            )
            .map((item) => (
              <Link key={item.id} href={item.link}>
                <div className="flex cursor-pointer justify-between items-center p-3 bg-white rounded-lg mb-2 shadow-sm hover:bg-gray-200">
                  <div className="flex items-center gap-3">
                    {item.icon} {item.title}
                  </div>
                  <span className="text-gray-400">{'>'}</span>
                </div>
              </Link>
            ))}
        </div>

        <div className="mt-4 ">
          <h3 className=" text-xl  font-semibold mb-2 ">More</h3>
          <div className="bg-gray-100 p-3 rounded-md flex flex-col gap-2">
            {moreItems.map((item) => (
              <Link key={item.id} href={item.link}>
                <div
                  className={`flex cursor-pointer justify-between items-center p-3 rounded-lg ${
                    item.title === 'Log Out'
                      ? 'bg-red-100 text-red-500'
                      : 'bg-white '
                  } shadow-sm hover:bg-gray-200`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon} {item.title}
                  </div>
                  <span className="text-gray-400">{'>'}</span>
                </div>
              </Link>
            ))}
            <div
              onClick={handleLogout}
              className="flex items-center justify-between gap-2 mt-4 cursor-pointer hover:bg-red-300 bg-red-200 px-4 py-2 rounded-lg"
            >
              <div className="flex items-center gap-2 ">
                <LogOut className="w-5 h-5" />
                <div>Log Out</div>
              </div>
              <span className="text-gray-400">{'>'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
