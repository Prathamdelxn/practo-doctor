// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Star, MapPin, Clock, Award, HeartPulse, Calendar, ChevronLeft, User, MessageCircle, Phone, Mail, Globe, X } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import Navbar from '@/components/Navbar';

// export default function DoctorDetailsPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [doctor, setDoctor] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDay, setSelectedDay] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const [selectedTime, setSelectedTime] = useState('');
//   const [patientName, setPatientName] = useState('');
//   const [patientPhone, setPatientPhone] = useState('');
//   const [patientEmail, setPatientEmail] = useState('');
//   const [patientNotes, setPatientNotes] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [userData, setUser] = useState();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userStr = localStorage.getItem('user');
//     if (userStr) {
//       try {
//         const data = JSON.parse(userStr);
//         setUser(data);
//         setPatientEmail(data.email);
//         setPatientName(data.name);
//       } catch (err) {
//         console.error("Error parsing user data", err);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         setIsLoading(true);
//         let res = await fetch(`https://practo-backend.vercel.app/api/doctor/fetchOne/${id}`);
        
//         if (!res.ok) {
//           console.log('Specific endpoint failed, trying fetchAll...');
//           const allRes = await fetch('https://practo-backend.vercel.app/api/doctor/fetchAll');
          
//           if (!allRes.ok) {
//             throw new Error(`API request failed with status ${allRes.status}`);
//           }
          
//           const data = await allRes.json();
//           const foundDoctor = data.doctors?.find(doc => doc._id === id);
          
//           if (!foundDoctor) {
//             throw new Error('Doctor not found in fetchAll response');
//           }
          
//           setDoctor(foundDoctor);
//         } else {
//           const data = await res.json();
//           if (!data.doctor) {
//             throw new Error('Doctor data not found in response');
//           }
//           setDoctor(data.doctor);
//         }
//       } catch (err) {
//         console.error('Error fetching doctor:', err.message);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchDoctor();
//     }
//   }, [id]);

//   useEffect(() => {
//     if (doctor?.available?.days?.length) {
//       const today = new Date().toLocaleString('en-us', { weekday: 'long' });
//       setSelectedDay(
//         doctor.available.days.includes(today)
//           ? today
//           : doctor.available.days[0]
//       );
//     }
//   }, [doctor]);

//   useEffect(() => {
//     setSelectedDate('');
//   }, [selectedDay]);

//   const getAvailableDates = () => {
//     if (!selectedDay) return [];
    
//     const today = new Date();
//     const availableDates = [];
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
//     for (let i = 0; i < 30; i++) {
//       const date = new Date();
//       date.setDate(today.getDate() + i);
//       const dayName = daysOfWeek[date.getDay()];
      
//       if (dayName === selectedDay) {
//         availableDates.push(date.toISOString().split('T')[0]);
//       }
//     }
    
//     return availableDates;
//   };

//   const generateTimeSlots = () => {
//     try {
//       if (!doctor?.available?.time) return [];
      
//       const timeString = doctor.available.time || '9AM to 5PM';
//       const [startStr, endStr] = timeString.split(' to ');
      
//       if (!startStr || !endStr) return [];
      
//       const parseTime = (timeStr) => {
//         const time = timeStr.trim();
//         const isPM = time.toLowerCase().includes('pm');
//         const timeNum = parseInt(time.replace(/[^0-9]/g, ''));
        
//         if (isPM && timeNum < 12) {
//           return timeNum + 12;
//         } else if (!isPM && timeNum === 12) {
//           return 0;
//         }
//         return timeNum;
//       };
      
//       const startHour = parseTime(startStr);
//       const endHour = parseTime(endStr);
      
//       if (isNaN(startHour) || isNaN(endHour)) return [];
      
//       const slots = [];
//       let currentHour = startHour;
//       let currentMin = 0;
      
//       while (currentHour < endHour || (currentHour === endHour && currentMin === 0)) {
//         const displayHour = currentHour % 12 || 12;
//         const ampm = currentHour < 12 || currentHour === 24 ? 'AM' : 'PM';
//         const timeString = `${displayHour}:${currentMin.toString().padStart(2, '0')} ${ampm}`;
        
//         slots.push(timeString);
        
//         currentMin += 30;
//         if (currentMin >= 60) {
//           currentMin -= 60;
//           currentHour += 1;
//         }
//       }
      
//       return slots;
//     } catch (error) {
//       console.error('Error generating time slots:', error);
//       return [];
//     }
//   };

//   const timeSlots = generateTimeSlots();

//   // const handleBookAppointment = async (e) => {
//   //   e.preventDefault();
//   //   setIsSubmitting(true);
//   //   try {
//   //     await new Promise(resolve => setTimeout(resolve, 1500));
      
//   //     setBookingSuccess(true);
//   //     setTimeout(() => {
//   //       setPatientName('');
//   //       setPatientPhone('');
//   //       setPatientEmail('');
//   //       setPatientNotes('');
//   //       setSelectedDate('');
//   //       setSelectedTime('');
//   //       setIsBookingModalOpen(false);
//   //       setBookingSuccess(false);
//   //     }, 2000);
//   //   } catch (err) {
//   //     console.error('Error booking appointment:', err);
//   //     alert('Failed to book appointment. Please try again.');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

// const handleBookAppointment = async (e) => {
  
    
//     if (!userData) {
//       // Redirect to login page with a return URL
//       router.push(`/login`);
//       return;
//     }
//   e.preventDefault();
//   setIsSubmitting(true);

//   try {
//     const appointmentData = {
//       doctorId: doctor._id,
      
//       doctorName: `${doctor.firstName} ${doctor.lastName}`,
//       doctorFees: doctor.consultantFee,
//       appointmentDate: selectedDate,
//       day: new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }),
//       time: selectedTime,
//       patientName,
//       patientNumber: patientPhone,
//       patientEmail,
//       patientNote: patientNotes,
//       patientId: userData.id,
//     };

//     console.log("Appointment Data:", appointmentData);

//     const response = await fetch('https://practo-backend.vercel.app/api/appointment/create', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(appointmentData),
//     });

//     const result = await response.json();

//     if (!response.ok) throw new Error(result.message || 'Failed to create appointment');

//     setBookingSuccess(true);
//     setTimeout(() => {
//       setPatientName('');
//       setPatientPhone('');
//       setPatientEmail('');
//       setPatientNotes('');
//       setSelectedDate('');
//       setSelectedTime('');
//       setIsBookingModalOpen(false);
//       setBookingSuccess(false);
//     }, 2000);

//   } catch (err) {
//     console.error('Error booking appointment:', err);
//     alert(err.message || 'Failed to book appointment. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };



//   const reviews = [
//     { name: "Sarah Johnson", rating: 5, comment: "Excellent doctor! Very thorough and caring.", date: "2 weeks ago" },
//     { name: "Michael Chen", rating: 5, comment: "Professional service and accurate diagnosis. Highly recommended!", date: "1 month ago" },
//     { name: "Emma Davis", rating: 4, comment: "Great experience. The doctor explained everything clearly.", date: "3 weeks ago" }
//   ];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="animate-pulse space-y-8">
//             <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="w-full md:w-1/3 space-y-4">
//                 <div className="h-64 bg-gray-200 rounded-2xl"></div>
//                 <div className="h-8 bg-gray-200 rounded-lg"></div>
//                 <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
//               </div>
//               <div className="w-full md:w-2/3 space-y-6">
//                 <div className="h-10 bg-gray-200 rounded-lg w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
//                 <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
//                 <div className="h-32 bg-gray-200 rounded-2xl"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !doctor) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
//             <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
//               <HeartPulse className="h-10 w-10 text-red-500" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900">{error || 'Doctor not found'}</h3>
//             <button
//               onClick={() => router.push('/doctors')}
//               className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
//             >
//               <ChevronLeft className="h-4 w-4 mr-2" />
//               Back to Doctors
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const simulatedRating = Math.min(5, Math.max(1, Math.floor(doctor.experience / 2)));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <button
//             onClick={() => router.push('/doctors')}
//             className="mb-4 lg:mb-0 lg:ml-0 text-gray-600 hover:text-blue-600 transition-colors duration-200 self-start p-2 rounded-full hover:bg-white/50"
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </button>

//           <div className="lg:w-1/3 flex flex-col">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-6"
//             >
//               <div className="flex flex-col items-center">
//                 <div className="relative">
//                   <div className="h-36 w-36 rounded-2xl overflow-hidden border-4 border-blue-100 mb-6 relative shadow-lg">
//                     {doctor.profileImage ? (
//                       <img
//                         src={doctor.profileImage}
//                         alt={`${doctor.firstName} ${doctor.lastName}`}
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       <div className="h-full w-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-4xl">
//                         {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
//                       </div>
//                     )}
//                   </div>
//                   <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
//                 </div>
                
//                 <h2 className="text-2xl font-bold text-gray-900 text-center capitalize mb-2">
//                   Dr. {doctor.firstName} {doctor.lastName}
//                 </h2>
                
//                 <p className="text-blue-600 text-lg font-medium mb-1">{doctor.specialty}</p>
                
//                 {doctor.supSpeciality && (
//                   <p className="text-sm text-gray-500 text-center mb-4">({doctor.supSpeciality})</p>
//                 )}
                
//                 <div className="flex items-center mb-2">
//                   {Array(simulatedRating).fill().map((_, i) => (
//                     <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
//                   ))}
//                   <span className="ml-2 text-gray-700 text-base font-medium">
//                     {simulatedRating.toFixed(1)}
//                   </span>
//                   <span className="ml-1 text-gray-500 text-sm">(127 reviews)</span>
//                 </div>
                
//                 <p className="text-gray-600 text-sm mb-6 bg-gray-50 px-3 py-1 rounded-full">
//                   {doctor.experience}+ Years Experience
//                 </p>
                
//                 <div className="w-full space-y-4">
//                   <div className="flex items-start p-3 bg-blue-50 rounded-xl">
//                     <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div className="ml-3">
//                       <h4 className="text-sm font-semibold text-gray-900">Qualifications</h4>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         {doctor.qualifications.join(', ')}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start p-3 bg-green-50 rounded-xl">
//                     <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
//                     <div className="ml-3">
//                       <h4 className="text-sm font-semibold text-gray-900">Location</h4>
//                       <p className="text-sm text-gray-600 leading-relaxed">
//                         {doctor.hospital}, {doctor.hospitalAddress}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start p-3 bg-purple-50 rounded-xl">
//                     <Clock className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
//                     <div className="ml-3">
//                       <h4 className="text-sm font-semibold text-gray-900">Availability</h4>
//                       <p className="text-sm text-gray-600">
//                         {doctor.available?.time || 'Not specified'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={() => setIsBookingModalOpen(true)}
//                   className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//                 >
//                   Book Appointment
//                 </button>
//               </div>
//             </motion.div>
//           </div>

//           <div className="lg:w-2/3 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded pr-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="space-y-6"
//             >
//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                   <User className="h-6 w-6 mr-3 text-blue-600" />
//                   About Dr. {doctor.lastName}
//                 </h3>
//                 <p className="text-gray-700 text-base leading-relaxed">
//                   {doctor.bio || `Dr. ${doctor.lastName} is a highly skilled ${doctor.specialty} with over ${doctor.experience} years of experience. ${doctor.gender === 'female' ? 'She' : 'He'} specializes in ${doctor.supSpeciality || doctor.specialty} and provides exceptional care at ${doctor.hospital}. Known for a patient-centered approach and commitment to excellence in healthcare delivery.`}
//                 </p>
//               </div>

//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                   <Calendar className="h-6 w-6 mr-3 text-blue-600" />
//                   Availability & Booking
//                 </h3>

//                 <div>
//                   <h4 className="text-lg font-semibold text-gray-900 mb-4">Select a Day</h4>
//                   <div className="flex flex-wrap gap-3">
//                     {doctor.available?.days?.map(day => (
//                       <button
//                         key={day}
//                         onClick={() => setSelectedDay(day)}
//                         className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
//                           selectedDay === day
//                             ? 'bg-blue-600 text-white shadow-lg transform scale-105'
//                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
//                         }`}
//                       >
//                         {day}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                   <Phone className="h-6 w-6 mr-3 text-green-600" />
//                   Contact Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div className="flex items-center p-4 bg-green-50 rounded-xl">
//                     <Phone className="h-6 w-6 text-green-600 mr-3" />
//                     <div>
//                       <p className="text-sm text-gray-600">Phone</p>
//                       <p className="font-semibold text-gray-900">+91 98765 43210</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center p-4 bg-blue-50 rounded-xl">
//                     <Mail className="h-6 w-6 text-blue-600 mr-3" />
//                     <div>
//                       <p className="text-sm text-gray-600">Email</p>
//                       <p className="font-semibold text-gray-900">doctor@hospital.com</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center p-4 bg-purple-50 rounded-xl">
//                     <Globe className="h-6 w-6 text-purple-600 mr-3" />
//                     <div>
//                       <p className="text-sm text-gray-600">Website</p>
//                       <p className="font-semibold text-gray-900">www.hospital.com</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
//                 <h3 className="text-xl font-bold mb-6 flex items-center">
//                   <HeartPulse className="h-6 w-6 mr-3" />
//                   Consultation Fee
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-3xl font-bold">₹{doctor.consultantFee}</p>
//                     <p className="text-blue-100 text-sm">Per consultation</p>
//                     <p className="text-blue-100 text-xs mt-1">*Includes digital prescription</p>
//                   </div>
//                   <button
//                     onClick={() => setIsBookingModalOpen(true)}
//                     className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//                   <MessageCircle className="h-6 w-6 mr-3 text-purple-600" />
//                   Patient Reviews
//                 </h3>
//                 <div className="space-y-6">
//                   {reviews.map((review, index) => (
//                     <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center">
//                           <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
//                             {review.name.split(' ').map(n => n[0]).join('')}
//                           </div>
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{review.name}</h4>
//                             <div className="flex items-center">
//                               {Array(review.rating).fill().map((_, i) => (
//                                 <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                         <span className="text-sm text-gray-500">{review.date}</span>
//                       </div>
//                       <p className="text-gray-700 italic">"{review.comment}"</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {isBookingModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   {bookingSuccess ? 'Appointment Booked!' : 'Book Appointment'}
//                 </h3>
//                 <button 
//                   onClick={() => {
//                     setIsBookingModalOpen(false);
//                     setBookingSuccess(false);
//                   }}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               {bookingSuccess ? (
//                 <div className="text-center py-8">
//                   <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
//                     <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">Appointment Confirmed!</h3>
//                   <p className="text-gray-600 mb-6">
//                     Your appointment with Dr. {doctor.firstName} {doctor.lastName} has been successfully booked.
//                   </p>
//                   <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
//                     <h4 className="font-semibold text-gray-900 mb-2">Appointment Details</h4>
//                     <p className="text-sm text-gray-600">
//                       <span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString('en-US', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </p>
//                     <p className="text-sm text-gray-600"><span className="font-medium">Day:</span> {selectedDay}</p>
//                     <p className="text-sm text-gray-600"><span className="font-medium">Time:</span> {selectedTime}</p>
//                     <p className="text-sm text-gray-600"><span className="font-medium">Fee:</span> ₹{doctor.consultantFee}</p>
//                   </div>
//                   <button
//                     onClick={() => setIsBookingModalOpen(false)}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
//                   >
//                     Close
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="mb-4">
//                     <h4 className="font-medium text-gray-900 mb-2">
//                       With Dr. {doctor.firstName} {doctor.lastName}
//                     </h4>
//                     <p className="text-sm text-gray-600">{doctor.specialty}</p>
//                     {doctor.supSpeciality && (
//                       <p className="text-sm text-gray-500">({doctor.supSpeciality})</p>
//                     )}
//                   </div>

//                   <form onSubmit={handleBookAppointment}>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Select Day
//                         </label>
//                         <select
//                           value={selectedDay}
//                           onChange={(e) => setSelectedDay(e.target.value)}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                           required
//                         >
//                           {doctor.available?.days?.map((day) => (
//                             <option key={day} value={day}>
//                               {day}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Select Date
//                         </label>
//                         <select
//                           value={selectedDate}
//                           onChange={(e) => setSelectedDate(e.target.value)}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                           required
//                         >
//                           <option value="">Select a date</option>
//                           {getAvailableDates().map((date) => (
//                             <option key={date} value={date}>
//                               {new Date(date).toLocaleDateString('en-US', {
//                                 weekday: 'long',
//                                 year: 'numeric',
//                                 month: 'long',
//                                 day: 'numeric'
//                               })}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-3">
//                           Available Time Slots
//                         </label>
//                         {timeSlots.length > 0 ? (
//                           <div className="grid grid-cols-3 gap-3">
//                             {timeSlots.map((time) => (
//                               <button
//                                 key={time}
//                                 type="button"
//                                 onClick={() => setSelectedTime(time)}
//                                 className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
//                                   selectedTime === time
//                                     ? 'bg-blue-600 text-white shadow-md'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                                 }`}
//                               >
//                                 {time}
//                               </button>
//                             ))}
//                           </div>
//                         ) : (
//                           <p className="text-sm text-gray-500 py-2">No available time slots for this day</p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Your Full Name
//                         </label>
//                         <input
//                           type="text"
//                           value={patientName}
//                           onChange={(e) => setPatientName(e.target.value)}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Phone Number
//                         </label>
//                         <input
//                           type="tel"
//                           value={patientPhone}
//                           onChange={(e) => setPatientPhone(e.target.value)}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           value={patientEmail}
//                           onChange={(e) => setPatientEmail(e.target.value)}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Notes (Optional)
//                         </label>
//                         <textarea
//                           value={patientNotes}
//                           onChange={(e) => setPatientNotes(e.target.value)}
//                           rows={3}
//                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                           placeholder="Any symptoms or additional information"
//                         />
//                       </div>

//                       <div className="pt-4 border-t border-gray-200">
//                         <div className="flex justify-between items-center mb-4">
//                           <span className="text-sm font-medium text-gray-700">Consultation Fee</span>
//                           <span className="text-lg font-bold text-gray-900">₹{doctor.consultantFee}</span>
//                         </div>
//                         <button
//                           type="submit"
//                           disabled={isSubmitting || !selectedTime || !selectedDate}
//                           className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
//                             !selectedTime || !selectedDate ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800'
//                           }`}
//                         >
//                           {isSubmitting ? (
//                             <>
//                               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                               </svg>
//                               Processing...
//                             </>
//                           ) : (
//                             'Confirm Appointment'
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, MapPin, Clock, Award, HeartPulse, Calendar, ChevronLeft, User, MessageCircle, Phone, Mail, Globe, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [userData, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const data = JSON.parse(userStr);
        setUser(data);
        setPatientEmail(data.email);
        setPatientName(data.name);
      } catch (err) {
        console.error("Error parsing user data", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setIsLoading(true);
        let res = await fetch(`https://practo-backend.vercel.app/api/doctor/fetchOne/${id}`);
        
        if (!res.ok) {
          console.log('Specific endpoint failed, trying fetchAll...');
          const allRes = await fetch('https://practo-backend.vercel.app/api/doctor/fetchAll');
          
          if (!allRes.ok) {
            throw new Error(`API request failed with status ${allRes.status}`);
          }
          
          const data = await allRes.json();
          const foundDoctor = data.doctors?.find(doc => doc._id === id);
          
          if (!foundDoctor) {
            throw new Error('Doctor not found in fetchAll response');
          }
          
          setDoctor(foundDoctor);
        } else {
          const data = await res.json();
          if (!data.doctor) {
            throw new Error('Doctor data not found in response');
          }
          setDoctor(data.doctor);
        }
      } catch (err) {
        console.error('Error fetching doctor:', err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  useEffect(() => {
    if (doctor?.available?.days?.length) {
      const today = new Date().toLocaleString('en-us', { weekday: 'long' });
      setSelectedDay(
        doctor.available.days.includes(today)
          ? today
          : doctor.available.days[0]
      );
    }
  }, [doctor]);

  useEffect(() => {
    setSelectedDate('');
  }, [selectedDay]);

  const getAvailableDates = () => {
    if (!selectedDay) return [];
    
    const today = new Date();
    const availableDates = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const dayName = daysOfWeek[date.getDay()];
      
      if (dayName === selectedDay) {
        availableDates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return availableDates;
  };

  const generateTimeSlots = () => {
  try {
    if (!doctor?.available?.time) return [];
    
    const timeString = doctor.available.time || '9:00 AM to 5:00 PM';
    const [startStr, endStr] = timeString.split(' to ');
    
    if (!startStr || !endStr) return [];
    
    const parseTime = (timeStr) => {
      const time = timeStr.trim();
      const [timePart, period] = time.split(' ');
      const [hours, minutes] = timePart.split(':').map(Number);
      
      let hour = hours;
      if (period === 'PM' && hour < 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      return { hour, minutes: minutes || 0 };
    };
    
    const startTime = parseTime(startStr);
    const endTime = parseTime(endStr);
    
    if (isNaN(startTime.hour)) return [];
    
    const slots = [];
    let currentHour = startTime.hour;
    let currentMin = startTime.minutes;
    
    while (
      currentHour < endTime.hour || 
      (currentHour === endTime.hour && currentMin <= endTime.minutes)
    ) {
      const displayHour = currentHour % 12 || 12;
      const ampm = currentHour < 12 || currentHour === 24 ? 'AM' : 'PM';
      const timeString = `${displayHour}:${currentMin.toString().padStart(2, '0')} ${ampm}`;
      
      slots.push(timeString);
      
      currentMin += 30;
      if (currentMin >= 60) {
        currentMin -= 60;
        currentHour += 1;
      }
    }
    
    return slots;
  } catch (error) {
    console.error('Error generating time slots:', error);
    return [];
  }
};

  const timeSlots = generateTimeSlots();

  const handleBookClick = () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      // Redirect to login page with a return URL
      router.push(`/login`);
      return;
    }
    
    setIsBookingModalOpen(true);
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const appointmentData = {
        doctorId: doctor._id,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        doctorFees: doctor.consultantFee,
        appointmentDate: selectedDate,
        day: new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }),
        time: selectedTime,
        patientName,
        patientNumber: patientPhone,
        patientEmail,
        patientNote: patientNotes,
        patientId: userData.id,
      };

      console.log("Appointment Data:", appointmentData);

      const response = await fetch('https://practo-backend.vercel.app/api/appointment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Failed to create appointment');

      setBookingSuccess(true);
      setTimeout(() => {
        setPatientName('');
        setPatientPhone('');
        setPatientEmail('');
        setPatientNotes('');
        setSelectedDate('');
        setSelectedTime('');
        setIsBookingModalOpen(false);
        setBookingSuccess(false);
      }, 2000);

    } catch (err) {
      console.error('Error booking appointment:', err);
      alert(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviews = [
    { name: "Sarah Johnson", rating: 5, comment: "Excellent doctor! Very thorough and caring.", date: "2 weeks ago" },
    { name: "Michael Chen", rating: 5, comment: "Professional service and accurate diagnosis. Highly recommended!", date: "1 month ago" },
    { name: "Emma Davis", rating: 4, comment: "Great experience. The doctor explained everything clearly.", date: "3 weeks ago" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 space-y-4">
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
                <div className="h-8 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <div className="h-10 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
                <div className="h-32 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <HeartPulse className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{error || 'Doctor not found'}</h3>
            <button
              onClick={() => router.push('/doctors')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Doctors
            </button>
          </div>
        </div>
      </div>
    );
  }

  const simulatedRating = Math.min(5, Math.max(1, Math.floor(doctor.experience / 2)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <button
            onClick={() => router.push('/doctors')}
            className="mb-4 lg:mb-0 lg:ml-0 text-gray-600 hover:text-blue-600 transition-colors duration-200 self-start p-2 rounded-full hover:bg-white/50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="lg:w-1/3 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-6"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-36 w-36 rounded-2xl overflow-hidden border-4 border-blue-100 mb-6 relative shadow-lg">
                    {doctor.profileImage ? (
                      <img
                        src={doctor.profileImage}
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-4xl">
                        {doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 text-center capitalize mb-2">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h2>
                
                <p className="text-blue-600 text-lg font-medium mb-1">{doctor.specialty}</p>
                
                {doctor.supSpeciality && (
                  <p className="text-sm text-gray-500 text-center mb-4">({doctor.supSpeciality})</p>
                )}
                
                <div className="flex items-center mb-2">
                  {Array(simulatedRating).fill().map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="ml-2 text-gray-700 text-base font-medium">
                    {simulatedRating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-gray-500 text-sm">(127 reviews)</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 bg-gray-50 px-3 py-1 rounded-full">
                  {doctor.experience}+ Years Experience
                </p>
                
                <div className="w-full space-y-4">
                  <div className="flex items-start p-3 bg-blue-50 rounded-xl">
                    <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-gray-900">Qualifications</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {doctor.qualifications.join(', ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-green-50 rounded-xl">
                    <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-gray-900">Location</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {doctor.hospital}, {doctor.hospitalAddress}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-purple-50 rounded-xl">
                    <Clock className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-gray-900">Availability</h4>
                      <p className="text-sm text-gray-600">
                        {doctor.available?.time || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleBookClick}
                  className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded pr-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-blue-600" />
                  About Dr. {doctor.lastName}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {doctor.bio || `Dr. ${doctor.lastName} is a highly skilled ${doctor.specialty} with over ${doctor.experience} years of experience. ${doctor.gender === 'female' ? 'She' : 'He'} specializes in ${doctor.supSpeciality || doctor.specialty} and provides exceptional care at ${doctor.hospital}. Known for a patient-centered approach and commitment to excellence in healthcare delivery.`}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                  Availability & Booking
                </h3>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Select a Day</h4>
                  <div className="flex flex-wrap gap-3">
                    {doctor.available?.days?.map(day => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          selectedDay === day
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-green-600" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center p-4 bg-green-50 rounded-xl">
                    <Phone className="h-6 w-6 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                    <Mail className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">doctor@hospital.com</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                    <Globe className="h-6 w-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <p className="font-semibold text-gray-900">www.hospital.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <HeartPulse className="h-6 w-6 mr-3" />
                  Consultation Fee
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">₹{doctor.consultantFee}</p>
                    <p className="text-blue-100 text-sm">Per consultation</p>
                    <p className="text-blue-100 text-xs mt-1">*Includes digital prescription</p>
                  </div>
                  <button
                    onClick={handleBookClick}
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageCircle className="h-6 w-6 mr-3 text-purple-600" />
                  Patient Reviews
                </h3>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <div className="flex items-center">
                              {Array(review.rating).fill().map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 italic">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {bookingSuccess ? 'Appointment Booked!' : 'Book Appointment'}
                </h3>
                <button 
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setBookingSuccess(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Appointment Confirmed!</h3>
                  <p className="text-gray-600 mb-6">
                    Your appointment with Dr. {doctor.firstName} {doctor.lastName} has been successfully booked.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                    <h4 className="font-semibold text-gray-900 mb-2">Appointment Details</h4>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Day:</span> {selectedDay}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Time:</span> {selectedTime}</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Fee:</span> ₹{doctor.consultantFee}</p>
                  </div>
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      With Dr. {doctor.firstName} {doctor.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    {doctor.supSpeciality && (
                      <p className="text-sm text-gray-500">({doctor.supSpeciality})</p>
                    )}
                  </div>

                  <form onSubmit={handleBookAppointment}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Day
                        </label>
                        <select
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          {doctor.available?.days?.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Date
                        </label>
                        <select
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select a date</option>
                          {getAvailableDates().map((date) => (
                            <option key={date} value={date}>
                              {new Date(date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Available Time Slots
                        </label>
                        {timeSlots.length > 0 ? (
                          <div className="grid grid-cols-3 gap-3">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                  selectedTime === time
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 py-2">No available time slots for this day</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notes (Optional)
                        </label>
                        <textarea
                          value={patientNotes}
                          onChange={(e) => setPatientNotes(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Any symptoms or additional information"
                        />
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-medium text-gray-700">Consultation Fee</span>
                          <span className="text-lg font-bold text-gray-900">₹{doctor.consultantFee}</span>
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting || !selectedTime || !selectedDate}
                          className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                            !selectedTime || !selectedDate ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            'Confirm Appointment'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}