import { FaPhoneAlt } from 'react-icons/fa'
import Link from 'next/link'
import { IoMailOpenSharp } from 'react-icons/io5'
import dynamic from 'next/dynamic'

const AskedQuestionWithAnswer = dynamic(
  () => import('./AskedQuestionWithAnswer'),
  {
    loading: () => <p>Loading...</p>,
  }
)
const FrequentlyAskedQuestion = () => {
  return (
    <div className="responsive-width " id="faq">
      <div className="  mt-40 rounded-lg flex  flex-col justify-center">
        <h2 className="text-3xl mb-10 font-bold text-center max-md:text-2xl">
          Most Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <AskedQuestionWithAnswer />

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">
              Have questions? Get in touch with us!
            </h3>
            <p className="text-gray-600 mb-4">
              If you have more questions or need further assistance, feel free
              to reach out:
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <IoMailOpenSharp />
                <a
                  href="mailto:hyegather@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  hyegather@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt />
                <a
                  href="tel:+1612433513"
                  className="text-blue-600 hover:underline"
                >
                  +1 (612) 433-513
                </a>
              </div>
            </div>
            <div className="mt-5 text-gray-500">
              We’re here to help and ensure your experience with us is seamless.
            </div>
            <div className="mt-5 font-bold">
              We will make an email soon, and a phone number.
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            href="mailto:hyegather@gmail.com"
            className="text-white p-4 max-md:text-xs rounded-lg poppins  bg-blue-800 hover:bg-blue-700 max-lg:text-sm transition-all duration-300"
          >
            Let&apos;s Mail Us →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FrequentlyAskedQuestion
