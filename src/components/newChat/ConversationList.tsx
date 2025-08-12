'use client'
import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { url } from '@/redux/main/server'
import { useGetConversationsQuery } from '@/redux/chatConversationApis'
import { Conversation, User } from '@/types/chat'
import Cookies from 'js-cookie'

interface ConversationListProps {
  currentUser: User
}

const ConversationList: React.FC<ConversationListProps> = ({ currentUser }) => {
  const router = useRouter()
  const { data: conversationsData, isLoading } = useGetConversationsQuery()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null)

  useEffect(() => {
    Cookies.get('UserId')
  }, [])

  useEffect(() => {
    if (conversationsData?.data) {
      const filteredConversations = conversationsData?.data?.filter(
        (conv: any) => {
          const otherUser = conv?.users?.find(
            (user: any) => user._id !== currentUser?._id
          )
          return (
            otherUser &&
            (currentUser?.role === 'VENDOR'
              ? otherUser?.role === 'USER'
              : otherUser?.role === 'VENDOR')
          )
        }
      )
      setConversations(filteredConversations)
    }
  }, [conversationsData, currentUser])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const handleSelectConversation = (conversation: Conversation) => {
    if (conversation?.users && conversation?.users.length > 0) {
      if (Cookies.get('role') === 'VENDOR') {
        const roleUser = conversation.users.find((user) => user.role === 'USER')
        if (roleUser) {
          Cookies.set('UserId', roleUser._id as string)
          Cookies.set('UserName', roleUser.name as string)
        }
      } else if (conversation.users.length > 1) {
        const roleUser = conversation.users.find(
          (user) => user.role === 'VENDOR'
        )
        if (roleUser) {
          Cookies.set('UserId', roleUser._id as string)
          Cookies.set('UserName', roleUser.name as string)
        }
      }
    } else {
      console.error('No users found in the conversation')
    }
    setSelectedConversation(conversation)
    router.push(`/chat?id=${conversation._id}`)
  }

  const renderConversationItem = (conversation: Conversation) => {
    const otherUser = conversation?.users?.find(
      (user) => user._id !== currentUser._id
    )

    return (
      <div
        key={conversation._id}
        onClick={() => handleSelectConversation(conversation)}
        className={`
          flex items-center p-4 cursor-pointer hover:bg-gray-100
          ${selectedConversation?._id === conversation._id ? 'bg-gray-200' : ''}
        `}
      >
        <Image
          src={`${url}/${otherUser?.img}`}
          alt={otherUser?.name || 'User'}
          width={50}
          height={50}
          className="rounded-full mr-4 w-12 h-12 object-cover"
        />
        <div>
          <h3 className="font-semibold">{otherUser?.name}</h3>
          <p className="text-sm text-gray-500">{otherUser?.role}</p>
          {/* <p className="text-sm text-gray-500">{otherUser?._id}</p> */}
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 border-r h-full overflow-y-auto ">
      <h2 className="p-4 text-xl font-semibold border-b">Chats</h2>
      {conversations?.length > 0 ? (
        conversations.map(renderConversationItem)
      ) : (
        <div className="p-4 text-center text-gray-500">
          No conversations yet
        </div>
      )}
    </div>
  )
}

export default ConversationList
