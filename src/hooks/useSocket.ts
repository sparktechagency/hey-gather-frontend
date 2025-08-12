import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export const useSocket = (serverUrl: string, currentUserId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(serverUrl)

    newSocket.on('connect', () => {
      // console.log('Socket connected')
    })

    newSocket.on('disconnect', (reason: string) => {
      // console.log('Socket disconnected:', reason)
    })

    newSocket.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [serverUrl, currentUserId])

  return socket
}
