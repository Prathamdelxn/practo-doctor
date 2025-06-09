'use client';

import Link from 'next/link';
import { LayoutDashboard, Users, UserPlus, Image as ImageIcon, Settings, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function ClinicLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/clinic' },
    { label: 'Doctors', icon: Users, href: '/clinic/doctors' },
    { label: 'Receptionists', icon: UserPlus, href: '/clinic/receptionists' },
    { label: 'Manage Images', icon: ImageIcon, href: '/clinic/images' },
    { label: 'Settings', icon: Settings, href: '/clinic/settings' }
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white shadow-md px-6 py-8 fixed flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-purple-600 mb-8">HealthByte</h1>
          <nav className="space-y-3">
            {menu.map(({ label, icon: Icon, href }) => (
              <Link key={label} href={href}>
                <div
                  className={clsx(
                    'flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all',
                    pathname === href && 'bg-purple-100 font-semibold'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sign Out Button */}
        <Link href="/signout">
          <div className="flex items-center gap-2 text-red-600 hover:font-semibold hover:text-red-800 cursor-pointer transition-all">
            <LogOut className="w-5 h-5" />
            Sign Out
          </div>
        </Link>
      </aside>

      {/* Main Page Content */}
      <main className="ml-64 p-8 w-full min-h-screen bg-gray-50">{children}</main>
    </div>
  );
}
