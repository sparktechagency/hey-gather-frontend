'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { url } from '@/redux/main/server'

import MessageInput from './MessageInput'
import { Message, User } from '@/types/chat'
import { useSocket } from '@/hooks/useSocket'
import {
  useGetConversationMessagesQuery,
  useSendMessageMutation,
} from '@/redux/chatConversationApis'
import Cookies from 'js-cookie'
import { GoCopy } from 'react-icons/go'
import toast from 'react-hot-toast'
import { Modal } from 'antd'
import BookingRequestVendor from '../myBookingsVendor/BookingRequestVendor'

interface ChatWindowProps {
  currentUser: User
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentUser }) => {
  const searchParams = useSearchParams()
  const [isClickCustomBooking, setIsClickCustomBooking] = useState(false)
  const conversationId = searchParams.get('id')
  const userId = Cookies.get('UserId')

  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const socket = useSocket(url, currentUser._id)
  const [sendMessage] = useSendMessageMutation()

  const { data: fetchedMessages, refetch } = useGetConversationMessagesQuery(
    { conversation_id: conversationId || '' },
    { skip: !conversationId }
  )

  useEffect(() => {
    if (fetchedMessages?.data) {
      setMessages(fetchedMessages.data)
    }
  }, [fetchedMessages])

  useEffect(() => {
    if (socket && conversationId) {
      const handleNewMessage = (message: Message) => {
        if (message.conversation_id === conversationId) {
          setMessages((prevMessages) => [...prevMessages, message])
        }
      }

      socket.on(
        `new-message::${conversationId}-${currentUser._id}`,
        handleNewMessage
      )

      return () => {
        socket.off(
          `new-message::${conversationId}-${currentUser._id}`,
          handleNewMessage
        )
      }
    }
  }, [socket, conversationId, currentUser._id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (messageText: string, imageFile?: File) => {
    if (!conversationId) return

    const formData = new FormData()
    formData.append('conversation_id', conversationId)
    formData.append('message', messageText)
    formData.append('sender', currentUser._id)

    if (imageFile) {
      formData.append('img', imageFile)
    }

    try {
      const response = await sendMessage(formData).unwrap()

      socket?.emit('new-message', {
        ...response.data,
        conversation_id: conversationId,
      })

      refetch()
    } catch (error) {
      console.error('Failed to send message', error)
    }
  }

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-full mx-auto text-gray-500">
        Select a conversation to start chatting
      </div>
    )
  }

  const handleCopy = () => {
    if (!userId) return

    if (!navigator.clipboard) {
      toast.error('Clipboard not supported in this browser.')
      return
    }

    navigator.clipboard
      .writeText(userId)
      .then(() => toast.success('User ID copied to clipboard!'))
      .catch((err) => {
        console.error('Failed to copy:', err)
        toast.error('Failed to copy User ID!')
      })
  }
  const handleClickCustomBooking = () => {
    setIsClickCustomBooking(true)
  }
  const handleCancelCustomBooking = () => {
    setIsClickCustomBooking(false)
  }
  return (
    <div className="flex flex-col h-full w-full">
      <div className=" backdrop-blur-md border-b-2  py-5 px-3 text-lg font-semibold flex items-center justify-between">
        <div>
          {Cookies.get('UserName')}
          {Cookies.get('role') === 'VENDOR' && (
            <div className="text-sm opacity-80 flex items-center gap-2 ">
              User ID: {Cookies.get('UserId')}
              <GoCopy
                className="cursor-pointer text-xl hover:text-gray-500"
                onClick={handleCopy}
              />
            </div>
          )}
        </div>
        {Cookies.get('role') === 'VENDOR' && (
          <div
            className="cursor-pointer bg-blue-100 p-2  rounded-md hover:bg-blue-200"
            onClick={handleClickCustomBooking}
          >
            Create Booking
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === currentUser._id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === currentUser._id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.message}
              {msg.img && (
                <Image
                  src={`${url}/${msg.img}`}
                  alt="Message Image"
                  width={200}
                  height={200}
                  className="mt-2 rounded-lg"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={handleSendMessage} />

      <Modal
        title="Create Custom Booking"
        open={isClickCustomBooking}
        onCancel={handleCancelCustomBooking}
        footer={null}
        width={500}
        centered
      >
        <BookingRequestVendor
          onClose={handleCancelCustomBooking}
          userId={Cookies.get('UserId')}
        />
      </Modal>
    </div>
  )
}

export default ChatWindow
