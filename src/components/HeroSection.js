// // import Link from 'next/link';

// // export default function HeroSection() {
// //   return (
// //     <section className="bg-blue-600 text-white py-12 px-4">
// //       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
// //         <div>
// //           <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the best doctors near you</h1>
// //           <p className="text-xl mb-6">Book appointments with top-rated doctors, specialists, and surgeons</p>
// //           <div className="flex flex-wrap gap-4">
// //             <Link href="/doctors" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
           
// //                 Find Doctors

// //             </Link>
// //             <Link href="/hospitals" className="border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
          
// //                 Find Hospitals
            
// //             </Link>
// //           </div>
// //         </div>
// //         <div className="hidden md:block">
// //           <img 
// //             src="/hero-image.png" 
// //             alt="Doctor with patient" 
// //             className="w-full h-auto rounded-lg"
// //           />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // components/HeroSection.js
// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export default function HeroSection() {
//   return (
//     <motion.section 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.7 }}
//       className="relative bg-gradient-to-br from-teal-500 to-blue-700 text-white pt-24 pb-16 px-4 overflow-hidden"
//     >
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
//         <motion.div 
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//             Your Health, Our Priority
//           </h1>
//           <p className="text-xl mb-8 text-gray-100">
//             Comprehensive healthcare solutions at your fingertips
//           </p>
//           <div className="flex space-x-4">
//             {['Find Doctors', 'Find Hospitals'].map((btn, index) => (
//               <motion.div
//                 key={btn}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link 
//                   href={`/${btn.toLowerCase().replace(' ', '-')}`}
//                   className={`
//                     ${index === 0 
//                       ? 'bg-white text-teal-500' 
//                       : 'border-2 border-white text-white'
//                     } 
//                     px-6 py-3 rounded-full font-semibold transition hover:shadow-lg
//                   `}
//                 >
//                   {btn}
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div 
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="hidden md:block relative"
//         >
//           <motion.img 
//             src="/banner.jpg" 
//             alt="Doctor with patient"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="w-full h-auto rounded-2xl shadow-2xl"
//           />
//         </motion.div>
//       </div>

//       <motion.div 
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ scale: 1, opacity: 0.1 }}
//         transition={{ duration: 1 }}
//         className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full"
//       />
//     </motion.section>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Calendar } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 leading-tight">
              Your Health Is Our <span className="text-blue-600">Top Priority</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              Book appointments with the best doctors and specialists in your area and get the care you deserve.
            </p>
            
            <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for doctors, specialties..."
                    className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </button>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="text-xs text-gray-500">Popular:</div>
                <Link href="/doctors/cardiology" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100">
                  Cardiology
                </Link>
                <Link href="/doctors/dentist" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100">
                  Dentist
                </Link>
                <Link href="/doctors/orthopedic" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100">
                  Orthopedic
                </Link>
                <Link href="/doctors/pediatric" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100">
                  Pediatric
                </Link>
              </div>
            </div>
            
            <div className="mt-6 flex items-center text-sm text-gray-500">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span>More than 1000+ appointments booked last week</span>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md h-64 md:h-96">
              <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-blue-500 rounded-2xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-indigo-500 rounded-2xl opacity-20"></div>
              <div className="absolute inset-4 bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-full w-full flex items-center justify-center">
                  <Image
                    src="/doctor-with-patient.jpeg" 
                    alt="Doctor with patient"
                    width={400}
                    height={300}
                    className="object-cover h-full w-full"
                    unoptimized 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}