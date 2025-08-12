'use client'

import Loader from '@/components/loading/ReactLoader'
import { useGetTermsAndConditionsQuery } from '@/redux/termsAndConditionApis'

const TermsAndCondition = () => {
  const { data, isLoading, isError } = useGetTermsAndConditionsQuery()
  const content = data?.data?.result?.desc

  if (isLoading) return <Loader />
  if (isError) return <p>Error loading terms and conditions</p>

  return (
    <div className="p-4 flex flex-col justify-center responsive-width">
      <div className="text-3xl font-bold mb-1.5">Terms & Conditions</div>
      <div
        dangerouslySetInnerHTML={{
          __html: content || 'No terms and conditions available.',
        }}
        className="text-justify mt-5"
      ></div>
    </div>
  )
}

export default TermsAndCondition
