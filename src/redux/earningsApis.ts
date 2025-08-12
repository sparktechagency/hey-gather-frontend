import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const earningsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query<
      any,
      { year_user: string; year_payment: string }
    >({
      query: (params) => {
        return {
          url: '/dashboard/vendor-overview',
          method: 'GET',
          params,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetEarningsQuery } = earningsApis

export default earningsApis
