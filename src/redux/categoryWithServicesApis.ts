import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const categoryWithServicesApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryWithServicesData: builder.query<any, void>({
      query: () => {
        return {
          url: '/category/get-all',
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

export const { useGetCategoryWithServicesDataQuery } = categoryWithServicesApis

export default categoryWithServicesApis
