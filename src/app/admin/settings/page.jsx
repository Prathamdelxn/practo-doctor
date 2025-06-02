'use client'
import { useState } from 'react'
import { 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  CreditCard,
  Users,
  Settings as SettingsIcon,
  HelpCircle
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    systemUpdates: true,
    marketingEmails: false
  })
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@hospital.com',
    phone: '+1 (555) 123-4567',
    position: 'Administrator',
    department: 'IT',
    location: 'New York, NY',
    bio: 'Experienced healthcare administrator with 10+ years in hospital management systems.',
    avatar: null
  })

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessionTimeout: '30',
    loginAlerts: true
  })

  const [systemSettings, setSystemSettings] = useState({
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    autoSave: true,
    dataRetention: '365'
  })

  const [saveStatus, setSaveStatus] = useState('')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'system', name: 'System', icon: SettingsIcon },
    { id: 'data', name: 'Data & Privacy', icon: Database }
  ]

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (setting) => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSecurityUpdate = (field, value) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSystemUpdate = (field, value) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async (section) => {
    setSaveStatus('saving')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus(''), 3000)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => handleProfileUpdate('avatar', e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
              {profileData.avatar ? (
                <img src={profileData.avatar} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-white font-semibold text-xl">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 h-6 w-6 bg-indigo-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-600 transition-colors">
              <Camera className="h-3 w-3 text-white" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{profileData.firstName} {profileData.lastName}</h4>
            <p className="text-sm text-gray-600">{profileData.position}</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileUpdate('email', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleProfileUpdate('phone', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={profileData.position}
              onChange={(e) => handleProfileUpdate('position', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={profileData.department}
              onChange={(e) => handleProfileUpdate('department', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            >
              <option value="IT">IT</option>
              <option value="Administration">Administration</option>
              <option value="Medical">Medical</option>
              <option value="Finance">Finance</option>
              <option value="HR">Human Resources</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => handleProfileUpdate('location', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleProfileUpdate('bio', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave('profile')}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </h4>
                <p className="text-xs text-gray-500">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Browser push notifications'}
                  {key === 'smsNotifications' && 'Text message notifications'}
                  {key === 'appointmentReminders' && 'Reminders for upcoming appointments'}
                  {key === 'systemUpdates' && 'System maintenance and updates'}
                  {key === 'marketingEmails' && 'Promotional emails and newsletters'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  enabled ? 'bg-indigo-500' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform top-0.5 ${
                  enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={securitySettings.currentPassword}
                onChange={(e) => handleSecurityUpdate('currentPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={securitySettings.newPassword}
                onChange={(e) => handleSecurityUpdate('newPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={securitySettings.confirmPassword}
              onChange={(e) => handleSecurityUpdate('confirmPassword', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave('security')}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center"
          >
            <Key className="h-4 w-4 mr-2" />
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Enable 2FA</h4>
            <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => handleSecurityUpdate('twoFactorEnabled', !securitySettings.twoFactorEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              securitySettings.twoFactorEnabled ? 'bg-indigo-500' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform top-0.5 ${
              securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* Session Settings */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) => handleSecurityUpdate('sessionTimeout', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="0">Never</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Login Alerts</h4>
              <p className="text-xs text-gray-500">Get notified of new login attempts</p>
            </div>
            <button
              onClick={() => handleSecurityUpdate('loginAlerts', !securitySettings.loginAlerts)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                securitySettings.loginAlerts ? 'bg-indigo-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform top-0.5 ${
                securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAppearance = () => (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 border-2 border-indigo-200 rounded-xl bg-indigo-50 flex flex-col items-center space-y-2">
            <Sun className="h-6 w-6 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Light</span>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 flex flex-col items-center space-y-2">
            <Moon className="h-6 w-6 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Dark</span>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 flex flex-col items-center space-y-2">
            <Monitor className="h-6 w-6 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">System</span>
          </button>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <select className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compact Mode</label>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Reduce spacing for more content</p>
              <button className="relative w-12 h-6 rounded-full bg-gray-300">
                <div className="absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform top-0.5 translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSystem = () => (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Localization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              value={systemSettings.language}
              onChange={(e) => handleSystemUpdate('language', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select
              value={systemSettings.timezone}
              onChange={(e) => handleSystemUpdate('timezone', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
            <select
              value={systemSettings.dateFormat}
              onChange={(e) => handleSystemUpdate('dateFormat', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              value={systemSettings.currency}
              onChange={(e) => handleSystemUpdate('currency', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Auto-save</h4>
              <p className="text-xs text-gray-500">Automatically save changes as you type</p>
            </div>
            <button
              onClick={() => handleSystemUpdate('autoSave', !systemSettings.autoSave)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                systemSettings.autoSave ? 'bg-indigo-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform top-0.5 ${
                systemSettings.autoSave ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Retention (days)</label>
            <select
              value={systemSettings.dataRetention}
              onChange={(e) => handleSystemUpdate('dataRetention', e.target.value)}
              className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            >
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
              <option value="1095">3 years</option>
              <option value="0">Never delete</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDataPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h3>
        <p className="text-sm text-gray-600 mb-4">Download your data in a portable format</p>
        <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Deletion</h3>
        <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all associated data</p>
        <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-sm sticky top-6">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-50/50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'notifications' && renderNotifications()}
            {activeTab === 'security' && renderSecurity()}
            {activeTab === 'appearance' && renderAppearance()}
            {activeTab === 'system' && renderSystem()}
            {activeTab === 'data' && renderDataPrivacy()}
          </div>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <div className={`fixed bottom-6 right-6 px-4 py-2 rounded-xl shadow-lg flex items-center ${
            saveStatus === 'saving' ? 'bg-yellow-100 text-yellow-800' :
            saveStatus === 'saved' ? 'bg-green-100 text-green-800' : ''
          }`}>
            {saveStatus === 'saving' && (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                Saving...
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Changes saved!
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}