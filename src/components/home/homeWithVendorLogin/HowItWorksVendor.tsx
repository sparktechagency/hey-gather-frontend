const HowItWorksVendor = () => {
  const steps = [
    {
      number: '1',
      title: 'Sign Up & Create Your Account',
      description:
        'Join the platform by signing up and setting up your profile for a personalized experience.',
    },
    {
      number: '2',
      title: 'Receive Booking Requests',
      description:
        'Users send booking requests with event details, including date, time, location, and guest count.',
    },
    {
      number: '3',
      title: 'Review Event Details & Send Price',
      description:
        'Check the event requirements and send a customized price quote to the user based on services, duration, and additional requests.',
    },
    {
      number: '4',
      title: 'Confirm & Manage Bookings',
      description:
        'Once the user accepts the price, finalize the booking, manage schedules, and prepare for the event.',
    },
    {
      number: '5',
      title: 'Get Paid & Grow Your Business',
      description:
        'Receive secure payments, complete the service, and build credibility with client reviews.',
    },
    {
      number: '6',
      title: 'Boost Your Visibility & Reach the Top',
      description:
        'Upgrade to a premium vendor plan to feature your services at the top of search results and get more bookings.',
    },
  ]

  return (
    <div className="responsive-width  ">
      <section className=" mx-auto mt-32 mb-40">
        <h2 className=" text-center text-3xl font-bold text-gray-900 mb-10">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 ">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-start  ">
              <div className="w-12 h-12 flex items-center justify-center text-blue-700 border-2 border-blue-700 rounded-full text-lg font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HowItWorksVendor
