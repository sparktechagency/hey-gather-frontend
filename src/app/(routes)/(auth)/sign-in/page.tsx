'use client'

import { Form, Input, Button } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useSignInMutation } from '@/redux/authApis'
import { FiLoader } from 'react-icons/fi'
import Cookies from 'js-cookie'

const SignIn = () => {
  const router = useRouter()
  const [form] = Form.useForm()

  const [postSignIn, { isLoading }] = useSignInMutation()
  
  type FormData = {
    email: string
    password: string
  }
  const onFinish = async (values: FormData) => {
    try {
      const response = await postSignIn({
        email: values.email,
        password: values.password,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.setItem('token', res?.token)
          Cookies.set('token', res?.token)
          Cookies.set('role', res?.role)

          if (res?.role === 'VENDOR') {
            router.push('/vendor-home')
          } else if (res?.role === 'USER') {
            router.push('/user-home')
          } else {
            router.push('/home')
          }
        })
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row   ">
      <div className="w-1/2 hidden lg:block">
        <Image
          src="/logIn.png"
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
            Login to Account
          </h1>
          <p
            className=" mb-8  text-center text-gray-600"
            style={{ fontSize: 'clamp(10px, 5vw, 16px)' }}
          >
            Please enter your email and password to continue
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
            name="email"
            label={<span className=" ">Email</span>}
            rules={[
              {
                // type: 'email',
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

          <div className="text-end -mt-4">
            <Link
              href={`/forget-password`}
              className=" text-md  text-blue-600 hover:underline"
            >
              Forget password
            </Link>
          </div>

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
                'Sign In'
              )}
            </Button>
          </Form.Item>
        </Form>
        <div className="  text-gray-600 text-xs">
          Don&apos;t have an account?{' '}
          <Link
            href={`/choose-role`}
            className=" hover:underline text-blue-800"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
