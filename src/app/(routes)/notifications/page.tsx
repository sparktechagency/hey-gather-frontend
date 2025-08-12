'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Pagination } from 'antd'
import Image from 'next/image'
import {
  useGetAllNotificationsQuery,
  useReadNotificationsMutation,
} from '@/redux/notificationsApis'
import Loader from '@/components/loading/ReactLoader'

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Fetch notifications using RTK Query
  const { data, error, isLoading } = useGetAllNotificationsQuery()
  const [readNotification] = useReadNotificationsMutation()
  const notifications = data?.data
  const removeNotification = async (id: string) => {
    await readNotification({ id })
  }

  const onChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle loading or error state
  if (isLoading) return <Loader />
  if (error) return <div>Error loading notifications</div>

  const paginatedNotifs = notifications?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className="cursor-pointer">
      <div className="responsive-width p-5 mx-auto rounded-lg">
        <div className="text-3xl font-semibold mb-3">Notifications</div>
        {paginatedNotifs?.length > 0 ? (
          paginatedNotifs.map((notif: any) => (
            <div
              key={notif.id}
              className="flex items-start gap-3 p-7 border-b border-gray-100 last:border-b-0 hover:bg-gray-100 transition"
            >
              <div className="flex-1">
                <h3 className="font-semibold">{notif.title}</h3>
                <p className="text-gray-600 text-sm">{notif.message}</p>
              </div>
              {!notif.read_by_user && (
                <div className="flex justify-end">
                  <button
                    onClick={() => removeNotification(notif._id)}
                    className="cursor-pointer text-blue-500 hover:text-blue-400 hover:underline"
                  >
                    Mark as read
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-xl text-gray-600 flex items-center justify-center h-[50vh]">
            No notifications found
          </div>
        )}

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={notifications?.length}
          onChange={onChange}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        />
      </div>
    </div>
  )
}

export default Notifications
