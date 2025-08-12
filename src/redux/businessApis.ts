import { baseApis } from './main/baseApis'
import Cookies from 'js-cookie'

const businessApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createBusiness: builder.mutation({
      query: (data) => {
        return {
          url: '/business/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['business', 'Profile', 'businessProfile'],
    }),

    getBusiness: builder.query({
      query: () => {
        return {
          url: '/business/get-all',
          method: 'GET',
        }
      },
      providesTags: ['business', 'Profile', 'businessProfile'],
    }),

    updateBusiness: builder.mutation({
      query: (data) => {
        const businessId = data.get('id')

        return {
          url: `/business/update/${businessId}`,
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['business', 'Profile', 'businessProfile'],
    }),

    cityList: builder.query({
      query: () => {
        return {
          url: '/city-list',
          method: 'GET',
        }
      },
    }),

    getAllServices: builder.query({
      query: () => {
        return {
          url: '/service/get-all',
          method: 'GET',
        }
      },
    }),

    getBusinessData: builder.query({
      query: (params) => {
        return {
          url: '/business-service/get-all',
          method: 'GET',
          params: params && Object.keys(params).length ? params : undefined,
        }
      },
      providesTags: ['business', 'Profile'],
    }),

    getBusinessDataWithoutParams: builder.query({
      query: () => {
        return {
          url: '/business-service/get-all',
          method: 'GET',
        }
      },
      providesTags: ['business', 'Profile'],
    }),

    createBusinessService: builder.mutation({
      query: (data) => {
        return {
          url: '/business-service/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['business', 'Profile'],
    }),

    updateBusinessService: builder.mutation({
      query: (data) => {
        const businessServiceId = data.get('businessServiceId')
        const businessId = data.get('businessId')

        return {
          url: `/business-service/update/${businessServiceId}/${businessId}`,
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['business', 'Profile'],
    }),

    deleteBusinessService: builder.mutation<
      any,
      {
        businessServiceId: string
        businessId: string
      }
    >({
      query: (data) => {
        const { businessServiceId, businessId } = data
        return {
          url: `/business-service/delete/${businessServiceId}/${businessId}`,
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: ['business', 'Profile'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetBusinessDataQuery,
  useGetAllServicesQuery,
  useCityListQuery,
  useGetBusinessQuery,
  useUpdateBusinessMutation,
  useCreateBusinessServiceMutation,
  useUpdateBusinessServiceMutation,
  useDeleteBusinessServiceMutation,
  useCreateBusinessMutation,
  useGetBusinessDataWithoutParamsQuery,
} = businessApis

export default businessApis
