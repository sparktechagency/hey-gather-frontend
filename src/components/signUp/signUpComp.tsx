'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Form, Input, Button } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSignUpMutation } from '@/redux/authApis'
import { FiLoader } from 'react-icons/fi'

const SignUpComp = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  useEffect(() => {
    if (role !== 'VENDOR' && role != 'USER') {
      router.push('/choose-role')
    }
  }, [role, router])

  const [form] = Form.useForm()

  type FormData = {
    name: string
    email: string
    password: string
    confirm_password: string
    phone: string
  }

  const [postSignUp, { isLoading }] = useSignUpMutation()

  const onFinish = async (values: FormData) => {
    try {
      const response = await postSignUp({
        name: values.name,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
        phone: values.phone,
        role: role || '',
      })
        .unwrap()
        .then((res) => {
          localStorage.setItem('role', role || '')
          localStorage.setItem('email', values.email)
          toast.success(res?.message)
          form.resetFields()
          router.push('/verify-account')
        })
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center  flex-col lg:flex-row">
      <div className="w-1/2 hidden lg:block">
        <Image
          src="/signUp.png"
          alt="Login"
          className="w-full h-full object-cover"
          width={5000}
          height={50}
        />
      </div>
      <div className=" mx-auto lg:w-1/2 h-screen  flex flex-col justify-center items-center p-12 ">
        <div className="flex items-center flex-col max-w-[500px] w-full">
          <h1
            className="font-bold  text-center"
            style={{ fontSize: 'clamp(20px, 8vw, 40px)' }}
          >
            Create an account
          </h1>
          <p
            className="mb-8  text-center text-gray-600"
            style={{ fontSize: 'clamp(8px, 5vw, 16px)' }}
          >
            Join us today and start planning your events or managing your
            services seamlessly!
          </p>
        </div>

        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={onFinish}
          className="w-full max-w-md overflow-y-scroll  scrollbar-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Form.Item
            name="name"
            label={<span className=" ">User Name</span>}
            rules={[
              {
                required: true,
                message: 'Please enter your username!',
              },
            ]}
          >
            <Input
              placeholder="Enter username"
              className="h-[42px] px-4 w-full  border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className=" ">Email</span>}
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          >
            <Input
              placeholder="Enter Email"
              className="h-[42px] px-4  border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<span className="">Phone Number</span>}
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Please enter a valid phone number!',
              },
            ]}
          >
            <Input
              placeholder="Enter Phone Number"
              className="h-[42px] px-4  border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="">Password</span>}
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="custom-password-input h-[42px] px-4 border-gray-300 rounded-md"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label={<span className="">Confirm Password</span>}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please enter your confirm password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  )
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Enter confirm password"
              className="custom-password-input h-[42px] px-4 border-gray-300 rounded-md"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                padding: '1.25rem',
              }}
              className="w-full   rounded-full h-11 mt-5"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Loading...
                  <FiLoader />
                </div>
              ) : (
                'Sign Up'
              )}
            </Button>
          </Form.Item>
        </Form>
        <div className="  text-gray-600 text-xs">
          Already have an account?{' '}
          <Link href="/sign-in" className=" hover:underline text-blue-800">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpComp
