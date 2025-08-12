'use client'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PiPlusCircleBold } from 'react-icons/pi'
import {
  Modal,
  Button,
  Select,
  Upload,
  message,
  InputNumber,
  Spin,
  Flex,
  Rate,
} from 'antd'
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  DollarOutlined,
  TagOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import {
  useCreateBusinessServiceMutation,
  useDeleteBusinessServiceMutation,
  useGetBusinessDataQuery,
  useUpdateBusinessServiceMutation,
} from '@/redux/businessApis'
import { useGetCategoryWithServicesDataQuery } from '@/redux/categoryWithServicesApis'
import Loader from '../loading/ReactLoader'
import toast from 'react-hot-toast'
import { url } from '@/redux/main/server'

interface BusinessService {
  _id: string
  price: number
  business: string
  img: string | null
  photos: string[]
  desc: string | null
  rating?: number
  total_rated?: number
  total_booking?: number
  vendor_type?: string
  user_details?: {
    _id: string
    name: string
    img: string
    email: string
    phone: string
    block: boolean
  }
  business_services?: {
    _id: string
    name: string
  }[]
  business_category?: {
    _id: string
    name: string
    img: string
  }
}

interface Category {
  _id: string
  name: string
  img: string
  services: {
    _id: string
    name: string
  }[]
}

const ServiceCard = ({ businessId }: { businessId: string }) => {
  const [showModal, setShowModal] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null)
  const [editServiceId, setEditServiceId] = useState<string | null>(null)
  const [fileList, setFileList] = useState<any[]>([])
  const [mainImage, setMainImage] = useState<any>(null)
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]) // Track deleted photos paths
  const [originalMainImage, setOriginalMainImage] = useState<string | null>(
    null
  )
  const [isMainImageDeleted, setIsMainImageDeleted] = useState(false) // Track if main image is deleted

  const [newService, setNewService] = useState({
    business_category: '',
    business_services: [] as string[],
    price: 0,
    business: businessId,
    businessServiceId: '',
    businessId: businessId,
    desc: '' as string | null,
  })

  const { data: businessData, isLoading: isBusinessLoading } =
    useGetBusinessDataQuery({ business: businessId })
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoryWithServicesDataQuery()
  const [createBusinessService, { isLoading: isCreating }] =
    useCreateBusinessServiceMutation()
  const [updateBusinessService, { isLoading: isUpdating }] =
    useUpdateBusinessServiceMutation()
  const [deleteBusinessService, { isLoading: isDeleting }] =
    useDeleteBusinessServiceMutation()

  const services: BusinessService[] = businessData?.data || []
  const categories: Category[] = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  )

  const [selectedServices, setSelectedServices] = useState<
    { _id: string; name: string }[]
  >([])

  useEffect(() => {
    if (newService.business_category && categories.length > 0) {
      const category = categories.find(
        (cat) => cat._id === newService.business_category
      )
      setSelectedServices(category?.services || [])
    }
  }, [newService.business_category, categories])

  const showDeleteConfirm = (id: string) => {
    setDeleteServiceId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteService = async () => {
    if (deleteServiceId) {
      try {
        await deleteBusinessService({
          businessServiceId: deleteServiceId,
          businessId: businessId,
        }).unwrap()
        message.success('Service deleted successfully')
      } catch (error) {
        message.error('Failed to delete service')
      }
      setIsDeleteModalOpen(false)
      setDeleteServiceId(null)
    }
  }

  const cancelDeleteService = () => {
    setIsDeleteModalOpen(false)
    setDeleteServiceId(null)
  }

  const handleMainImageChange = (info: any) => {
    if (info.file && info.file.status === 'removed') {
      setIsMainImageDeleted(true)
      setMainImage(null)
    } else {
      setIsMainImageDeleted(false)
      setMainImage(info.file)
    }
  }

  const handlePhotosChange = ({ fileList }: any) => {
    const currentPhotoPaths = fileList
      .map((file: any) => (file.url ? file.url.replace(`${url}/`, '') : null))
      .filter(Boolean)

    if (editServiceId) {
      const previousPaths = fileList
        .filter((file: any) => file.url)
        .map((file: any) => file.url.replace(`${url}/`, ''))

      const removedPaths = originalMainImage
        ? fileList
            .filter(
              (file: any) =>
                file.url &&
                !currentPhotoPaths.includes(file.url.replace(`${url}/`, ''))
            )
            .map((file: any) => file.url.replace(`${url}/`, ''))
        : []

      setDeletedPhotos((prev) => [...prev, ...removedPaths])
    }

    setFileList(fileList)
  }

  const handleEditService = (service: BusinessService) => {
    setDeletedPhotos([])
    setIsMainImageDeleted(false)

    const serviceToEdit = {
      business_category:
        typeof service.business_category === 'string'
          ? service.business_category
          : service.business_category?._id || '',
      business_services: Array.isArray(service.business_services)
        ? service.business_services
            .map((s) => (typeof s === 'object' ? s._id : s))
            .filter((s) => s !== undefined)
        : [],
      price: service.price,
      business: service.business,
      businessServiceId: service._id,
      businessId: businessId,
      desc: service.desc,
    }

    setNewService(serviceToEdit)
    setEditServiceId(service._id)

    if (service.photos && service.photos.length > 0) {
      const existingPhotos = service.photos.map((photo, index) => ({
        uid: `-${index}`,
        name: photo.split('/').pop() || `image-${index}`,
        status: 'done',
        url: `${url}/${photo}`,
      }))
      setFileList(existingPhotos)
    } else {
      setFileList([])
    }

    if (service.img) {
      setMainImage({
        uid: '-1',
        name: service.img.split('/').pop() || 'main-image',
        status: 'done',
        url: `${url}/${service.img}`,
      })
      setOriginalMainImage(service.img)
    } else {
      setMainImage(null)
      setOriginalMainImage(null)
    }

    setShowModal(true)

    if (service.business_category && categories.length > 0) {
      const category = categories.find(
        (cat) =>
          cat._id ===
          (service.business_category?.['_id'] || service.business_category)
      )
      setSelectedServices(category?.services || [])
    }
  }

  const resetForm = () => {
    setNewService({
      business_category: '',
      business_services: [],
      price: 0,
      business: businessId,
      businessServiceId: '',
      businessId: businessId,
      desc: null,
    })
    setFileList([])
    setMainImage(null)
    setEditServiceId(null)
    setDeletedPhotos([])
    setIsMainImageDeleted(false)
    setOriginalMainImage(null)
  }

  const handleAddNewService = () => {
    resetForm()
    setShowModal(true)
  }

  const handleSubmit = async () => {
    if (
      !newService.business_category ||
      newService.business_services.length === 0
    ) {
      return toast.error('Please select category and at least one service')
    }

    if (newService.price <= 0) {
      return toast.error('Please enter a valid price')
    }

    try {
      const formData = new FormData()

      formData.append('business_category', newService.business_category)
      formData.append(
        'business_services',
        JSON.stringify(newService.business_services)
      )
      formData.append('price', newService.price.toString())
      formData.append('business', businessId)
      if (mainImage) {
        formData.append('img', mainImage)
      }
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('photos', file.originFileObj)
        }
      })

      if (newService.desc) {
        formData.append('desc', newService.desc)
      }

      if (editServiceId) {
        formData.append('businessServiceId', newService.businessServiceId)
        formData.append('businessId', businessId)

        if (deletedPhotos.length > 0) {
          formData.append('delete_photos', JSON.stringify(deletedPhotos))
        }

        await updateBusinessService(formData).unwrap()
        toast.success('Service updated successfully')
      } else {
        await createBusinessService(formData).unwrap()
        toast.success('Service added successfully')
      }

      setShowModal(false)
      resetForm()
    } catch (error: any) {
      console.error('Operation failed:', error)
      toast.error(error?.data?.message || 'Operation failed')
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId)
    return category?.name || 'Unknown Category'
  }

  const getServiceNames = (serviceIds: string[]) => {
    if (!Array.isArray(serviceIds)) return []

    return serviceIds.map((id) => {
      const category = categories.find((cat) =>
        cat.services.some((service) => service._id === id)
      )
      if (!category) return 'Unknown Service'

      const service = category.services.find((service) => service._id === id)
      return service?.name || 'Unknown Service'
    })
  }

  const getServiceImage = (service: BusinessService) => {
    if (!service.img) {
      return service.photos && service.photos.length > 0
        ? `${url}/${service.photos[0]}`
        : '/placeholder-image.jpg'
    }
    return `${url}/${service.img}`
  }

  if (isBusinessLoading || isCategoriesLoading) {
    return (
      <div className="mx-auto">
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Services</h2>
        <Button
          type="primary"
          onClick={handleAddNewService}
          icon={<PiPlusCircleBold />}
          size="large"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all hover:shadow-xl"
          >
            <Link href={`/service/${service._id}`}>
              <div className="relative">
                <Image
                  src={getServiceImage(service)}
                  alt={service?.business_category?.name || 'Service image'}
                  width={500}
                  height={300}
                  className="w-full h-60 object-cover object-center"
                />

                {service.vendor_type && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                    {service.vendor_type}
                  </div>
                )}
              </div>
            </Link>
            <div className="p-5">
              <div className="flex items-center mb-3">
                <AppstoreOutlined className="text-blue-600 mr-2" />
                <h3 className="font-medium text-lg text-gray-800">
                  {service?.business_category?.name ||
                    getCategoryName(service?.business_category?._id || '')}
                </h3>
              </div>

              <div className="flex items-center mb-3">
                <TagOutlined className="text-green-600 mr-2" />
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(service.business_services) &&
                    service.business_services.map((ser, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs"
                      >
                        {typeof ser === 'object'
                          ? ser.name
                          : getServiceNames([ser])[0]}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <DollarOutlined className="text-red-500 mr-2" />
                <span className="text-xl font-bold text-gray-900">
                  ${service.price}
                </span>
              </div>
              <div className="flex justify-between">
                {service.total_booking !== undefined && (
                  <p className="text-gray-600 text-sm mb-4">
                    {service.total_booking} bookings
                  </p>
                )}
                <Flex gap="middle" vertical>
                  <Flex gap="middle">
                    <Rate value={service.rating} disabled />
                    <span className="text-gray-500">
                      ({service.total_rated})
                    </span>
                  </Flex>
                </Flex>
              </div>

              <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => showDeleteConfirm(service._id)}
                >
                  Delete
                </Button>

                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => handleEditService(service)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
        {services?.length === 0 && !isBusinessLoading && (
          <div className="col-span-full flex flex-col items-center justify-center p-10 h-[70vh]">
            <p className="text-gray-500 text-lg mb-4">
              You haven&apos;t added any services yet
            </p>
            <Button
              type="primary"
              onClick={handleAddNewService}
              icon={<PiPlusCircleBold />}
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Your First Service
            </Button>
          </div>
        )}
      </div>

      <Modal
        title={editServiceId ? 'Edit Service' : 'Add New Service'}
        open={showModal}
        onCancel={() => {
          setShowModal(false)
          resetForm()
        }}
        footer={null}
        centered
        width={600}
      >
        <div className="py-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Category
            </label>
            <Select
              className="w-full"
              placeholder="Select Service Category"
              onChange={(value) => {
                setNewService({
                  ...newService,
                  business_category: value,
                  business_services: [],
                })
              }}
              value={newService.business_category || undefined}
            >
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Services
            </label>
            <Select
              mode="multiple"
              className="w-full"
              placeholder="Select Services"
              onChange={(value) =>
                setNewService({ ...newService, business_services: value })
              }
              value={newService.business_services}
              disabled={!newService.business_category}
            >
              {selectedServices.map((service) => (
                <Select.Option key={service._id} value={service._id}>
                  {service.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <InputNumber
              className="w-full"
              min={0}
              placeholder="Enter price"
              onChange={(value) =>
                setNewService({ ...newService, price: value || 0 })
              }
              value={newService.price}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => {
                return value ? parseFloat(value.replace(/\$\s?|(,*)/g, '')) : 0
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Banner Image
            </label>
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={mainImage ? [mainImage] : []}
              beforeUpload={() => false}
              onChange={handleMainImageChange}
              onRemove={() => {
                setIsMainImageDeleted(true)
                setMainImage(null)
                return true
              }}
            >
              {!mainImage && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Banner Image</div>
                </div>
              )}
            </Upload>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Images
            </label>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handlePhotosChange}
              beforeUpload={() => false}
              onRemove={(file) => {
                // When removing a file with URL, track it for deletion
                if (file.url) {
                  const photoPath = file.url.replace(`${url}/`, '')
                  setDeletedPhotos((prev) => [...prev, photoPath])
                }
                return true
              }}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <p className="text-xs text-gray-500 mt-1">
              Images will be used to showcase your service
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => {
                setShowModal(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={isCreating || isUpdating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {editServiceId ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onOk={confirmDeleteService}
        onCancel={cancelDeleteService}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true, loading: isDeleting }}
        centered
      >
        <div className="py-4 flex items-center">
          <div className="bg-red-100 p-3 rounded-full mr-4">
            <DeleteOutlined className="text-red-500 text-xl" />
          </div>
          <div>
            <p>Are you sure you want to delete this service?</p>
            <p className="text-gray-500 text-sm mt-1">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ServiceCard
