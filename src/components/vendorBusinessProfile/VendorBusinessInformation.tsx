import Image from 'next/image'

interface Stat {
  id: number
  label: string
  value: number | string
  icon: string
}

interface VendorBusinessInformationProps {
  stats: Stat[]
}

const VendorBusinessInformation = ({
  stats,
}: VendorBusinessInformationProps) => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg">
      {stats?.map((stat) => (
        <div
          key={stat.id}
          className="bg-white border p-10 rounded-lg shadow-md flex flex-col items-center"
        >
          <Image src={stat.icon} alt={stat.label} width={40} height={40} />
          <p className="text-sm font-medium mt-2">{stat?.label}</p>
          <p className="text-lg font-bold">{stat?.value}</p>
        </div>
      ))}
    </div>
  )
}

export default VendorBusinessInformation
