// 'use client'
// import Loader from '@/components/loading/ReactLoader'
// import ChatWindow from '@/components/newChat/ChatWindow'
// import ConversationList from '@/components/newChat/ConversationList'
// import {
//   useCreateConversationMutation,
//   useGetConversationsQuery,
// } from '@/redux/chatConversationApis'
// import { useGetProfileDataQuery } from '@/redux/profileApis'
// import { User } from '@/types/chat'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useState, useEffect } from 'react'
// import Cookies from 'js-cookie'

// const ChatPage: React.FC = () => {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const conversationId: string | null = searchParams.get('id')
//   const nameUser: string | null = searchParams.get('name')
//   const { data: profileData } = useGetProfileDataQuery()
//   const [currentUser, setCurrentUser] = useState<User | null>(profileData?.data)

//   const [createConversation] = useCreateConversationMutation()
//   const { data: conversationsData, isLoading: isConversationsLoading } =
//     useGetConversationsQuery()

//   useEffect(() => {
//     setCurrentUser(profileData?.data)
//   }, [profileData])

//   useEffect(() => {
//     if (conversationId && conversationsData?.data) {
//       const existingConv = conversationsData.data.find((conv: any) =>
//         conv.users.some((user: any) => user._id === conversationId)
//       )
//       if (existingConv) {
//         Cookies.set('UserId', conversationId as string)
//         Cookies.set('UserName', nameUser as string)
//         router.push(`/chat?id=${existingConv._id}`)
//       } else {
//         const createNewConversation = async () => {
//           try {
//             const response = await createConversation({
//               user: conversationId,
//             }).unwrap()

//             if (response?.data) {
//               const existingConv = conversationsData.data.find((conv: any) =>
//                 conv.users.some((user: any) => user._id === conversationId)
//               )
//               if (existingConv) {
//                 router.push(`/chat?id=${existingConv._id}`)
//               }
//             }
//           } catch (error) {
//             console.error('Failed to create conversation', error)
//           }
//         }
//         createNewConversation()
//       }
//     }
//   }, [conversationId, conversationsData, createConversation, router, nameUser])

//   if (!currentUser) {
//     return <Loader />
//   }

//   return (
//     <div className="flex h-screen responsive-width">
//       <ConversationList currentUser={currentUser} />
//       <ChatWindow currentUser={currentUser} />
//     </div>
//   )
// }

// export default ChatPage

import ChatPageContent from '@/components/chattt/ChatPageContent'
import Loader from '@/components/loading/ReactLoader'
import { Suspense } from 'react'

const ChatPage: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ChatPageContent />
    </Suspense>
  )
}

export default ChatPage
