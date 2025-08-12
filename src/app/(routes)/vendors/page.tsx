'use client'

import { useState, useEffect } from 'react'
import { Checkbox, Select, Slider } from 'antd'
import Card from '@/components/card/Card'
import {
  useCityListQuery,
  useGetAllServicesQuery,
  useGetBusinessDataQuery,
} from '@/redux/businessApis'

const { Option } = Select

interface BusinessService {
  _id: string
  name: string
}

interface BusinessCategory {
  _id: string
  name: string
  img: string
  is_active: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

interface UserDetails {
  _id: string
  name: string
  img: string
  email: string
  phone: string
  block: boolean
}

interface BusinessData {
  _id: string
  price: number
  business: string
  img: string
  photos: string[]
  rating: number
  total_rated: number
  total_booking: number
  vendor_type: string
  user_details: UserDetails
  business_services: BusinessService[]
  business_category: BusinessCategory
  address: string
  businesses?: {
    name: string
  }
}

interface ApiResponse {
  success: boolean
  data: BusinessData[]
}

interface City {
  _id: string
  name: string
}

interface CityListResponse {
  success: boolean
  data: City[]
}

interface VendorData {
  id: string
  logo: string
  name: string
  rating: number
  reviews: number
  status: string
  categories: string[]
  bookings: number
  price: number
  vendorName: string
  address: string
}

const Vendors = () => {
  const [business, setBusiness] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [address, setAddress] = useState<string[]>([])

  const { data: businessData, isLoading } = useGetBusinessDataQuery({
    business,
    search,
    address: address.join(','),
  })

  const { data: cityList } = useCityListQuery(undefined)
  const { data: getAllServices } = useGetAllServicesQuery(undefined)

  const [selectedVendors, setSelectedVendors] = useState<VendorData[]>([])
  const [vendorType, setVendorType] = useState<string[]>([])
  const [city, setCity] = useState<string[]>([])

  useEffect(() => {
    if (businessData?.success && businessData?.data) {
      setSelectedVendors(transformBusinessData(businessData))
    }
  }, [businessData])

  const transformBusinessData = (
    data: ApiResponse | undefined
  ): VendorData[] => {
    if (!data?.data || !Array.isArray(data?.data)) return []

    return data?.data?.map((item: BusinessData) => ({
      id: item._id,
      logo: item.img,
      name: item.business_category.name,
      rating: item.rating,
      reviews: item.total_rated,
      status: 'Available',
      categories: item.business_services.map((service) => service.name),
      bookings: item.total_booking,
      price: item.price,
      vendorName: item.user_details.name,
      address: item.address,
      businessName: item?.businesses?.name,
    }))
  }

  const filterVendors = () => {
    if (!businessData?.data) return

    let filteredVendors = transformBusinessData(businessData)

    if (vendorType.length > 0) {
      filteredVendors = filteredVendors.filter((vendor) =>
        vendorType.some((type) =>
          vendor.categories.some(
            (category) => category.toLowerCase() === type.toLowerCase()
          )
        )
      )
    }

    if (city.length > 0) {
      filteredVendors = filteredVendors.filter((vendor) =>
        city.some(
          (location) => vendor.address && vendor.address.includes(location)
        )
      )
    }

    setSelectedVendors(filteredVendors)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const [isHamburgerClicked, setIsHamburgerClicked] = useState<boolean>(false)
  const handleClickHamburger = () => {
    setIsHamburgerClicked(!isHamburgerClicked)
  }

  const availableServices = businessData?.data
    ? [
        ...new Set(
          businessData.data.flatMap((item: any) =>
            item.business_services.map((service: any) => service.name)
          )
        ),
      ]
    : ['Music', 'Dance', 'Party', 'Food', 'Catering', 'Photography']

  const availableCities =
    cityList?.success && cityList?.data
      ? cityList.data.map((city: any) => city.name)
      : businessData?.data
      ? [
          ...new Set(
            businessData.data.map((item: any) => item.address).filter(Boolean)
          ),
        ]
      : [
          'Downtown Los Angeles',
          'Hollywood',
          'Venice Beach',
          'Long Beach',
          'Silver Lake',
        ]

  return (
    <div className="p-6 responsive-width">
      <div
        className="max-lg:block text-3xl text-center hidden"
        onClick={handleClickHamburger}
      >
        ☰
      </div>
      <div className="flex gap-10 mb-6 justify-between">
        <div className="flex flex-col gap-4 w-1/4 max-lg:hidden">
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="max-w-[350px] w-full px-4 py-2 border rounded-md outline-none"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div>
            <p className="font-semibold">Services</p>
            <Checkbox.Group
              onChange={(values) => setVendorType(values as string[])}
            >
              <div className="flex flex-col gap-2">
                {getAllServices?.data?.map((service: any, index: number) => (
                  <Checkbox key={index} value={service.name}>
                    {service.name}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </div>

          {/* <div>
            <p className="font-semibold">Sorting by City / Area</p>
            <Select
              mode="multiple"
              allowClear
              placeholder="Select City"
              style={{ width: '100%' }}
              onChange={(values) => setCity(values as string[])}
            >
              {availableCities.map((city: string, index: number) => (
                <Option key={index} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </div> */}

          <button
            onClick={filterVendors}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>

        {isHamburgerClicked && (
          <div className="flex flex-col gap-4 w-full">
            <div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-md outline-none mb-4"
                value={search}
                onChange={handleSearch}
              />
            </div>

            <div>
              <p className="font-semibold">Services</p>
              <Checkbox.Group
                onChange={(values) => setVendorType(values as string[])}
              >
                <div className="flex flex-col gap-2">
                  {availableServices.map((service: any, index) => (
                    <Checkbox key={index} value={service}>
                      {service}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            </div>

            {/* <div>
              <p className="font-semibold">Sorting by City / Area</p>
              <Select
                mode="multiple"
                allowClear
                placeholder="Select City"
                style={{ width: '100%' }}
                onChange={(values) => setCity(values as string[])}
              >
                {availableCities.map((city: string, index: number) => (
                  <Option key={index} value={city}>
                    {city}
                  </Option>
                ))}
              </Select>
            </div> */}

            <button
              onClick={filterVendors}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        )}

        {!isHamburgerClicked && (
          <div className="w-3/4 max-lg:w-full max-lg:justify-center flex flex-wrap items-start justify-end gap-6">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-64">
                <p className="text-lg">Loading vendors...</p>
              </div>
            ) : selectedVendors.length > 0 ? (
              selectedVendors.map((vendor) => (
                <Card key={vendor.id} {...vendor} />
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-64">
                <p className="text-lg">
                  No vendors found matching your criteria
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Vendors
