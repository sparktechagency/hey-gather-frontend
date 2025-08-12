'use client'
import dynamic from 'next/dynamic'

const SignUpComp = dynamic(() => import('@/components/signUp/signUpComp'), {
  ssr: false,
})

const SignUp = () => {
  return (
    <div>
      <SignUpComp />
    </div>
  )
}

export default SignUp
