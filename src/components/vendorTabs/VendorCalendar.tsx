'use client'

import { useState } from 'react'
import { useGetCalendarDataQuery } from '@/redux/calendarApis'
import { Badge, Calendar, Card, List } from 'antd'
import type { BadgeProps } from 'antd'
import type { Dayjs } from 'dayjs'
import Loader from '../loading/ReactLoader'

const VendorCalendar: React.FC = () => {
  const { data: calendarData, isLoading } = useGetCalendarDataQuery()
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  if (isLoading) return <Loader />

  const getListData = (value: Dayjs) => {
    const dateString = value.format('YYYY-MM-DD')
    if (!calendarData?.data) return []

    return calendarData.data
      .filter((booking: any) => booking.date.startsWith(dateString))
      .map((booking: any) => ({
        type: booking.is_paid ? 'success' : 'warning',
        content: `${booking.event_name} (${booking.category})`,
      }))
  }

  const getSelectedDateBookings = () => {
    if (!selectedDate || !calendarData?.data) return []

    const dateString = selectedDate.format('YYYY-MM-DD')
    return calendarData.data.filter((booking: any) =>
      booking.date.startsWith(dateString)
    )
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map((item: any, index: number) => (
          <li key={index}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Card className="shadow-lg rounded-xl p-4 bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">
        Vendor Booking Calendar
      </h2>
      <Calendar
        dateCellRender={dateCellRender}
        className="rounded-xl"
        onSelect={(date) => setSelectedDate(date)}
      />

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">
            Bookings for {selectedDate.format('YYYY-MM-DD')}
          </h3>

          {getSelectedDateBookings().length === 0 ? (
            <p>No bookings on this date.</p>
          ) : (
            <List
              bordered
              dataSource={getSelectedDateBookings()}
              renderItem={(item: any) => (
                <List.Item>
                  <Badge
                    status={item.is_paid ? 'success' : 'warning'}
                    text={`${item.event_name} (${item.category})`}
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      )}
    </Card>
  )
}

export default VendorCalendar
