import { Carousel, Modal, Tabs } from 'antd'
import Image from 'next/image'
import { useState } from 'react'
import { IoImages } from 'react-icons/io5'
import Reviews from '../reviews/Reviews'
import { url } from '@/redux/main/server'

interface Service {
  _id: string
  name: string
  image?: string
}
interface Vendor {
  id: string
  _id: string
  name: string
  rating: number
  reviews: number
  status: string
  categories: string[]
  bookings: number
  price: number
  description?: string
  images?: string[]
  services?: {
    name: string
    image: string
  }[]
  photos?: string[]
  business_services?: {
    _id: string
    name: string
  }[]
  total_booking?: number
  businesses?: { name: string }
  total_rated?: number
  reviews_comment?: {
    _id: string
    user: string
    description: string
    rating: number
    createdAt: string
  }[]
}

interface Vendor {
  _id: string
  name: string
  business_services?: {
    _id: string
    name: string
  }[]
}

interface VendorTabsProps {
  vendor: Vendor
}

const VendorTabs: React.FC<VendorTabsProps> = ({ vendor }) => {
  const [activeTab, setActiveTab] = useState<string>('1')

  const handleTabChange = (key: string): void => {
    setActiveTab(key)
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleOk = (): void => {
    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  // Use vendor images if available, otherwise use placeholder
  const images: string[] = vendor?.photos || []

  const services: Service[] = vendor?.business_services || []

  type TabItem = {
    key: string
    label: string
    children: React.ReactNode
  }

  const tabItems: TabItem[] = [
    {
      key: '1',
      label: 'About',
      children: (
        <div>
          {vendor?.description && (
            <div className="text-lg font-semibold">About</div>
          )}

          <p>{vendor?.description}</p>
          <div className="mt-4">
            <strong className="text-lg font-semibold">Overview</strong>
            <p>
              {vendor?.total_booking} Bookings on{' '}
              <b>{vendor?.businesses?.name}</b>
            </p>
          </div>
          <div className="mt-4">
            <strong className="text-lg font-semibold">Ratings</strong>
            <p>
              <span className="text-yellow-600">
                {vendor?.rating.toFixed(1)} ratings
              </span>{' '}
              - {vendor?.total_rated} Reviews
            </p>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Photos',
      children: (
        <div>
          <div className="text-lg font-semibold">Photos</div>
          <div className="flex gap-5 items-center justify-start flex-wrap mt-4">
            {images.slice(0, 3).map((image, i) => (
              <Image
                key={i}
                src={`${url}/${image}`}
                alt={`'vendor' image ${i + 1}`}
                className="max-w-[200px] w-full object-cover object-center rounded-lg"
                width={4000}
                height={100}
              />
            ))}
            <div
              onClick={showModal}
              className="cursor-pointer h-[200px] flex flex-col font-bold items-center justify-center max-w-[200px] w-full object-cover object-center rounded-lg bg-gray-200"
            >
              <IoImages className="text-5xl text-red-800" />
              View All Images
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Services',
      children: (
        <div>
          <div className="text-lg font-semibold">Services</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {services?.map((service, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-full shadow-md">
                  <span className="text-2xl text-blue-600">✨</span>
                </div>

                <p className="text-center text-lg font-semibold text-gray-800">
                  {service.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: '4',
      label: 'Reviews',
      children: <Reviews service={vendor._id} />,
    },
  ]

  return (
    <div className="max-w-[700px] p-6 bg-white rounded-lg shadow-md space-y-6 poppins mb-20">
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        className="!border-b-0 poppins"
        items={tabItems}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <Carousel arrows infinite={false}>
          {images.map((image, i) => (
            <Image
              key={i}
              src={`${url}/${image}`}
              alt={`${vendor?.name || 'vendor'} gallery image ${i + 1}`}
              className="object-cover object-center rounded-lg"
              width={5000}
              height={300}
            />
          ))}
        </Carousel>
      </Modal>
    </div>
  )
}

export default VendorTabs
