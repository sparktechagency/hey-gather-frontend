'use client'

import { Switch } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const AccountSettings = () => {
  const router = useRouter()
  const [isBrowserNotification, setIsBrowserNotification] = useState(false)
  const handleBrowserNotification = (checked: boolean) => {
    setIsBrowserNotification(checked)
    if (checked) {
      toast.success('Email notifications enabled')
    } else {
      toast.success('Email notifications disabled')
    }
  }

  const handleDeleteAccount = () => {
    toast.success('Account deleted successfully!')
    router.push('/')
  }
  return (
    <div className="mt-10">
      <div className="max-w-[700px] bg-gray-100 w-full flex flex-col gap-5  mx-auto  rounded-lg p-5">
        <div className="flex items-center justify-between p-3 border bg-white hover:bg-gray-200 cursor-pointer rounded-lg mb-1">
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">📢</span>
            <span className="text-sm font-medium text-gray-800">
              Send Notification On Mail
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <Switch
              className="switch"
              checked={isBrowserNotification}
              onChange={handleBrowserNotification}
            />
            <span className="ml-2 text-sm font-medium text-gray-900">
              {!isBrowserNotification ? 'On' : 'Off'}
            </span>
          </label>
        </div>

        <div
          onClick={handleDeleteAccount}
          className="flex items-center justify-between p-3 border bg-white hover:bg-gray-200   rounded-lg cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <span className="text-red-500">🚫</span>
            <span className="text-sm font-medium text-red-500">
              Delete Account
            </span>
          </div>
          <span className="text-red-400">{'>'}</span>
        </div>
      </div>
    </div>
  )
}

export default AccountSettings
