import Image from 'next/image'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className=" flex items-center justify-center  mt-20 ">
      <Image
        src="/404Error.png"
        className=" w-[600px] object-cover  object-center"
        alt="404"
        width={5000}
        height={50}
      />
     
    </div>
  )
}

export default Custom404
