import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const calendarApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCalendarData: builder.query<any, void>({
      query: () => ({
        url: '/booking/get-calender',
        method: 'GET',
      }),
      providesTags: ['calendar'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetCalendarDataQuery } = calendarApis
export default calendarApis
