import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  _id: string
  name: string
  email: string
  img?: string
}

interface Message {
  _id?: string
  conversation_id: string
  message: string
  sender: string
  img?: string
  createdAt?: string
}

interface Conversation {
  _id: string
  users: User[]
}

interface ChatState {
  conversations: Conversation[]
  activeConversation?: Conversation
  messages: Message[]
  currentUser?: User
}

const initialState: ChatState = {
  conversations: [],
  messages: [],
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    },
    setActiveConversation: (state, action: PayloadAction<Conversation>) => {
      state.activeConversation = action.payload
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
  },
})

export const {
  setConversations,
  setActiveConversation,
  addMessage,
  setMessages,
  setCurrentUser,
} = chatSlice.actions

export default chatSlice.reducer
