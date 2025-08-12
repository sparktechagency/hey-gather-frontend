import Testimonial from '@/components/home/homeWithoutLogin/Testimonial'
import DiscoverVendors from '@/components/home/homeWithUserLogin/DiscoverVendors'
import HowItWorks from '@/components/home/homeWithUserLogin/HowItWorks'
import PopularVendorsCategory from '@/components/home/homeWithUserLogin/PopularVendorsCategory'
import TopRatedVendors from '@/components/home/homeWithUserLogin/TopRatedVendors'
import UserHeroPage from '@/components/home/homeWithUserLogin/UserHeroPage'

const UserHome = () => {
  return (
    <div className="w-11/12 items-center mx-auto">
      <UserHeroPage />
      <PopularVendorsCategory />
      {/* <DiscoverVendors /> */}
      <HowItWorks />
      <TopRatedVendors />
      <Testimonial /> 
    </div>
  )
}

export default UserHome
