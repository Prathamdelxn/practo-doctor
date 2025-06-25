'use client'

import { useState,useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FiHome, FiCalendar, FiFileText, FiPieChart, FiSettings, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { FaHeartbeat, FaClinicMedical } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 

  LogOut
} from 'lucide-react'
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter();
  const pathname = usePathname()
useEffect(() => {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (!token || !userStr) {
        router.push('/login')
        return
      }
      
       try {
         const user = JSON.parse(userStr)
         console.log(user)
  
     
        if (user.role !== "patient") {
          router.push('/login')
        }
      } catch (error) {
        console.error('Invalid user data in localStorage')
        router.push('/login')
      }
    }, [router])
  const navItems = [
    { name: 'Overview', href: '/patient-dashboard', icon: <FiHome size={20} /> },
    { name: 'Appointments', href: '/patient-dashboard/appointments', icon: <FiCalendar size={20} /> },
    { name: 'Prescriptions', href: '/patient-dashboard/prescriptions', icon: <FaClinicMedical size={20} /> },
    { name: 'Medical Records', href: '/patient-dashboard/medical-records', icon: <FiFileText size={20} /> },
    { name: 'Health Data', href: '/patient-dashboard/health-data', icon: <FaHeartbeat size={20} /> },
    { name: 'Settings', href: '/patient-dashboard/settings', icon: <FiSettings size={20} /> },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <FiUser className="text-white" />
              </div>
              <span className="font-semibold text-lg">Patient Portal</span>
            </div>
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Sidebar navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className={pathname === item.href ? 'text-blue-600' : 'text-gray-500'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <div className="text-sm text-gray-500">
              <button
  onClick={() => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');// 🔐 Clear the token
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
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="text-blue-600" />
                </div>
                <span className="font-medium">John Doe</span>
              </div>
              <Link href="/">
                Home
              </Link>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}