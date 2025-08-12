'use client'

import { usePostContactUsMutation } from '@/redux/contactUsApis'
import { Form, Input, Button } from 'antd'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { FiLoader } from 'react-icons/fi'

const ContactUs = () => {
  const [form] = Form.useForm()
  const [postContactUs, { isLoading }] = usePostContactUsMutation()

  type FormData = {
    fullName: string
    email: string
    question: string
  }

  const handleSubmit = async (values: FormData) => {
    try {
      const response = await postContactUs({
        receiver: values.email,
        name: values.fullName,
        question: values.question,
      }).unwrap()
      toast.success(response.message || 'Message sent successfully!')
      form.resetFields()
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to send message.')
    }
  }

  return (
    <>
      <div className="flex justify-center gap-20 items-center my-10 max-sm:p-0 p-10 h-screen">
        <section className="max-lg:hidden">
          <Image
            src="/contactUs.png"
            alt="contact"
            className="w-[600px] min-w-[400px]"
            width={5000}
            height={50}
          />
        </section>
        <section>
          <div className="min-w-[300px] mx-auto bg-gray-100 p-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-2 max-lg:text-2xl">
              Ask a question
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Leave your question below, and our team will get back to you asap!
            </p>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-4"
              requiredMark={false}
            >
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: 'Full Name is required.' },
                  {
                    min: 3,
                    message: 'Full Name must be at least 3 characters.',
                  },
                ]}
              >
                <Input placeholder="Like. Petr Bilek" className="h-[42px]" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: 'Email is required.' },
                  { type: 'email', message: 'Enter a valid email address.' },
                ]}
              >
                <Input
                  placeholder="Like. bilekpetr92@gmail.com"
                  className="h-[42px]"
                />
              </Form.Item>

              <Form.Item
                label="Question"
                name="question"
                rules={[
                  { required: true, message: 'Please enter your question.' },
                  {
                    min: 10,
                    message: 'Question must be at least 10 characters.',
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Like. What's included in ...."
                  rows={7}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-900 h-[48px] text-white p-2 rounded-md hover:bg-blue-800 cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    Loading...
                    <FiLoader />
                  </div>
                ) : (
                  'Send message now'
                )}
              </Button>
            </Form>
          </div>
        </section>
      </div>
    </>
  )
}

export default ContactUs
