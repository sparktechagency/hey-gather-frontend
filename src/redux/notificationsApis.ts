import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const notificationsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<any, void>({
      query: () => ({
        url: '/notification/get-all',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }),
      providesTags: ['notifications'],
    }),
    readNotifications: builder.mutation<any, { id: string }>({
      query: (data) => {
        const { id } = data
        return {
          url: `/notification/read/${id}`,
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      },
      invalidatesTags: ['notifications'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllNotificationsQuery, useReadNotificationsMutation } =
  notificationsApis
export default notificationsApis
