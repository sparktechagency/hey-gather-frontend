'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Form,
  Tabs,
  Input,
  Select,
  Button,
  Upload,
  Typography,
  Spin,
} from 'antd'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import {
  useCityListQuery,
  useCreateBusinessMutation,
  useGetBusinessQuery,
  useUpdateBusinessMutation,
  useUpdateBusinessServiceMutation,
} from '@/redux/businessApis'
import { url } from '@/redux/main/server'
import Loader from '@/components/loading/ReactLoader'
import { IoCameraOutline } from 'react-icons/io5'

type BusinessFormData = {
  name: string
  address: string
  trade_license: string
  banner?: any
}

type City = {
  _id: string
  name: string
}

const { TabPane } = Tabs
const { Title, Text } = Typography
const { Item: FormItem } = Form

const BusinessCreate = () => {
  const router = useRouter()
  const [form] = Form.useForm<BusinessFormData>()

  const [mounted, setMounted] = useState(false)

  const [createBusiness, { isLoading: isCreating }] =
    useCreateBusinessMutation()
  const [updateBusiness, { isLoading: isUpdating }] =
    useUpdateBusinessMutation()
  const { data: cityListData, isLoading: citiesLoading } =
    useCityListQuery(undefined)
  const { data: businessProfileData, isLoading: profileLoading } =
    useGetBusinessQuery(undefined)

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState(false)

  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (businessProfileData?.data && mounted && !isInitialized) {
      const businessData = Array.isArray(businessProfileData.data)
        ? businessProfileData.data[0]
        : businessProfileData.data

      if (businessData) {
        setTimeout(() => {
          form.setFieldsValue({
            name: businessData.name || '',
            address: businessData.address || '',
            trade_license: businessData.trade_license || '',
          })

          if (businessData?.banner) {
            setLogoPreview(`${url}/${businessData?.banner}`)
          }

          setEditMode(true)
          setIsInitialized(true)
        }, 0)
      }
    }
  }, [businessProfileData, form, mounted, isInitialized])

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList?.[0]?.originFileObj
  }

  const handleLogoChange = (info: any) => {
    if (info.file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(info.file)
    } else {
      console.error('Invalid file object:', info.file)
    }
  }

  const handleSubmit = async (values: BusinessFormData) => {
    try {
      const formDataToSend = new FormData()

      formDataToSend.append('name', values.name)
      formDataToSend.append('address', values.address)
      formDataToSend.append('trade_license', values.trade_license)

      if (values.banner) {
        formDataToSend.append('banner', values.banner)
      }

      let response

      if (editMode && businessProfileData?.data) {
        const businessData = Array.isArray(businessProfileData.data)
          ? businessProfileData.data[0]
          : businessProfileData.data

        if (businessData._id) {
          formDataToSend.append('id', businessData._id)

          response = await updateBusiness(formDataToSend).unwrap()
        }
      } else {
        response = await createBusiness(formDataToSend).unwrap()
      }

      if (response.success) {
        toast.success(
          editMode
            ? 'Business updated successfully!'
            : 'Business created successfully!'
        )
      } else {
        toast.error(
          response.message ||
            `Failed to ${editMode ? 'update' : 'create'} business`
        )
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
      console.error(
        `Error ${editMode ? 'updating' : 'creating'} business:`,
        error
      )
    }
  }

  if (!mounted || profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    )
  }

  const uploadButton = (
    <div className="flex flex-col items-center justify-center">
      <UploadOutlined className="text-gray-400 text-xl" />
      <div className="mt-2 text-sm text-gray-500">Upload Logo</div>
    </div>
  )

  const getBusinessData = () => {
    if (!businessProfileData?.data) return null
    return Array.isArray(businessProfileData.data)
      ? businessProfileData.data[0]
      : businessProfileData.data
  }

  const businessData = getBusinessData()

  return (
    <div className="responsive-width py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className=" bg-blue-700 py-6 px-8">
          <Title level={2} className="!text-white !m-0">
            {editMode ? 'Update Your Business' : 'Register Your Business'}
          </Title>
        </div>

        <Tabs
          defaultActiveKey="form"
          className="px-6 pt-4"
          destroyInactiveTabPane={false}
        >
          <TabPane tab="Business Information" key="form">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="p-8"
              requiredMark={false}
            >
              <div className="flex flex-col items-center">
                <FormItem
                  name="banner"
                  label={<div className="ml-4">Business Logo</div>}
                  valuePropName="file"
                  getValueFromEvent={normFile}
                  className="text-center"
                  rules={[
                    {
                      required: !editMode,
                      message: 'Please upload a business logo',
                    },
                  ]}
                >
                  <Upload
                    name="logo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleLogoChange}
                  >
                    {logoPreview ? (
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src={logoPreview}
                          alt="Logo preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </FormItem>
              </div>

              <FormItem
                name="name"
                label="Business Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your business name',
                  },
                ]}
              >
                <Input placeholder="Enter your business name" size="large" />
              </FormItem>

              <FormItem
                name="address"
                label="Business Address"
                rules={[
                  {
                    required: true,
                    message: 'Please select your business address',
                  },
                ]}
              >
                <Select
                  placeholder="Select your business address"
                  size="large"
                  loading={citiesLoading}
                >
                  {cityListData?.data?.map((city: City) => (
                    <Select.Option key={city._id} value={city.name}>
                      {city.name}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>

              <FormItem
                name="trade_license"
                label="Trade License Number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your trade license number',
                  },
                ]}
              >
                <Input
                  placeholder="Enter your trade license number"
                  size="large"
                />
              </FormItem>

              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCreating || isUpdating}
                  className="w-full bg-blue-700 h-12 text-base"
                  size="large"
                >
                  {editMode ? 'Update Business' : 'Register Business'}
                </Button>
              </FormItem>

              <Text className="block text-center text-sm text-gray-500">
                By {editMode ? 'updating' : 'registering'}, you agree to our
                Terms of Service and Privacy Policy.
              </Text>
            </Form>
          </TabPane>

          {businessData && (
            <TabPane tab="Business Profile" key="profile">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {businessData?.banner ? (
                      <Image
                        src={`${url}/${businessData?.banner}`}
                        alt={businessData.name || 'Business logo'}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        No Logo
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <Title level={3} className="!mb-4">
                      {businessData?.name || 'Business Name'}
                    </Title>

                    <div className="mt-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <Text className="text-sm font-medium text-gray-500 sm:w-32">
                          Address:
                        </Text>
                        <Text className="text-gray-700">
                          {businessData?.address || 'N/A'}
                        </Text>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <Text className="text-sm font-medium text-gray-500 sm:w-32">
                          Trade License:
                        </Text>
                        <Text className="text-gray-700">
                          {businessData?.trade_license || 'N/A'}
                        </Text>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <Text className="text-sm font-medium text-gray-500 sm:w-32">
                          Created:
                        </Text>
                        <Text className="text-gray-700">
                          {businessData?.createdAt
                            ? new Date(
                                businessData.createdAt
                              ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                            : 'N/A'}
                        </Text>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        type="primary"
                        onClick={() => router.push('/service')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Back to business service
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          )}
        </Tabs>
      </div>
    </div>
  )
}

export default BusinessCreate
