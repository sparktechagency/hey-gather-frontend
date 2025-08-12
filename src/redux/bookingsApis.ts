import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const bookingsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<any, void>({
      query: () => ({
        url: '/booking/get-all',
        method: 'GET',
      }),
      providesTags: ['bookings'],
    }),
    // getBookings: builder.query<any, { requested_by?: string }>({
    //   query: (params) => ({
    //     url: '/booking/get-all',
    //     method: 'GET',
    //     params,
    //   }),
    //   providesTags: ['bookings'],
    // }),

    createBookings: builder.mutation<
      any,
      {
        category: string
        services: string[]
        date: string
        time: string
        number_of_guests: string
        duration: string
        additional_services: string
        business_service: string
        location: string
        event_name: string
      }
    >({
      query: (data) => {
        return {
          url: '/booking/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['bookings'],
    }),

    manualBookings: builder.mutation<
      any,
      {
        category: string
        services: string[]
        date: string
        time: string
        number_of_guests: string
        duration: string
        additional_services: string
        business_service: string
        location: string
        event_name: string
        price: number
      }
    >({
      query: (data) => {
        return {
          url: '/booking/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['bookings'],
    }),

    updateBookings: builder.mutation<
      any,
      {
        id: string
        price: string
        additional_services: string
        additional_note: string
      }
    >({
      query: (data) => {
        const { id, ...rest } = data
        return {
          url: `/booking/update-price/${id}`,
          method: 'PATCH',
          body: rest,
        }
      },
      invalidatesTags: ['bookings'],
    }),

    updateBookingStatus: builder.mutation<
      any,
      {
        id: string
        status: string
      }
    >({
      query: (data) => {
        const { id, ...status } = data
        return {
          url: `/booking/update-status/${id}`,
          method: 'PATCH',
          body: status,
        }
      },
      invalidatesTags: ['bookings'],
    }),

    customCreateBookings: builder.mutation<
      any,
      {
        category: string
        services: string[]
        date: string
        time: string
        number_of_guests: string
        duration: string
        additional_services: string
        business_service: string
        location: string
        event_name: string
        price: number
        user: string
      }
    >({
      query: (data) => {
        return {
          url: '/booking/custom_booking',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['bookings'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateBookingsMutation,
  useManualBookingsMutation,
  useUpdateBookingsMutation,
  useUpdateBookingStatusMutation,
  useCustomCreateBookingsMutation,
  useGetBookingsQuery,
} = bookingsApis
export default bookingsApis
