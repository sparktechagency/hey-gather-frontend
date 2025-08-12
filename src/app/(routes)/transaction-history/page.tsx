'use client'
import { useState } from 'react'
import { Pagination } from 'antd'
import Image from 'next/image'

const transactions = Array(20).fill({
  name: 'Albert Flores',
  image: 'https://randomuser.me/api/portraits/men/1.jpg',
  method: 'Via Stripe',
  amount: '$80 USD',
})

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className='responsive-width'>
      <div className="mb-20 mx-auto px-5  min-h-screen ">
        <h2 className="text-3xl mt-3 font-semibold mb-4">
          Recent transaction history
        </h2>

        <div className="space-y-3">
          {paginatedTransactions.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={tx.image}
                  alt={tx.name}
                  className="w-10 h-10 rounded-full object-cover"
                  width={5000}
                  height={50}
                />
                <div>
                  <p className="font-medium text-gray-800">{tx.name}</p>
                  <p className="text-sm text-gray-500">{tx.method}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">{tx.amount}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={transactions.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory
