import { baseApis } from './main/baseApis'

const contactUsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    postContactUs: builder.mutation<
      any,
      { receiver: string; name: string; question: string }
    >({
      query: (data) => {
        return {
          url: '/send-email',
          method: 'POST',
          body: data,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { usePostContactUsMutation } = contactUsApis

export default contactUsApis
