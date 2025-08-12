import { baseApis } from './main/baseApis'

const termsAndConditionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query<any, void>({
      query: () => ({
        url: '/setting/terms-and-conditions',
        method: 'GET',
      }),
      providesTags: ['termsAndCondition'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetTermsAndConditionsQuery } = termsAndConditionApis
export default termsAndConditionApis
