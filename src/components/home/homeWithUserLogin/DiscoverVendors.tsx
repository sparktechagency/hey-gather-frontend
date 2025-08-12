'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Vendor = {
  id: number
  image: string
  title: string
}

type Vendors = {
  [category: string]: Vendor[]
}

const DiscoverVendors = () => {
  const categories = [
    'Entertainment',
    'Photography',
    'Venues',
    'DJs',
    'Bars',
    'Food',
    'View All',
  ]

  const [activeCategory, setActiveCategory] = useState(categories[0])

  const vendors: Vendors = {
    Entertainment: [
      { id: 1, image: '/entertainment.jpg', title: 'Entertainment 1' },
      { id: 2, image: '/entertainment.jpg', title: 'Entertainment 2' },
      { id: 3, image: '/entertainment.jpg', title: 'Entertainment 3' },
    ],
    Photography: [
      { id: 4, image: '/photography.jpg', title: 'Photography 1' },
      { id: 5, image: '/photography.jpg', title: 'Photography 2' },
    ],
    Venues: [
      { id: 6, image: '/venues.jpg', title: 'Venue 1' },
      { id: 7, image: '/venues.jpg', title: 'Venue 2' },
    ],
    DJs: [
      { id: 8, image: '/dJs.jpg', title: 'DJ 1' },
      { id: 9, image: '/dJs.jpg', title: 'DJ 2' },
    ],
    Bars: [
      { id: 10, image: '/bar.jpg', title: 'Bar 1' },
      { id: 11, image: '/bar.jpg', title: 'Bar 2' },
    ],
    Food: [
      { id: 12, image: '/food.jpg', title: 'Food 1' },
      { id: 13, image: '/food.jpg', title: 'Food 2' },
    ],
  }

  return (
    <div className="responsive-width mx-auto pb-50 ">
      <h2 className="text-3xl font-bold text-gray-900 ">
        Discover Vendors for Your Perfect Event
      </h2>
      <p className="text-gray-600 mb-4">
        Browse a wide range of professional vendors, from entertainment to
        photography, and make your event truly unforgettable.
      </p>
      <div className="flex space-x-4 border-b border-gray-500 max-md:overflow-x-scroll overflow-hidden scrollbar-none">
        {categories.map((category) =>
          category === 'View All' ? (
            <Link key={category} href="/vendors">
              <button className="px-4 py-2 text-sm font-medium text-gray-700">
                {category}
              </button>
            </Link>
          ) : (
            <button
              key={category}
              className={`px-4 py-2 text-sm font-medium ${
                activeCategory === category
                  ? 'bg-blue-800 text-white'
                  : 'text-gray-700'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          )
        )}
      </div>
      <div className="flex flex-wrap items-center justify-start max-lg:justify-center gap-4 mt-6">
        {vendors[activeCategory].map((vendor: Vendor) => (
          <div key={vendor.id} className="flex flex-col">
            <Image
              src={vendor.image}
              alt={vendor.title}
              className="rounded-lg object-cover object-center shadow-md w-[300px] h-[300px]"
              width={5000}
              height={50}
            />
            <p className="text-lg font-semibold mt-2">{vendor.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiscoverVendors
