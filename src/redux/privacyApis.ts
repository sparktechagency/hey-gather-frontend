import { baseApis } from './main/baseApis'

const privacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query<any, void>({
      query: () => {
        return {
          url: '/setting/privacy-policy',
          method: 'GET',
        }
      },
      providesTags: ['privacyPolicy'],
    }),
  }),
})

export const { useGetPrivacyQuery } = privacyApis

export default privacyApis
