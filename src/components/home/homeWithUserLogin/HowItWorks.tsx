const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Sign Up & Create Your Account',
      description:
        'Join the platform by signing up and setting up your profile for a personalized experience.',
    },
    {
      number: '2',
      title: 'Search & Explore Vendors',
      description:
        'Use advanced search filters to find the best vendors based on category, location, and ratings.',
    },
    {
      number: '3',
      title: 'Customize Your Event',
      description:
        'Select services that fit your event needs, compare vendors, and finalize your choices effortlessly.',
    },
    {
      number: '4',
      title: 'Secure Your Booking',
      description:
        'Confirm your selections, make a secure payment, and receive instant booking confirmation.',
    },
    {
      number: '5',
      title: 'Enjoy a Seamless Experience',
      description:
        'Sit back and relax while our trusted vendors bring your event to life with professionalism and expertise.',
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

export default HowItWorks
