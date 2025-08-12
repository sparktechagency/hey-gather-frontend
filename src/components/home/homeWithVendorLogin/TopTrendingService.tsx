// 'use client'
// import Loader from '@/components/loading/ReactLoader'
// import { useGetBusinessDataQuery } from '@/redux/businessApis'
// import { url } from '@/redux/main/server'
// import { Carousel } from 'antd'
// import { StarIcon } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'

// const contentStyle: React.CSSProperties = {
//   maxWidth: '300px',
//   borderRadius: '10px',
//   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//   overflow: 'hidden',
//   backgroundColor: '#fff',
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// }

// const cardImageStyle: React.CSSProperties = {
//   width: '100%',
//   height: '200px',
//   objectFit: 'cover',
// }

// const cardTitleStyle: React.CSSProperties = {
//   textAlign: 'center',
//   fontSize: '1.25rem',
//   fontWeight: 'bold',
//   marginTop: '15px',
//   color: '#333',
// }

// const TopTrendingService = () => {
//   const { data, isLoading } = useGetBusinessDataQuery({
//     vendor_type: 'PREMIUM',
//   })

//   if (isLoading) return <Loader />

//   return (
//     <div className="responsive-width">
//       <div className="mt-48 mb-20">
//         <h2 className="text-center text-3xl font-bold mb-8 max-sm:mt-[400px]">
//           Top Trending Services
//         </h2>

//         <Carousel
//           slidesToShow={4}
//           autoplaySpeed={1200}
//           autoplay
//           responsive={[
//             {
//               breakpoint: 1524,
//               settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 1,
//               },
//             },
//             {
//               breakpoint: 1200,
//               settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 1,
//               },
//             },
//             {
//               breakpoint: 600,
//               settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//               },
//             },
//           ]}
//           className="flex items-center justify-center gap-10 w-full mx-auto text-black"
//         >
//           {data?.data?.map(
//             (
//               service: {
//                 id: number
//                 rating: number
//                 price: number
//                 business_category: { name: string; img: string }
//                 business_services: { name: string }[]
//               },
//               index: number
//             ) => (
//               <div
//                 key={index}
//                 className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
//               >
//                 <div className="relative overflow-hidden">
//                   <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
//                     <StarIcon className="w-3 h-3 text-yellow-500" />
//                     <span>{service?.rating}</span>
//                   </div>
//                   <Image
//                     src={`${url}/${service?.business_category?.img}`}
//                     alt={service?.business_category?.name}
//                     width={300}
//                     height={200}
//                     className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                 </div>

//                 <div className="p-4 flex-grow flex flex-col">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
//                     {service?.business_category?.name}
//                   </h3>

//                   <div className="text-sm text-gray-600 bg-green-200 ">
//                     <div className="flex">
//                       {service?.business_services?.map((item) => item?.name)}
//                     </div>
//                   </div>
//                   <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
//                     <div className="flex items-center gap-1">
//                       {[...Array(Math.floor(service?.rating))].map((_, i) => (
//                         <StarIcon
//                           key={`filled-${i}`}
//                           className="w-6 h-6 text-yellow-500"
//                         />
//                       ))}
//                       {[...Array(5 - Math.floor(service?.rating))].map(
//                         (_, i) => (
//                           <StarIcon
//                             key={`empty-${i}`}
//                             className="w-6 h-6 text-gray-300"
//                           />
//                         )
//                       )}
//                       {/* <span className="!text-xl text-gray-500">
//                         ({service?.rating})
//                       </span> */}
//                     </div>
//                     <div className="flex items-center justify-center gap-1 text-gray-600 ">
//                       <div className="font-bold">starting price :</div>
//                       <div className="font-bold text-lg text-blue-600">
//                         ${service?.price}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className=" flex items-center justify-center">
//                   <Link
//                     href={`/service/${service?.id}`}
//                     className="w-full py-3 flex mx-auto items-center justify-center bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             )
//           )}
//         </Carousel>
//       </div>
//     </div>
//   )
// }

// export default TopTrendingService

'use client'
import Loader from '@/components/loading/ReactLoader'
import { useGetBusinessDataQuery } from '@/redux/businessApis'
import { url } from '@/redux/main/server'
import { Carousel } from 'antd'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopTrendingService = () => {
  const { data, isLoading } = useGetBusinessDataQuery({
    vendor_type: 'PREMIUM',
  })

  if (isLoading) return <Loader />

  return (
    <section className="responsive-width mt-48 mb-20 max-sm:mt-[400px]">
      <h2 className="text-center text-4xl font-extrabold mb-12 text-gray-800">
        Top Trending Services
      </h2>

      <Carousel
        autoplay
        autoplaySpeed={2000}
        infinite
        dots={false}
        slidesToShow={3}
        responsive={[
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
        className="w-full px-4"
      >
        {data?.data?.map(
          (
            service: {
              id: number
              rating: number
              price: number
              business_category: { name: string; img: string }
              business_services: { name: string }[]
            },
            index: number
          ) => (
            <div key={index} className="p-3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
                <div className="relative">
                  <Image
                    src={`${url}/${service?.business_category?.img}`}
                    alt={service?.business_category?.name}
                    width={400}
                    height={250}
                    className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10 shadow-sm">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>{service?.rating}</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-3 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                    {service?.business_category?.name}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {service?.business_services?.map((item, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          fill={`${
                            i < Math.floor(service?.rating)
                              ? '#FFD700'
                              : 'white'
                          }`}
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(service?.rating)
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 font-semibold">
                        Starting Price
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        ${service?.price}
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/service/${service?.id}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 text-sm font-medium transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          )
        )}
      </Carousel>
    </section>
  )
}

export default TopTrendingService
