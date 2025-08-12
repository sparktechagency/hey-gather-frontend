export interface User {
  _id: string
  name?: string
  email?: string
  img?: string
  role?: string
}

export interface Message {
  _id?: string
  conversation_id?: string
  message?: string
  sender?: string
  img?: string
  createdAt?: string
}

export interface Conversation {
  _id?: string
  users?: User[]
  createdAt?: string
  updatedAt?: string
}
