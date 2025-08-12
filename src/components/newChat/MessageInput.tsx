'use client'
import { useState } from 'react'
import { RiSendPlaneFill, RiImageAddLine } from 'react-icons/ri'

interface MessageInputProps {
  onSendMessage: (message: string, imageFile?: any) => void
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSendMessage = () => {
    if (!message.trim() && !imageFile) return

    onSendMessage(message, imageFile)

    setMessage('')
    setImageFile(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  return (
    <div className="flex items-center p-4 bg-white border-t">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageUpload}
      />
      <label htmlFor="image-upload" className="mr-2 cursor-pointer">
        <RiImageAddLine className="text-2xl text-gray-600" />
      </label>

      {imageFile && (
        <div className="mr-2 text-sm text-gray-500">{imageFile.name}</div>
      )}

      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-lg mr-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />

      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 rounded-full"
      >
        <RiSendPlaneFill />
      </button>
    </div>
  )
}

export default MessageInput
