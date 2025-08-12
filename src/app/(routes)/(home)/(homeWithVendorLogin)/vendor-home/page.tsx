import AboutOwner from '@/components/home/homeWithVendorLogin/AboutOwner'
import EventMarketplace from '@/components/home/homeWithVendorLogin/EventMarketplace'
import HowItWorksVendor from '@/components/home/homeWithVendorLogin/HowItWorksVendor'
import TestimonialVendor from '@/components/home/homeWithVendorLogin/TestimonialVendor'
import TopTrendingService from '@/components/home/homeWithVendorLogin/TopTrendingService'
import VendorHeroPage from '@/components/home/homeWithVendorLogin/VendorHeroPage'

const UserHome = () => {
  return (
    <div className="w-11/12 items-center mx-auto">
      <VendorHeroPage />
      <HowItWorksVendor />
      {/* <TopTrendingService /> */}
      <AboutOwner />
      <EventMarketplace />
      <TestimonialVendor />
    </div>
  )
}

export default UserHome
