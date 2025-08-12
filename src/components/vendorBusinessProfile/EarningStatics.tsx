'use client'
import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useGetEarningsQuery } from '@/redux/earningsApis'
import Loader from '../loading/ReactLoader'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const EarningStatics = () => {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear.toString())

  const {
    data: earningsData,
    isLoading,
    error,
  } = useGetEarningsQuery({
    year_user: selectedYear,
    year_payment: selectedYear,
  })

  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  ).reverse()

  const months = earningsData?.data?.earning_overview?.monthNames?.map(
    (name: string) => name.substring(0, 3)
  ) || [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const earningStaticsData = {
    labels: months,
    datasets: [
      {
        label: 'Earnings',
        data: earningsData?.data?.earning_overview?.data || Array(12).fill(0),
        backgroundColor: '#0033A0',
      },
    ],
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value)
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow my-10 border">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Earning Statistics</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Total: ${earningsData?.data?.earning || 0}
          </span>
          <select
            className="p-2 bg-blue-100 text-xs rounded-md cursor-pointer outline-none"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year} className="p-2 cursor-pointer">
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="w-full h-[300px] flex items-center justify-center">
          <p className="text-red-500">Error loading earnings data</p>
        </div>
      ) : (
        <div className="w-full h-[300px] sm:h-[400px]">
          <Bar
            data={earningStaticsData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                bar: {
                  borderRadius: 30,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize:
                      Math.max(
                        ...(earningsData?.earningGrowth?.data || [100])
                      ) / 5,
                    callback: (value) => `$${value}`,
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `$${context.raw}`,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  )
}

export default EarningStatics
