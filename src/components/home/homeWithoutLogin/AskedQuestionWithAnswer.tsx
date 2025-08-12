'use client'
import Loader from '@/components/loading/ReactLoader'
import { useGetAllFaqQuery } from '@/redux/faqApis'
import { useState } from 'react'
import { FaAngleDown, FaChevronUp } from 'react-icons/fa'

const AskedQuestionWithAnswer = () => {
  type Index = number | null
  const [openIndex, setOpenIndex] = useState<Index>(null)

  const { data, isLoading, isError } = useGetAllFaqQuery()

  if (isLoading) return <Loader />
  if (isError) {
    return (
      <div className=" flex justify-center items-center ">
        <p>
          Failed to load frequently asked questions. Please try again later.
        </p>
      </div>
    )
  }
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  const faqs = data?.data
  return (
    <div className="space-y-5">
      {faqs.map((faq: { question: string; answer: string }, index: number) => (
        <div key={index} className="mb-2 bg-white p-4 rounded shadow">
          <button
            className="w-full text-left font-semibold flex justify-between items-center"
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span>
              {openIndex === index ? <FaChevronUp /> : <FaAngleDown />}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in ${
              openIndex === index ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AskedQuestionWithAnswer
