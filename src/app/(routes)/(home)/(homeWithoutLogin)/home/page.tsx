import CustomizeEvent from '@/components/home/homeWithoutLogin/CustomizeEvent'
import FrequentlyAskedQuestion from '@/components/home/homeWithoutLogin/FrequentlyAskedQuestion'
import HeroPage from '@/components/home/homeWithoutLogin/HeroPage'
import Testimonial from '@/components/home/homeWithoutLogin/Testimonial'
import VendorCategories from '@/components/home/homeWithoutLogin/VendorCategories'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HYE GATHER | Home',
  description:
    'HYE GATHER | Find the best vendors for your events, from weddings to corporate parties.',
  keywords: 'event vendors, wedding vendors, corporate event vendors',
}

const Home = () => {
  return (
    <div className='px-5'>
      <HeroPage />
      <CustomizeEvent />
      <VendorCategories />
      <FrequentlyAskedQuestion />
      <Testimonial />
    </div>
  )
}

export default Home
