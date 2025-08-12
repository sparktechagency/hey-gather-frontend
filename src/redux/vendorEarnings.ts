import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const vendorEarnings = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getVendorEarnings: builder.query<any, void>({
      query: () => {
        return {
          url: '/dashboard/vendor-overview',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetVendorEarningsQuery } = vendorEarnings

export default vendorEarnings
