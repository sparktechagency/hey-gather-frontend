// 'use client'
// import { useGetBusinessDataWithoutParamsQuery } from '@/redux/businessApis'
// import { Carousel } from 'antd'
// import Image from 'next/image'

// const TestimonialData = [
//   {
//     id: 1,
//     img: '/entertainment.jpg',
//     name: 'Entertainment',
//   },
//   {
//     id: 2,
//     img: '/photography.jpg',
//     name: 'Photography',
//   },
//   {
//     id: 3,
//     img: '/venues.jpg',
//     name: 'Venues',
//   },
//   {
//     id: 4,
//     img: '/dJs.jpg',
//     name: 'DJs',
//   },
//   {
//     id: 5,
//     img: '/bar.jpg',
//     name: 'Bars',
//   },
//   {
//     id: 6,
//     img: '/food.jpg',
//     name: 'Food',
//   },
// ]

// const contentStyle: React.CSSProperties = {
//   maxWidth: '300px',
//   color: 'red',
//   lineHeight: '500px',
//   textAlign: 'center',
//   background: 'red !important',
// }

// const PopularVendorsCategory = () => {
//   const { data: getBusinessServicesData } =
//     useGetBusinessDataWithoutParamsQuery(undefined)

//   return (
//     <div className="responsive-width ">
//       <div className="mt-48 mb-20 ">
//         <h2 className="text-center text-3xl font-bold mb-8 max-sm:mt-[400px]">
//           Top-Rated Vendors
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
//           className=" flex items-center justify-center gap-10  w-full mx-auto  text-black"
//         >
//           {TestimonialData.map((data) => (
//             <div key={data.id} style={contentStyle}>
//               <div className="ml-5  p-3 ">
//                 <Image
//                   src={data.img}
//                   alt={data.name}
//                   className=" w-full h-[300px] mx-auto mb-4 object-cover"
//                   width={300}
//                   height={300}
//                 />
//                 <h3 className="text-xl font-bold text-center">{data.name}</h3>
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   )
// }

// export default PopularVendorsCategory

'use client'

import { useGetBusinessDataWithoutParamsQuery } from '@/redux/businessApis'
import { url } from '@/redux/main/server'
import { Carousel } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

const PopularVendorsCategory = () => {
  const { data, isLoading, isError } =
    useGetBusinessDataWithoutParamsQuery(undefined)

  const topRatedServices = data?.data
    ?.filter((service: any) => service.rating >= 4)
    ?.sort((a: any, b: any) => b.rating - a.rating)
    ?.slice(0, 10)

  if (isLoading) return <p className="text-center">Loading...</p>
  if (isError)
    return <p className="text-center text-red-500">Failed to load services.</p>

  return (
    <div className="responsive-width">
      <div className="mt-48 mb-20">
        <h2 className="text-center text-3xl font-bold mb-8 max-sm:mt-[400px]">
          Top-Rated Business Services
        </h2>

        <Carousel
          autoplay
          autoplaySpeed={2000}
          dots={false}
          className="w-full"
          responsive={[
            {
              breakpoint: 30020,
              settings: { slidesToShow: 4, slidesToScroll: 1 },
            },
            {
              breakpoint: 1524,
              settings: { slidesToShow: 3, slidesToScroll: 1 },
            },
            {
              breakpoint: 1200,
              settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
              breakpoint: 600,
              settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
          ]}
        >
          {topRatedServices?.map((item: any) => (
            <Link
              href={`/vendor-details/${item._id}`}
              key={item._id}
              className="px-4 "
            >
              <div className="bg-white rounded-2xl border p-4 text-center">
                <Image
                  src={`${url}/${item.img}`}
                  alt={item.businesses?.name || 'Business Image'}
                  width={50000}
                  height={50000}
                  className="rounded-xl w-full h-[200px] object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {item.businesses?.name}
                </h3>
                <p className="text-sm text-gray-500">{item.address}</p>
                <p className="text-yellow-500 font-semibold mt-2">
                  ⭐ {item.rating} / 5
                </p>
                <div className="text-xs text-gray-400 mt-1">
                  {item.business_services
                    .map((svc: any) => svc.name)
                    .join(', ')}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default PopularVendorsCategory
