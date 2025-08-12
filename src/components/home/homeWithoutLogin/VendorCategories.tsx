'use client'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { Carousel, Button } from 'antd'
import { LeftOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { CarouselRef } from 'antd/lib/carousel'

interface Category {
  name: string
  image: string
  description?: string
  color: string
  icon?: string
  vendorCount?: number
}

const categories: Category[] = [
  {
    name: 'Musicians',
    image: '/Frame-1.png',
    description: 'Find talented musicians for your event',
    color: 'from-purple-600 to-pink-600',
    icon: '🎵',
    vendorCount: 127,
  },
  {
    name: 'Entertainers',
    image: '/Frame-2.png',
    description: 'Discover unique entertainers to amaze your guests',
    color: 'from-blue-600 to-cyan-600',
    icon: '🎭',
    vendorCount: 89,
  },
  {
    name: 'Event Planners',
    image: '/Frame-3.png',
    description:
      'From weddings to birthdays, connect with experts who handle every detail.',
    color: 'from-emerald-600 to-teal-600',
    icon: '📋',
    vendorCount: 156,
  },
  {
    name: 'Decorators',
    image: '/Frame-4.png',
    description: 'Transform your event with elegant and stylish decor.',
    color: 'from-orange-600 to-red-600',
    icon: '🎨',
    vendorCount: 94,
  },
  {
    name: 'Caterers',
    image: '/Frame-5.png',
    description:
      'Explore delicious options from Armenian favorites to gourmet bites.',
    color: 'from-yellow-600 to-orange-600',
    icon: '🍽️',
    vendorCount: 203,
  },
  {
    name: 'DJs',
    image: '/Frame.png',
    description: 'Energetic DJs to keep the party going',
    color: 'from-indigo-600 to-purple-600',
    icon: '🎧',
    vendorCount: 76,
  },
]

const VendorCategories: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <div className="responsive-width">
      <section className="mt-[120px] max-lg:mt-[40px] px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
        </div>

        <div className="mx-auto flex items-center flex-col mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full text-sm font-medium text-purple-700 mb-4">
            <StarFilled className="text-xs" />
            Trusted by 1000+ events
          </div>
          <h1 className="text-5xl max-md:text-3xl font-bold text-center bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
            Browse Vendors by Category
          </h1>
          <p className="text-lg mt-4 text-gray-600 text-center max-w-3xl leading-relaxed">
            Find handpicked vendors in every category — all trusted and loved by
            the Armenian community. Your perfect event starts here.
          </p>
        </div>

        <div className="relative mt-12">
          {/* Custom Navigation Buttons */}
          <Button
            icon={<LeftOutlined />}
            onClick={() => carouselRef.current?.prev()}
            className="absolute left-4 top-1/2 z-20 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm   border-0 hover:bg-white transition-all duration-300 hover:scale-110"
            shape="circle"
            size="large"
          />

          <Button
            icon={<RightOutlined />}
            onClick={() => carouselRef.current?.next()}
            className="absolute right-4 top-1/2 z-20 transform -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-sm   border-0 hover:bg-white transition-all duration-300 hover:scale-110"
            shape="circle"
            size="large"
          />

          <div className="px-16 max-md:px-8">
            <Carousel
              ref={carouselRef}
              slidesToShow={3}
              slidesToScroll={1}
              dots={false}
              autoplay
              autoplaySpeed={4000}
              speed={800}
              afterChange={setActiveSlide}
              responsive={[
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
              ]}
              className="categories-carousel"
            >
              {categories.map((category, index) => (
                <div key={category.name} className="px-4 pb-12">
                  <Link href="/explore-vendors" className="block">
                    <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 h-80 transform hover:scale-105 hover:-translate-y-2 shadow-lg ">
                      {/* Background Image */}
                      <div
                        style={{
                          backgroundImage: `url(${category.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Floating Elements */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>

                      {/* Vendor Count Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-800 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        {category.vendorCount}+ vendors
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                            {category.name}
                          </h3>
                          {category.description && (
                            <p className="text-white/90 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                              {category.description}
                            </p>
                          )}
                        </div>

                        {/* Call to Action */}
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-200">
                            Explore Now
                            <RightOutlined className="text-xs" />
                          </span>
                        </div>
                      </div>

                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300"></div>
                    </div>
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Custom Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(categories.length / 3) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => carouselRef.current?.goTo(index * 3)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(activeSlide / 3) === index
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16 relative z-10">
          <Link href="/explore-vendors">
            <Button
              size="large"
              className="bg-blue-800  border-0 text-white px-8 py-3 h-auto text-base font-semibold rounded-full hover:!text-white hover:!bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              View All Categories
            </Button>
          </Link>
        </div>
      </section>

      <style jsx global>{`
        .categories-carousel .slick-slide {
          opacity: 0.7;
          transform: scale(0.95);
          transition: all 0.3s ease;
        }

        .categories-carousel .slick-active {
          opacity: 1;
          transform: scale(1);
        }

        .categories-carousel .slick-center {
          transform: scale(1.05);
        }

        .ant-carousel .slick-dots {
          display: none !important;
        }
      `}</style>
    </div>
  )
}

export default VendorCategories
