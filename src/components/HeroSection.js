// // // // import Link from 'next/link';

// // // // export default function HeroSection() {
// // // //   return (
// // // //     <section className="bg-blue-600 text-white py-12 px-4">
// // // //       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
// // // //         <div>
// // // //           <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the best doctors near you</h1>
// // // //           <p className="text-xl mb-6">Book appointments with top-rated doctors, specialists, and surgeons</p>
// // // //           <div className="flex flex-wrap gap-4">
// // // //             <Link href="/doctors" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
           
// // // //                 Find Doctors

// // // //             </Link>
// // // //             <Link href="/hospitals" className="border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
          
// // // //                 Find Hospitals
            
// // // //             </Link>
// // // //           </div>
// // // //         </div>
// // // //         <div className="hidden md:block">
// // // //           <img 
// // // //             src="/hero-image.png" 
// // // //             alt="Doctor with patient" 
// // // //             className="w-full h-auto rounded-lg"
// // // //           />
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }

// // // // components/HeroSection.js
// // // 'use client';

// // // import Link from 'next/link';
// // // import { motion } from 'framer-motion';

// // // export default function HeroSection() {
// // //   return (
// // //     <motion.section 
// // //       initial={{ opacity: 0 }}
// // //       animate={{ opacity: 1 }}
// // //       transition={{ duration: 0.7 }}
// // //       className="relative bg-gradient-to-br from-teal-500 to-blue-700 text-white pt-24 pb-16 px-4 overflow-hidden"
// // //     >
// // //       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
// // //         <motion.div 
// // //           initial={{ x: -50, opacity: 0 }}
// // //           animate={{ x: 0, opacity: 1 }}
// // //           transition={{ duration: 0.6 }}
// // //         >
// // //           <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
// // //             Your Health, Our Priority
// // //           </h1>
// // //           <p className="text-xl mb-8 text-gray-100">
// // //             Comprehensive healthcare solutions at your fingertips
// // //           </p>
// // //           <div className="flex space-x-4">
// // //             {['Find Doctors', 'Find Hospitals'].map((btn, index) => (
// // //               <motion.div
// // //                 key={btn}
// // //                 whileHover={{ scale: 1.05 }}
// // //                 whileTap={{ scale: 0.95 }}
// // //               >
// // //                 <Link 
// // //                   href={`/${btn.toLowerCase().replace(' ', '-')}`}
// // //                   className={`
// // //                     ${index === 0 
// // //                       ? 'bg-white text-teal-500' 
// // //                       : 'border-2 border-white text-white'
// // //                     } 
// // //                     px-6 py-3 rounded-full font-semibold transition hover:shadow-lg
// // //                   `}
// // //                 >
// // //                   {btn}
// // //                 </Link>
// // //               </motion.div>
// // //             ))}
// // //           </div>
// // //         </motion.div>

// // //         <motion.div 
// // //           initial={{ x: 50, opacity: 0 }}
// // //           animate={{ x: 0, opacity: 1 }}
// // //           transition={{ duration: 0.6 }}
// // //           className="hidden md:block relative"
// // //         >
// // //           <motion.img 
// // //             src="/banner.jpg" 
// // //             alt="Doctor with patient"
// // //             initial={{ scale: 0.9, opacity: 0 }}
// // //             animate={{ scale: 1, opacity: 1 }}
// // //             transition={{ duration: 0.6, delay: 0.3 }}
// // //             className="w-full h-auto rounded-2xl shadow-2xl"
// // //           />
// // //         </motion.div>
// // //       </div>

// // //       <motion.div 
// // //         initial={{ scale: 0, opacity: 0 }}
// // //         animate={{ scale: 1, opacity: 0.1 }}
// // //         transition={{ duration: 1 }}
// // //         className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full"
// // //       />
// // //     </motion.section>
// // //   );
// // // }

// // 'use client';

// // import Image from 'next/image';
// // import Link from 'next/link';
// // import { Search, MapPin, Calendar } from 'lucide-react';

// // export default function HeroSection() {
// //   return (
// //     <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
// //           <div className="order-2 md:order-1">
// //             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 leading-tight">
// //               Your Health Is Our <span className="text-blue-600">Top Priority</span>
// //             </h1>
// //             <p className="mt-4 text-lg text-gray-600 max-w-lg">
// //               Book appointments with the best doctors and specialists in your area and get the care you deserve.
// //             </p>
            
// //             <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
// //               <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
// //                 <div className="relative flex-grow">
// //                   <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search for doctors, specialties..."
// //                     className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>
// //                 <div className="relative flex-grow">
// //                   <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     placeholder="Location"
// //                     className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>
// //                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center">
// //                   <Search className="h-5 w-5 mr-2" />
// //                   Search
// //                 </button>
// //               </div>
              
// //               <div className="mt-4 flex flex-wrap gap-2">
// //                 <div className="text-xs text-gray-500">Popular:</div>
// //                 <Link href="/doctors/cardiology" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100">
// //                   Cardiology
// //                 </Link>
// //                 <Link href="/doctors/dentist" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100">
// //                   Dentist
// //                 </Link>
// //                 <Link href="/doctors/orthopedic" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100">
// //                   Orthopedic
// //                 </Link>
// //                 <Link href="/doctors/pediatric" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100">
// //                   Pediatric
// //                 </Link>
// //               </div>
// //             </div>
            
// //             <div className="mt-6 flex items-center text-sm text-gray-500">
// //               <Calendar className="h-5 w-5 text-blue-600 mr-2" />
// //               <span>More than 1000+ appointments booked last week</span>
// //             </div>
// //           </div>
          
// //           <div className="order-1 md:order-2 flex justify-center">
// //             <div className="relative w-full max-w-md h-64 md:h-96">
// //               <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-blue-500 rounded-2xl opacity-20"></div>
// //               <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-indigo-500 rounded-2xl opacity-20"></div>
// //               <div className="absolute inset-4 bg-white rounded-2xl shadow-xl overflow-hidden">
// //                 <div className="h-full w-full flex items-center justify-center">
// //                   <Image
// //                     src="/doctor-with-patient.jpeg" 
// //                     alt="Doctor with patient"
// //                     width={400}
// //                     height={300}
// //                     className="object-cover h-full w-full"
// //                     unoptimized 
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Search, MapPin, Calendar, Clock, Phone, Mail } from 'lucide-react';
// import { useState, useEffect } from 'react';

// export default function HeroSection() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [location, setLocation] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch('https://practo-backend.vercel.app/api/doctor/fetchAll');
//         if (!response.ok) {
//           throw new Error('Failed to fetch doctors');
//         }
//         const data = await response.json();
//         setDoctors(data.doctors);
//         setFilteredDoctors(data.doctors);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleSearch = () => {
//     setHasSearched(true);
//     const filtered = doctors.filter(doctor => {
//       const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
//       const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
//                            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            doctor.supSpeciality?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesLocation = location === '' || 
//                              doctor.city?.toLowerCase().includes(location.toLowerCase()) ||
//                              doctor.hospitalAddress?.toLowerCase().includes(location.toLowerCase());
//       return matchesSearch && matchesLocation;
//     });
//     setFilteredDoctors(filtered);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const formatAvailability = (doctor) => {
//     if (!doctor.available) return 'Not specified';
    
//     let availability = '';
//     if (doctor.available.days?.length > 0) {
//       availability += doctor.available.days.join(', ');
//     }
//     if (doctor.available.time) {
//       availability += availability ? ` (${doctor.available.time})` : doctor.available.time;
//     }
//     return availability || 'Not specified';
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <div className="order-2 md:order-1">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 leading-tight">
//               Your Health Is Our <span className="text-blue-600">Top Priority</span>
//             </h1>
//             <p className="mt-4 text-lg text-gray-600 max-w-lg">
//               Book appointments with the best doctors and specialists in your area and get the care you deserve.
//             </p>
            
//             <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
//               <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
//                 <div className="relative flex-grow">
//                   <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search for doctors, specialties..."
//                     className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                   />
//                 </div>
//                 <div className="relative flex-grow">
//                   <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Location City"
//                     className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                   />
//                 </div>
//                 <button 
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center"
//                   onClick={handleSearch}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     'Searching...'
//                   ) : (
//                     <>
//                       <Search className="h-5 w-5 mr-2" />
//                       Search
//                     </>
//                   )}
//                 </button>
//               </div>
              
//               <div className="mt-4 flex flex-wrap gap-2">
//                 <div className="text-xs text-gray-500">Popular:</div>
//                 {['Cardiology', 'Pediatric', 'Orthopedic', 'Dermatology'].map((specialty) => (
//                   <button 
//                     key={specialty}
//                     className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100"
//                     onClick={() => {
//                       setSearchTerm(specialty);
//                       handleSearch();
//                     }}
//                   >
//                     {specialty}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="mt-6 flex items-center text-sm text-gray-500">
//               <Calendar className="h-5 w-5 text-blue-600 mr-2" />
//               <span>More than 1000+ appointments booked last week</span>
//             </div>
//           </div>
          
//           <div className="order-1 md:order-2 flex justify-center">
//             <div className="relative w-full max-w-md h-64 md:h-96">
//               <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-blue-500 rounded-2xl opacity-20"></div>
//               <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-indigo-500 rounded-2xl opacity-20"></div>
//               <div className="absolute inset-4 bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="h-full w-full flex items-center justify-center">
//                   <Image
//                     src="/doctor-with-patient.jpeg" 
//                     alt="Doctor with patient"
//                     width={400}
//                     height={300}
//                     className="object-cover h-full w-full"
//                     unoptimized 
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Results Section - Only shown after search */}
//         {hasSearched && (
//           <div className="mt-12">
//             {error && (
//               <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
//                 {error}
//               </div>
//             )}

//             {filteredDoctors.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredDoctors.map((doctor) => (
//                   <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//                     <div className="p-6">
//                       <div className="flex items-start space-x-4">
//                         <div className="flex-shrink-0">
//                           <Image
//                             src={doctor.profileImage || "/doctor-placeholder.jpg"}
//                             alt={`${doctor.firstName} ${doctor.lastName}`}
//                             width={80}
//                             height={80}
//                             className="rounded-full h-20 w-20 object-cover"
//                             unoptimized
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="text-lg font-semibold text-gray-900 truncate">
//                             Dr. {doctor.firstName} {doctor.lastName}
//                           </h3>
//                           <p className="text-blue-600">
//                             {doctor.specialty}
//                             {doctor.supSpeciality && `, ${doctor.supSpeciality}`}
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             <MapPin className="inline h-4 w-4 mr-1" />
//                             {doctor.hospital}, {doctor.city}
//                           </p>
//                           <p className="text-sm text-gray-500 mt-1">
//                             <Clock className="inline h-4 w-4 mr-1" />
//                             {formatAvailability(doctor)}
//                           </p>
//                           <div className="mt-2 flex items-center space-x-2">
//                             {doctor.phone && (
//                               <a href={`tel:${doctor.phone}`} className="text-gray-500 hover:text-blue-600">
//                                 <Phone className="h-4 w-4" />
//                               </a>
//                             )}
//                             {doctor.email && (
//                               <a href={`mailto:${doctor.email}`} className="text-gray-500 hover:text-blue-600">
//                                 <Mail className="h-4 w-4" />
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="mt-4">
//                         {doctor.qualifications?.length > 0 && (
//                           <div className="text-sm text-gray-600 mb-2">
//                             <span className="font-medium">Qualifications:</span> {doctor.qualifications.join(', ')}
//                           </div>
//                         )}
//                         {doctor.experience && (
//                           <div className="text-sm text-gray-600">
//                             <span className="font-medium">Experience:</span> {doctor.experience} years
//                           </div>
//                         )}
//                       </div>
//                       <div className="mt-4 flex justify-between items-center">
//                         <span className="text-gray-700 font-medium">
//                           {doctor.consultantFee ? `₹${doctor.consultantFee} fee` : 'Fee not specified'}
//                         </span>
//                         <Link 
//                           href={`/doctors/${doctor._id}`}
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
//                         >
//                           Book Appointment
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               !isLoading && (
//                 <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg text-center">
//                   No doctors found matching your search criteria.
//                 </div>
//               )
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Calendar, Clock, Phone, Mail, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const searchRef = useRef(null);
  const locationRef = useRef(null);

  const commonCities = [
    'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Hyderabad', 
    'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 
    'Nagpur', 'Indore', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara',
    'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut',
    'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi', 'Srinagar',
    'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
    'Ranchi', 'Haora', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
    'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh',
    'Thiruvananthapuram', 'Solapur', 'Hubballi-Dharwad', 'Tiruchirappalli',
    'Bareilly', 'Mysore', 'Tiruppur', 'Gurgaon', 'Aligarh', 'Jalandhar',
    'Bhubaneswar', 'Salem', 'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur',
    'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai',
    'Cuttack', 'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun',
    'Durgapur', 'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer',
    'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri',
    'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli-Miraj & Kupwad', 'Mangalore',
    'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya',
    'Jalgaon', 'Udaipur', 'Maheshtala'
  ];

  const commonSpecialties = [
    'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics',
    'Neurology', 'Gynecology', 'Urology', 'Dentistry',
    'Ophthalmology', 'Psychiatry', 'Endocrinology', 'Gastroenterology'
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://practo-backend.vercel.app/api/doctor/fetchAll');
        if (!response.ok) throw new Error('Failed to fetch doctors');
        const data = await response.json();
        setDoctors(data.doctors);
        setFilteredDoctors(data.doctors);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const lower = searchTerm.toLowerCase();
      const matched = commonSpecialties.filter(spec => spec.toLowerCase().includes(lower));
      setSuggestions(matched);
      setShowSuggestions(matched.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (location.length > 0) {
      const lower = location.toLowerCase().trim();
      const citySet = new Set();
      
      // First, get cities from doctors data
      if (doctors.length > 0) {
        doctors.forEach(doctor => {
          if (doctor.city && doctor.city.toLowerCase().includes(lower)) {
            citySet.add(doctor.city);
          }
        });
      }
      
      // Also add matching cities from common cities list
      commonCities.forEach(city => {
        if (city.toLowerCase().includes(lower)) {
          citySet.add(city);
        }
      });

      const matched = Array.from(citySet).sort().slice(0, 8);
      setLocationSuggestions(matched);
      setShowLocationSuggestions(matched.length > 0);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  }, [location, doctors]);

  const handleSearch = () => {
    setHasSearched(true);
    const filtered = doctors.filter(doctor => {
      const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.supSpeciality?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = location === '' ||
        doctor.city?.toLowerCase().includes(location.toLowerCase()) ||
        doctor.hospitalAddress?.toLowerCase().includes(location.toLowerCase());

      return matchesSearch && matchesLocation;
    });

    setFilteredDoctors(filtered);
    setShowSuggestions(false);
    setShowLocationSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setTimeout(() => handleSearch(), 100);
  };

  const handleLocationSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setShowLocationSuggestions(false);
    setTimeout(() => handleSearch(), 100);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredDoctors(doctors);
    setHasSearched(false);
    setShowSuggestions(false);
  };

  const clearLocation = () => {
    setLocation('');
    setShowLocationSuggestions(false);
    if (hasSearched) {
      setTimeout(() => handleSearch(), 100);
    }
  };

  const formatAvailability = (doctor) => {
    if (!doctor.available) return 'Not specified';
    let availability = '';
    if (doctor.available.days?.length > 0) {
      availability += doctor.available.days.join(', ');
    }
    if (doctor.available.time) {
      availability += availability ? ` (${doctor.available.time})` : doctor.available.time;
    }
    return availability || 'Not specified';
  };

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

            {/* Expanded Search Container */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                {/* Search Box - Now with more flexible width */}
                <div className="relative flex-1 min-w-[200px]" ref={searchRef}>
                  <div className="relative">
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for doctors, specialties..."
                      className="pl-10 pr-10 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
                    />
                    {searchTerm && (
                      <button 
                        onClick={clearSearch}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center">
                            <Search className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{suggestion}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Box - Now with autocomplete */}
                <div className="relative flex-1 min-w-[200px]" ref={locationRef}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location"
                      className="pl-10 pr-10 py-3 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => location.length > 0 && setShowLocationSuggestions(locationSuggestions.length > 0)}
                    />
                    {location && (
                      <button 
                        onClick={clearLocation}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  {showLocationSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {locationSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleLocationSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{suggestion}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Button - Fixed width but more compact */}
                <button
                  className="w-full md:w-[120px] bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : (<><Search className="h-5 w-5 mr-1" />Search</>)}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="text-xs text-gray-500">Popular:</div>
                {['Cardiology', 'Pediatric', 'Orthopedic', 'Dermatology'].map((specialty) => (
                  <button
                    key={specialty}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100"
                    onClick={() => {
                      setSearchTerm(specialty);
                      handleSearch();
                    }}
                  >
                    {specialty}
                  </button>
                ))}
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

        {hasSearched && (
          <div className="mt-12">
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>}

            {filteredDoctors.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <div key={doctor._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <Image
                              src={doctor.profileImage || "/doctor-placeholder.jpg"}
                              alt={`${doctor.firstName} ${doctor.lastName}`}
                              width={80}
                              height={80}
                              className="rounded-full h-20 w-20 object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              Dr. {doctor.firstName} {doctor.lastName}
                            </h3>
                            <p className="text-blue-600">
                              {doctor.specialty}{doctor.supSpeciality && `, ${doctor.supSpeciality}`}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              <MapPin className="inline h-4 w-4 mr-1" />
                              {doctor.hospital}, {doctor.city}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              <Clock className="inline h-4 w-4 mr-1" />
                              {formatAvailability(doctor)}
                            </p>
                            <div className="mt-2 flex items-center space-x-2">
                              {doctor.phone && (
                                <a href={`tel:${doctor.phone}`} className="text-gray-500 hover:text-blue-600">
                                  <Phone className="h-4 w-4" />
                                </a>
                              )}
                              {doctor.email && (
                                <a href={`mailto:${doctor.email}`} className="text-gray-500 hover:text-blue-600">
                                  <Mail className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          {doctor.qualifications?.length > 0 && (
                            <div className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Qualifications:</span> {doctor.qualifications.join(', ')}
                            </div>
                          )}
                          {doctor.experience && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Experience:</span> {doctor.experience} years
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-gray-700 font-medium">
                            {doctor.consultantFee ? `₹${doctor.consultantFee} fee` : 'Fee not specified'}
                          </span>
                          <Link href={`/doctors/${doctor._id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                            Book Appointment
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              !isLoading && (
                <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg text-center">
                  No doctors found matching your search criteria. Try different keywords.
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}