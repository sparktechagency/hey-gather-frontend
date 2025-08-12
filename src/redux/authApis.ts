import { baseApis } from './main/baseApis'

const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<
      any,
      {
        email: string
        name: string
        phone: string
        password: string
        confirm_password: string
        role: string
      }
    >({
      query: (data) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmailOtp: builder.mutation<
      any,
      {
        email: string
        code: string
      }
    >({
      query: (data) => ({
        url: '/verification/verify',
        method: 'POST',
        body: data,
      }),
    }),

    signIn: builder.mutation<
      any,
      {
        email: string
        password: string
      }
    >({
      query: (data) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: data,
      }),
    }),

    resendOtp: builder.mutation<
      any,
      {
        email: string
      }
    >({
      query: (data) => ({
        url: '/verification/create',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      any,
      {
        confirm_password: string
        password: string
      }
    >({
      query: (data) => {
        const token = localStorage.getItem('reset-token')

        return {
          url: '/auth/reset-password',
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
    }),

    changePassword: builder.mutation<
      any,
      {
        old_password: string
        password: string
        confirm_password: string
      }
    >({
      query: (data) => {
        const token = localStorage.getItem('token')
        return {
          url: '/auth/change-password',
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
    }),

    logout: builder.mutation<any, void>({
      query: (data) => {
        const token = localStorage.getItem('token')
        return {
          url: '/auth/logout',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useSignUpMutation,
  useVerifyEmailOtpMutation,
  useSignInMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApis

export default authApis
