import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const reviewRatingApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      any,
      { service: string; rating: number; description: string }
    >({
      query: (data) => ({
        url: '/review/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReview: builder.query<any, { service: string; page: number }>({
      query: (params) => {
        return {
          url: `/review/get-all`,
          method: 'GET',
          params,
        }
      },
      providesTags: ['reviews'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateReviewMutation, useGetReviewQuery } = reviewRatingApis
export default reviewRatingApis
