import { Button, Form, Input, Modal, message } from 'antd'
import { useState } from 'react'

interface UpdateBookingModalProps {
  id: string
  isOpen: boolean
  onCancel: () => void
  onUpdate: (data: {
    id: string
    price: string
    additional_services: string
    additional_note: string
  }) => void
  initialData?: {
    price?: number
    additional_services?: string
    additional_note?: string
  }
}

const UpdateBookingModal: React.FC<UpdateBookingModalProps> = ({
  id,
  isOpen,
  onCancel,
  onUpdate,
  initialData,
}) => {
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updateData = {
          id,
          price: String(values.price),
          additional_services: values.additional_services || '',
          additional_note: values.additional_note || '',
        }

        onUpdate(updateData)
        message.success('Booking updated successfully')
        onCancel()
      })
      .catch((errorInfo) => {
        console.error('Validation Failed:', errorInfo)
        message.error('Please fill in the required fields correctly')
      })
  }

  return (
    <Modal
      title="Update Booking Details"
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-blue-600 text-white"
          onClick={handleSubmit}
        >
          Update Booking
        </Button>,
      ]}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          price: initialData?.price || '',
          additional_services: initialData?.additional_services || '',
          additional_note: initialData?.additional_note || '',
        }}
      >
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: 'Please input the price',
            },
            {
              pattern: /^\d+(\.\d{1,2})?$/,
              message: 'Please enter a valid price',
            },
          ]}
        >
          <Input type="number" placeholder="Enter price" prefix="$" />
        </Form.Item>

        <Form.Item name="additional_services" label="Additional Services">
          <Input.TextArea rows={3} placeholder="Enter additional services" />
        </Form.Item>

        <Form.Item name="additional_note" label="Additional Note">
          <Input.TextArea rows={3} placeholder="Enter additional notes" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateBookingModal
