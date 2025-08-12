import { baseApis } from './main/baseApis'

const faqApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query<any, void>({
      query: () => ({
        url: '/faq/get-all',
        method: 'GET',
      }),
      providesTags: ['faq'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllFaqQuery } = faqApis

export default faqApis
