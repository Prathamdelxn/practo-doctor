import { FiUser, FiMail, FiPhone, FiLock, FiCreditCard } from 'react-icons/fi'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>

      <Card title="Personal Information">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                defaultValue="John"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                defaultValue="Doe"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>

      <Card title="Security">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                defaultValue="········"
                className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3"
                disabled
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Last changed 3 months ago. <a href="#" className="text-blue-600 hover:text-blue-500">Change password</a>
            </p>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <div className="mt-3">
              <Button variant="outline">Set Up 2FA</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Payment Methods">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-100">
                <FiCreditCard className="text-blue-600" size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                <p className="text-xs text-gray-500">Expires 04/2025</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-500">
              Edit
            </button>
          </div>

          <div className="pt-2">
            <Button variant="outline">Add Payment Method</Button>
          </div>
        </div>
      </Card>

      <Card title="Account Actions">
        <div className="space-y-3">
          <button className="w-full text-left text-sm font-medium text-red-600 hover:text-red-500 py-2 px-3 rounded-md hover:bg-red-50">
            Request Account Deletion
          </button>
          <button className="w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 py-2 px-3 rounded-md hover:bg-gray-100">
            Download My Data
          </button>
        </div>
      </Card>
    </div>
  )
}