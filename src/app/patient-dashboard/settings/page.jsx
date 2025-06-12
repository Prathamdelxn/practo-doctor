import { FiUser, FiMail, FiPhone, FiLock, FiCreditCard, FiEdit2, FiPlus } from 'react-icons/fi'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-800">Account Settings</h1>
        <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Premium Member
        </div>
      </div>

      <Card title="Personal Information" className="border border-blue-100 bg-white rounded-xl">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-blue-400" />
                </div>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full pl-10 rounded-lg border-blue-100 bg-blue-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 py-2.5 px-4 text-blue-800 placeholder-blue-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-blue-400" />
                </div>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full pl-10 rounded-lg border-blue-100 bg-blue-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 py-2.5 px-4 text-blue-800 placeholder-blue-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-blue-400" />
              </div>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="block w-full pl-10 rounded-lg border-blue-100 bg-blue-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 py-2.5 px-4 text-blue-800 placeholder-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-blue-400" />
              </div>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="block w-full pl-10 rounded-lg border-blue-100 bg-blue-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 py-2.5 px-4 text-blue-800 placeholder-blue-400"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all">
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Security" className="border border-blue-100 bg-white rounded-xl">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-blue-400" />
              </div>
              <input
                type="password"
                defaultValue="········"
                className="block w-full pl-10 rounded-lg border-blue-100 bg-blue-50 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 py-2.5 px-4 text-blue-800 placeholder-blue-400"
                disabled
              />
            </div>
            <p className="mt-2 text-sm text-blue-600">
              Last changed 3 months ago. <a href="#" className="font-medium hover:text-blue-800">Change password</a>
            </p>
          </div>

          <div className="pt-3">
            <h3 className="text-sm font-medium text-blue-700">Two-Factor Authentication</h3>
            <p className="mt-1 text-sm text-blue-600">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-lg">
                Set Up 2FA
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Payment Methods" className="border border-blue-100 bg-white rounded-xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 rounded-lg bg-blue-100">
                <FiCreditCard className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800">Visa ending in 4242</p>
                <p className="text-xs text-blue-600">Expires 04/2025</p>
              </div>
            </div>
            <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
              <FiEdit2 className="mr-1.5" size={14} /> Edit
            </button>
          </div>

          <div className="pt-2">
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-lg">
              <FiPlus className="mr-2" size={16} />
              Add Payment Method
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Account Actions" className="border border-blue-100 bg-white rounded-xl">
        <div className="space-y-2">
          <button className="w-full text-left flex items-center justify-between text-sm font-medium text-red-600 hover:text-red-700 py-3 px-4 rounded-lg hover:bg-red-50 transition-colors">
            Request Account Deletion
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full text-left flex items-center justify-between text-sm font-medium text-blue-600 hover:text-blue-800 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
            Download My Data
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Card>
    </div>
  )
}