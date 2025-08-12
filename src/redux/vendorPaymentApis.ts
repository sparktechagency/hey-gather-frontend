import { baseApis } from './main/baseApis'

export interface PriceData {
  name: string
  unit_amount: number
  quantity: number
  booking_id: string
}

export interface VendorPaymentRequest {
  price_data: PriceData[]
  purpose: 'BOOKING' | string
}

export interface VendorPaymentResponse {
  success: boolean
  paymentUrl?: string
  message?: string
  url?: string
}

const vendorPaymentApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createVendorPayment: builder.mutation<
      VendorPaymentResponse,
      VendorPaymentRequest
    >({
      query: (data) => ({
        url: '/payment/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['bookings'],
    }),
  }),
})

export const { useCreateVendorPaymentMutation } = vendorPaymentApis
export default vendorPaymentApis
