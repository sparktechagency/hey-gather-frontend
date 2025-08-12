'use client'

import { Form, Input, Button } from 'antd'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useResendOtpMutation } from '@/redux/authApis'

const ForgetPassword = () => {
  const router = useRouter()
  const [postResendOtp, { isLoading }] = useResendOtpMutation()

  const [form] = Form.useForm()
  type FormData = {
    email: string
  }
  const onFinish = async (values: FormData) => {
    try {
      const response = await postResendOtp({
        email: values.email,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('email')
          localStorage.setItem('email', values.email)
          router.push('/check-email-for-the-otp')
        })
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center  flex-col lg:flex-row s">
      <div className="w-1/2 hidden lg:block">
        <Image
          src={'/forgetPassword.png'}
          alt="password-reset"
          className="w-full h-full object-cover"
          width={5000}
          height={50}
        />
      </div>
      <div className="w-1/2  max-lg:w-full h-screen  flex flex-col justify-center items-center  ">
        <h1
          className="font-bold  text-center"
          style={{ fontSize: 'clamp(20px, 8vw, 40px)' }}
        >
          Forgot Password?
        </h1>
        <p
          className=" mb-8  text-center text-gray-600"
          style={{ fontSize: 'clamp(10px, 5vw, 16px)' }}
        >
          Please enter your email to get verification code
        </p>

        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={onFinish}
          className="w-full max-w-md"
        >
          <Form.Item
            name="email"
            label={<span>Email</span>}
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
              className="h-[42px]  border-gray-300 rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                padding: '1.25rem',
              }}
              className="w-full rounded-full h-11 mt-10"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ForgetPassword
