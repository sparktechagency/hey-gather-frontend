'use client'

import { Form, Input, Button } from 'antd'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useResetPasswordMutation } from '@/redux/authApis'

const SetANewPassword = () => {
  const router = useRouter()
  const [postResetPassword, { isLoading }] = useResetPasswordMutation()
  const [form] = Form.useForm()
  type FormData = {
    password: string
    confirm: string
  }
  const onFinish = async (values: FormData) => {
    try {
      const response = await postResetPassword({
        password: values.password,
        confirm_password: values.confirm,
      })
        .unwrap()
        .then((res) => {
          toast.success(res?.message)
          form.resetFields()
          localStorage.removeItem('reset-token')
          localStorage.removeItem('email')
          router.push('/sign-in')
        })
    } catch (error: any) {
      toast.error(error?.data?.message)
    }
  }

  return (
    <div className="h-screen flex  flex-col lg:flex-row ">
      <div className="w-1/2 hidden lg:block">
        <Image
          src="/forgetPassword.png"
          alt="password-reset"
          className="w-full h-full object-cover"
          width={5000}
          height={50}
        />
      </div>
      <div className="w-full lg:w-1/2 h-screen  flex flex-col justify-center items-center p-12">
        <h1
          className="font-bold  text-center"
          style={{ fontSize: 'clamp(20px, 8vw, 40px)' }}
        >
          Set new Password
        </h1>
        <p
          className=" mb-8 text-center text-gray-600 max-w-lg"
          style={{ fontSize: 'clamp(10px, 5vw, 20px)' }}
        >
          Create a new password. Ensure it differs from previous ones for
          security
        </p>

        <Form
          requiredMark={false}
          layout="vertical"
          onFinish={onFinish}
          className="w-full max-w-sm"
        >
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
            name="confirm"
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
              className="w-full rounded-full h-11 mt-10"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default SetANewPassword
