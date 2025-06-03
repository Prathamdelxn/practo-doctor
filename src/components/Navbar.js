// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { 
//   MagnifyingGlassIcon, 
//   UserIcon, 
//   BellIcon, 
//   ShoppingCartIcon 
// } from '@heroicons/react/24/outline';

// export default function Navbar() {
//   return (
//     <motion.nav 
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="fixed w-full top-0 z-50 bg-gradient-to-r from-teal-500 to-blue-700 shadow-lg py-4 px-4 md:px-8"
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <motion.div 
//           whileHover={{ scale: 1.05 }}
//           className="flex items-center"
//         >
//           <Link href="/" className="text-3xl font-extrabold text-white tracking-tight flex items-center">
//             <span className="text-yellow-300">Health</span>
//             <span>Byte</span>
//           </Link>
//         </motion.div>

//         <div className="hidden md:flex  flex-1 mx-8">
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="relative w-full max-w-xl"
//           >
//             <input
//               type="text"
//               placeholder="Search doctors, clinics, hospitals..."
//               className="w-full py-3 px-5 border-2 text-black border-teal-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 bg-white/90 backdrop-blur-sm"
//             />
//             <motion.button 
//               whileHover={{ scale: 1.1 }}
//               className="absolute right-4 top-3 text-blue-600"
//             >
//               <MagnifyingGlassIcon className="h-5 w-5 " />
//             </motion.button>
//           </motion.div>
//         </div>

//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3 }}
//           className="flex items-center space-x-6"
//         >
//           <div className="hidden md:flex space-x-6">
//             {['Doctors', 'Clinics', 'Hospitals', 'Medicines'].map((item) => (
//               <motion.div 
//                 key={item}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 className="text-blue-100 hover:text-yellow-300 transition font-medium"
//               >
//                 <Link href={`/${item.toLowerCase()}`}>{item}</Link>
//               </motion.div>
//             ))}
//           </div>

//           <div className="flex items-center space-x-4">
//             <motion.button 
//               whileHover={{ scale: 1.2, rotate: 15 }}
//               className="text-blue-100 hover:text-yellow-300 transition"
//             >
//               <BellIcon className="h-6 w-6" />
//             </motion.button>
//             <motion.button 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-800 font-semibold px-5 py-2 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition shadow-md"
//             >
//               <UserIcon className="h-4 w-4" />
//               <span>Login</span>
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </motion.nav>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, User, Bell } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="ml-2 text-xl font-bold text-blue-600">HealthByte</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="text-blue-600 border-b-2 border-blue-600 px-1 pt-1 inline-flex items-center text-sm font-medium">
                Home
              </Link>
              <Link href="/doctors" className="text-gray-500 hover:text-gray-700 px-1 pt-1 inline-flex items-center text-sm font-medium">
                Find Doctors
              </Link>
              <Link href="/clinics" className="text-gray-500 hover:text-gray-700 px-1 pt-1 inline-flex items-center text-sm font-medium">
                Clinics
              </Link>
              <Link href="/services" className="text-gray-500 hover:text-gray-700 px-1 pt-1 inline-flex items-center text-sm font-medium">
                Services
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <div className="relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search for doctors, clinics..."
                type="search"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              <div className="border-l border-gray-300 h-6 mx-1"></div>
              <Link href="/login" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Login
              </Link>
              <Link href="/doctor-registration" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm">
                Register
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="bg-blue-50 text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/doctors" className="text-gray-500 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
              Find Doctors
            </Link>
            <Link href="/clinics" className="text-gray-500 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
              Clinics
            </Link>
            <Link href="/services" className="text-gray-500 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
              Services
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-500">Sign in to access your account</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50">
                Login
              </Link>
              <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}