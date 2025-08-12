import { get } from 'http'
import { baseApis } from './main/baseApis'

const chatConversationApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.mutation<any, { user: string }>({
      query: (data) => ({
        url: '/conversation/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['conversation', 'messages'],
    }),

    getConversations: builder.query<any, void>({
      query: () => '/conversation/get-all',
      providesTags: ['conversation', 'messages'],
    }),

    sendMessage: builder.mutation<any, FormData>({
      query: (data) => ({
        url: '/message/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['conversation', 'messages'],
    }),

    getConversationMessages: builder.query<any, { conversation_id: string }>({
      query: (params) => ({
        url: '/message/get-all',
        method: 'GET',
        params,
      }),
      providesTags: ['conversation', 'messages'],
    }),
  }),
})

export const {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useSendMessageMutation,
  useGetConversationMessagesQuery,
} = chatConversationApis

export default chatConversationApis
