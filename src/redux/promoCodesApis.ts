import { baseApis } from './main/baseApis'

const promoCodesApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPromoCode: builder.query<any, { promoCode: string }>({
      query: (data) => {
        const { promoCode } = data
        return {
          url: `/promo/verify-promo/${promoCode}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetPromoCodeQuery } = promoCodesApis

export default promoCodesApis
