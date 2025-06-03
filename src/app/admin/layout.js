'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Home, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  UserPlus,
  Activity,
  BarChart3,
  LogOut
} from 'lucide-react'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
   const router = useRouter();
    useEffect(() => {
    const token = localStorage.getItem('token')
    const user =localStorage.getItem('user')
    console.log(user)
    if (!token && !user.role=="admin") {
      router.push('/login') // 👈 Redirect if token not found
    }
  }, [router])
const user = JSON.parse(localStorage.getItem('user'));

 console.log("asdf",user)
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Doctors', href: '/admin/doctors', icon: Users },
    { name: 'Add Doctor', href: '/admin/doctors/add', icon: UserPlus },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Activity', href: '/dashboard/activity', icon: Activity },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-white/20
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200/50">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              HealthByte
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl
                           text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50
                           transition-all duration-200 ease-in-out"
                >
                  <Icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {item.name}
                </a>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200/50">
            <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50/50 transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            {/* <button className="mt-2 w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-colors">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button> */}
            <button
  onClick={() => {
    localStorage.removeItem('token'); // 🔐 Clear the token
    router.push('/login');      // 🚀 Redirect to login
  }}
  className="mt-2 w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-lg transition-colors"
>
  <LogOut className="mr-2 h-4 w-4" />
  Sign out
</button>

          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-white/20">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Search */}
              <div className="relative ml-4 flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
                           transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-xl hover:bg-gray-100/50 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
