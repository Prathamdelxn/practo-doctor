// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { 
//   User, Mail, Phone, Lock, Eye, EyeOff, Stethoscope, 
//   Calendar, GraduationCap, MapPin, ChevronDown, 
//   CheckCircle, AlertCircle, BadgeCheck, FileText, 
//   Hospital, ArrowRight, ArrowLeft, ClipboardCheck
// } from 'lucide-react'

// const specialties = [
//   'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 
//   'Dermatology', 'Psychiatry', 'Oncology', 'Gynecology',
//   'Urology', 'Ophthalmology', 'ENT', 'General Medicine'
// ]

// const qualifications = [
//   'MBBS', 'MD', 'MS', 'DM', 'MCh', 'DNB', 
//   'BDS', 'MDS', 'BPT', 'MPT', 'PhD'
// ]

// const steps = [
//   { id: 'personal', title: 'Personal Information', icon: User },
//   { id: 'professional', title: 'Professional Details', icon: Stethoscope },
//   { id: 'credentials', title: 'Credentials', icon: ClipboardCheck },
//   { id: 'review', title: 'Review', icon: BadgeCheck }
// ]

// export default function DoctorSignup() {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     DateofBirth:'',
//     Gender:'',
//     email: '',
//     password: '',
  
//     phone: '',
//     specialty: '',
//     subSpecialty: '',
//     experience: '',
//     licenseNumber: '',
//     qualification: '',
//     hospital: '',
//     hospitalContactNo:'',
//     bio: '',
//     hospitalAddress: ''
//   })
//   const previousStep=0;
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [success, setSuccess] = useState(false)

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }))
//     }
//   }

//   const validateStep = (step) => {
//     const newErrors = {}
    
//     if (step === 0) {
//       // Personal Info
//       if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
//       if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
//       if (!formData.email.trim()) newErrors.email = 'Email is required'
//       else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid'
//       if (!formData.password) newErrors.password = 'Password is required'
//       else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
//       if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password'
//       else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
//       if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
//     } else if (step === 1) {
//       // Professional Info
//       if (!formData.specialty) newErrors.specialty = 'Specialty is required'
//       if (!formData.experience.trim()) newErrors.experience = 'Experience is required'
//       if (!formData.hospital.trim()) newErrors.hospital = 'Hospital/clinic is required'
//     } else if (step === 2) {
//       // Credentials
//       if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required'
//       if (!formData.qualification) newErrors.qualification = 'Qualification is required'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
//     }
//   }

//   const prevStep = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 0))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateStep(currentStep)) return

//     if (currentStep < steps.length - 1) {
//       nextStep()
//       return
//     }

//     setIsSubmitting(true)
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500))
    
//     setIsSubmitting(false)
//     setSuccess(true)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl">
//         <AnimatePresence mode="wait">
//           {success ? (
//             <motion.div
//               key="success"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-white rounded-2xl shadow-xl p-8 text-center"
//             >
//               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
//                 <CheckCircle className="h-8 w-8 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                 Registration Complete!
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 Your doctor account has been created successfully. Our team will verify your credentials and activate your account within 24 hours.
//               </p>
//               <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full bg-indigo-600"
//                   initial={{ width: 0 }}
//                   animate={{ width: '100%' }}
//                   transition={{ duration: 2 }}
//                 />
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="form"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-white rounded-2xl shadow-xl overflow-hidden"
//             >
//               <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
//                 <h1 className="text-2xl font-bold flex items-center">
//                   <Stethoscope className="h-6 w-6 mr-2" />
//                   Doctor Registration
//                 </h1>
//                 <p className="opacity-90">
//                   Create your professional medical account
//                 </p>
//               </div>

//               {/* Step Indicator */}
//               <div className="px-6 pt-6">
//                 <div className="flex justify-between">
//                   {steps.map((step, index) => (
//                     <div key={step.id} className="flex flex-col items-center relative z-10 w-1/4">
//                       <button
//                         type="button"
//                         onClick={() => setCurrentStep(index)}
//                         className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
//                           index <= currentStep 
//                             ? 'bg-indigo-600 text-white' 
//                             : 'bg-gray-200 text-gray-600'
//                         }`}
//                       >
//                         <step.icon className="h-5 w-5" />
//                       </button>
//                       <span className={`text-xs mt-2 text-center ${
//                         index <= currentStep ? 'text-indigo-600 font-medium' : 'text-gray-500'
//                       }`}>
//                         {step.title}
//                       </span>
//                       {index < steps.length - 1 && (
//                         <div className={`absolute top-5 left-1/2 w-full h-1 transform -translate-y-1/2 ${
//                           index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
//                         }`}></div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={steps[currentStep].id}
//                     initial={{ opacity: 0, x: currentStep > previousStep ? 50 : -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: currentStep > previousStep ? -50 : 50 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {currentStep === 0 && (
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
//                           <User className="h-5 w-5 text-indigo-600 mr-2" />
//                           Personal Information
//                         </h3>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
//                             <div className="relative">
//                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <User className="h-4 w-4 text-gray-400" />
//                               </div>
//                               <input
//                                 type="text"
//                                 value={formData.firstName}
//                                 onChange={(e) => handleInputChange('firstName', e.target.value)}
//                                 className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                   errors.firstName ? 'border-red-300' : 'border-gray-300'
//                                 }`}
//                                 placeholder="John"
//                               />
//                             </div>
//                             {errors.firstName && (
//                               <p className="text-red-500 text-xs mt-1 flex items-center">
//                                 <AlertCircle className="h-3 w-3 mr-1" /> {errors.firstName}
//                               </p>
//                             )}
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
//                             <input
//                               type="text"
//                               value={formData.lastName}
//                               onChange={(e) => handleInputChange('lastName', e.target.value)}
//                               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.lastName ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Doe"
//                             />
//                             {errors.lastName && (
//                               <p className="text-red-500 text-xs mt-1 flex items-center">
//                                 <AlertCircle className="h-3 w-3 mr-1" /> {errors.lastName}
//                               </p>
//                             )}
//                           </div>
//                         </div>
// <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
//                             <div className="relative">
//                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <User className="h-4 w-4 text-gray-400" />
//                               </div>
//                               <input
//                                 type="date"
//                                 value={formData.DateofBirth}
//                                 onChange={(e) => handleInputChange('DateofBirth', e.target.value)}
//                                 className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                   errors.DateofBirth ? 'border-red-300' : 'border-gray-300'
//                                 }`}
//                                 placeholder="11 May 2003"
//                               />
//                             </div>
//                             {errors.DateofBirth && (
//                               <p className="text-red-500 text-xs mt-1 flex items-center">
//                                 <AlertCircle className="h-3 w-3 mr-1" /> {errors.DateofBirth}
//                               </p>
//                             )}
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
//                             <input
//                               type="text"
//                               value={formData.Gender}
//                               onChange={(e) => handleInputChange('Gender', e.target.value)}
//                               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.Gender ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="male/female"
//                             />
//                             {errors.Gender && (
//                               <p className="text-red-500 text-xs mt-1 flex items-center">
//                                 <AlertCircle className="h-3 w-3 mr-1" /> {errors.Gender}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Mail className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="email"
//                               value={formData.email}
//                               onChange={(e) => handleInputChange('email', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.email ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="doctor@example.com"
//                             />
//                           </div>
//                           {errors.email && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Phone className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="tel"
//                               value={formData.phone}
//                               onChange={(e) => handleInputChange('phone', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.phone ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="+1 (555) 123-4567"
//                             />
//                           </div>
//                           {errors.phone && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Lock className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type={showPassword ? "text" : "password"}
//                               value={formData.password}
//                               onChange={(e) => handleInputChange('password', e.target.value)}
//                               className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.password ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Create a password"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                             >
//                               {showPassword ? (
//                                 <EyeOff className="h-4 w-4" />
//                               ) : (
//                                 <Eye className="h-4 w-4" />
//                               )}
//                             </button>
//                           </div>
//                           {errors.password && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.password}
//                             </p>
//                           )}
//                           <p className="text-xs text-gray-500 mt-1">
//                             Use 8 or more characters with a mix of letters, numbers & symbols
//                           </p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Lock className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type={showConfirmPassword ? "text" : "password"}
//                               value={formData.confirmPassword}
//                               onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                               className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Confirm your password"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                             >
//                               {showConfirmPassword ? (
//                                 <EyeOff className="h-4 w-4" />
//                               ) : (
//                                 <Eye className="h-4 w-4" />
//                               )}
//                             </button>
//                           </div>
//                           {errors.confirmPassword && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.confirmPassword}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {currentStep === 1 && (
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
//                           <Stethoscope className="h-5 w-5 text-indigo-600 mr-2" />
//                           Professional Details
//                         </h3>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Primary Specialty*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Stethoscope className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <select
//                               value={formData.specialty}
//                               onChange={(e) => handleInputChange('specialty', e.target.value)}
//                               className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
//                                 errors.specialty ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                             >
//                               <option value="">Select your specialty</option>
//                               {specialties.map(specialty => (
//                                 <option key={specialty} value={specialty}>{specialty}</option>
//                               ))}
//                             </select>
//                             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                               <ChevronDown className="h-4 w-4 text-gray-400" />
//                             </div>
//                           </div>
//                           {errors.specialty && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.specialty}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Specialty (Optional)</label>
//                           <input
//                             type="text"
//                             value={formData.subSpecialty}
//                             onChange={(e) => handleInputChange('subSpecialty', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                             placeholder="e.g. Pediatric Cardiology"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Calendar className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="text"
//                               value={formData.experience}
//                               onChange={(e) => handleInputChange('experience', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.experience ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="5 years"
//                             />
//                           </div>
//                           {errors.experience && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.experience}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Hospital className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="text"
//                               value={formData.hospital}
//                               onChange={(e) => handleInputChange('hospital', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.hospital ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Current workplace"
//                             />
//                           </div>
//                           {errors.hospital && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.hospital}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
//                           <textarea
//                             value={formData.bio}
//                             onChange={(e) => handleInputChange('bio', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                             placeholder="Brief introduction about your practice"
//                             rows="3"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Address</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <MapPin className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="text"
//                               value={formData.address}
//                               onChange={(e) => handleInputChange('address', e.target.value)}
//                               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                               placeholder="Full practice address"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {currentStep === 2 && (
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
//                           <ClipboardCheck className="h-5 w-5 text-indigo-600 mr-2" />
//                           Credentials
//                         </h3>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Medical License Number*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <FileText className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="text"
//                               value={formData.licenseNumber}
//                               onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="MD123456"
//                             />
//                           </div>
//                           {errors.licenseNumber && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.licenseNumber}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <GraduationCap className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <select
//                               value={formData.qualification}
//                               onChange={(e) => handleInputChange('qualification', e.target.value)}
//                               className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
//                                 errors.qualification ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                             >
//                               <option value="">Select your qualification</option>
//                               {qualifications.map(qual => (
//                                 <option key={qual} value={qual}>{qual}</option>
//                               ))}
//                             </select>
//                             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                               <ChevronDown className="h-4 w-4 text-gray-400" />
//                             </div>
//                           </div>
//                           {errors.qualification && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.qualification}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {currentStep === 3 && (
//                       <div className="space-y-6">
//                         <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
//                           <BadgeCheck className="h-5 w-5 text-indigo-600 mr-2" />
//                           Review Your Information
//                         </h3>

//                         <div className="bg-blue-50 p-4 rounded-lg">
//                           <h4 className="font-medium text-blue-800 mb-3 flex items-center">
//                             <User className="h-4 w-4 mr-2" />
//                             Personal Information
//                           </h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-sm text-gray-500">First Name</p>
//                               <p className="font-medium">{formData.firstName || 'Not provided'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Last Name</p>
//                               <p className="font-medium">{formData.lastName || 'Not provided'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Email</p>
//                               <p className="font-medium">{formData.email || 'Not provided'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Phone</p>
//                               <p className="font-medium">{formData.phone || 'Not provided'}</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="bg-blue-50 p-4 rounded-lg">
//                           <h4 className="font-medium text-blue-800 mb-3 flex items-center">
//                             <Stethoscope className="h-4 w-4 mr-2" />
//                             Professional Information
//                           </h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-sm text-gray-500">Specialty</p>
//                               <p className="font-medium">{formData.specialty || 'Not provided'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Sub-Specialty</p>
//                               <p className="font-medium">{formData.subSpecialty || 'Not provided'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Experience</p>
//                               <p className="font-medium">{formData.experience || 'Not provided'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Hospital/Clinic</p>
//                               <p className="font-medium">{formData.hospital || 'Not provided'}</p>
//                             </div>
//                             <div className="md:col-span-2">
//                               <p className="text-sm text-gray-500">Bio</p>
//                               <p className="font-medium">{formData.bio || 'Not provided'}</p>
//                             </div>
//                             <div className="md:col-span-2">
//                               <p className="text-sm text-gray-500">Address</p>
//                               <p className="font-medium">{formData.address || 'Not provided'}</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="bg-blue-50 p-4 rounded-lg">
//                           <h4 className="font-medium text-blue-800 mb-3 flex items-center">
//                             <ClipboardCheck className="h-4 w-4 mr-2" />
//                             Credentials
//                           </h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-sm text-gray-500">License Number</p>
//                               <p className="font-medium">{formData.licenseNumber || 'Not provided'}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm text-gray-500">Qualification</p>
//                               <p className="font-medium">{formData.qualification || 'Not provided'}</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center">
//                           <input
//                             id="terms"
//                             name="terms"
//                             type="checkbox"
//                             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                             required
//                           />
//                           <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//                             I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
//                           </label>
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 </AnimatePresence>

//                 <div className="mt-8 pt-6 border-t border-gray-200">
//                   <div className="flex justify-between">
//                     {currentStep > 0 && (
//                       <button
//                         type="button"
//                         onClick={prevStep}
//                         className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
//                       >
//                         <ArrowLeft className="h-4 w-4 mr-2" />
//                         Previous
//                       </button>
//                     )}
                    
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className={`ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
//                         currentStep === steps.length - 1 
//                           ? 'bg-indigo-600 hover:bg-indigo-700' 
//                           : 'bg-blue-600 hover:bg-blue-700'
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                           </svg>
//                           {currentStep === steps.length - 1 ? 'Submitting...' : 'Processing...'}
//                         </>
//                       ) : (
//                         <>
//                           {currentStep === steps.length - 1 ? 'Submit Registration' : 'Next Step'}
//                           <ArrowRight className="h-4 w-4 ml-2" />
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { 
//   User, Mail, Phone, Lock, Eye, EyeOff, Stethoscope, 
//   Calendar, GraduationCap, MapPin, ChevronDown, 
//   CheckCircle, AlertCircle, BadgeCheck, FileText, 
//   Hospital, ArrowRight, ArrowLeft, ClipboardCheck
// } from 'lucide-react'

// const specialties = [
//   'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 
//   'Dermatology', 'Psychiatry', 'Oncology', 'Gynecology',
//   'Urology', 'Ophthalmology', 'ENT', 'General Medicine'
// ]

// const qualifications = [
//   'MBBS', 'MD', 'MS', 'DM', 'MCh', 'DNB', 
//   'BDS', 'MDS', 'BPT', 'MPT', 'PhD'
// ]

// const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say']

// const steps = [
//   { id: 'personal', title: 'Personal Information', icon: User },
//   { id: 'professional', title: 'Professional Details', icon: Stethoscope },
//   { id: 'credentials', title: 'Credentials', icon: ClipboardCheck },
//   { id: 'review', title: 'Review', icon: BadgeCheck }
// ]

// export default function DoctorSignup() {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [previousStep, setPreviousStep] = useState(0)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     gender: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     specialty: '',
//     subSpecialty: '',
//     experience: '',
//     licenseNumber: '',
//     qualification: '',
//     hospital: '',
//     hospitalContactNo: '',
//     bio: '',
//     hospitalAddress: ''
//   })
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [success, setSuccess] = useState(false)

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: '' }))
//     }
//   }

//   const validateStep = (step) => {
//     const newErrors = {}
    
//     if (step === 0) {
//       // Personal Info
//       if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
//       if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
//       if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required'
//       if (!formData.gender) newErrors.gender = 'Gender is required'
//       if (!formData.email.trim()) newErrors.email = 'Email is required'
//       else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid'
//       if (!formData.password) newErrors.password = 'Password is required'
//       else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
//       if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password'
//       else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
//       if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
//     } else if (step === 1) {
//       // Professional Info
//       if (!formData.specialty) newErrors.specialty = 'Specialty is required'
//       if (!formData.experience.trim()) newErrors.experience = 'Experience is required'
//       if (!formData.hospital.trim()) newErrors.hospital = 'Hospital/clinic is required'
//       if (!formData.hospitalContactNo.trim()) newErrors.hospitalContactNo = 'Hospital contact number is required'
//       if (!formData.hospitalAddress.trim()) newErrors.hospitalAddress = 'Hospital address is required'
//     } else if (step === 2) {
//       // Credentials
//       if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required'
//       if (!formData.qualification) newErrors.qualification = 'Qualification is required'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const nextStep = () => {
//     if (validateStep(currentStep)) {
//       setPreviousStep(currentStep)
//       setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
//     }
//   }

//   const prevStep = () => {
//     setPreviousStep(currentStep)
//     setCurrentStep(prev => Math.max(prev - 1, 0))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!validateStep(currentStep)) return

//     if (currentStep < steps.length - 1) {
//       nextStep()
//       return
//     }

//     setIsSubmitting(true)
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500))
    
//     setIsSubmitting(false)
//     setSuccess(true)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl">
//         <AnimatePresence mode="wait">
//           {success ? (
//             <motion.div
//               key="success"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-white rounded-2xl shadow-xl p-8 text-center"
//             >
//               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
//                 <CheckCircle className="h-8 w-8 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                 Registration Complete!
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 Your doctor account has been created successfully. Our team will verify your credentials and activate your account within 24 hours.
//               </p>
//               <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full bg-indigo-600"
//                   initial={{ width: 0 }}
//                   animate={{ width: '100%' }}
//                   transition={{ duration: 2 }}
//                 />
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="form"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="bg-white rounded-2xl shadow-xl overflow-hidden"
//             >
//               <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
//                 <h1 className="text-2xl font-bold flex items-center">
//                   <Stethoscope className="h-6 w-6 mr-2" />
//                   Doctor Registration
//                 </h1>
//                 <p className="opacity-90">
//                   Create your professional medical account
//                 </p>
//               </div>

//               {/* Step Indicator */}
//               <div className="px-6 pt-6">
//                 <div className="flex justify-between">
//                   {steps.map((step, index) => (
//                     <div key={step.id} className="flex flex-col items-center relative z-10 w-1/4">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           if (index < currentStep) {
//                             setPreviousStep(currentStep)
//                             setCurrentStep(index)
//                           }
//                         }}
//                         disabled={index > currentStep}
//                         className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
//                           index <= currentStep 
//                             ? 'bg-indigo-600 text-white' 
//                             : 'bg-gray-200 text-gray-600'
//                         } ${index < currentStep ? 'cursor-pointer hover:bg-indigo-700' : ''}`}
//                       >
//                         <step.icon className="h-5 w-5" />
//                       </button>
//                       <span className={`text-xs mt-2 text-center ${
//                         index <= currentStep ? 'text-indigo-600 font-medium' : 'text-gray-500'
//                       }`}>
//                         {step.title}
//                       </span>
//                       {index < steps.length - 1 && (
//                         <div className={`absolute top-5 left-1/2 w-full h-1 transform -translate-y-1/2 ${
//                           index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
//                         }`}></div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="p-6">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={steps[currentStep].id}
//                     initial={{ opacity: 0, x: currentStep > previousStep ? 50 : -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: currentStep > previousStep ? -50 : 50 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {currentStep === 0 && (
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
//                           <User className="h-5 w-5 text-indigo-600 mr-2" />
//                           Personal Information
//                         </h3>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
//                             <div className="relative">
//                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <User className="h-4 w-4 text-gray-400" />
//                               </div>
//                               <input
//                                 type="text"
//                                 value={formData.firstName}
//                                 onChange={(e) => handleInputChange('firstName', e.target.value)}
//                                 className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                   errors.firstName ? 'border-red-300' : 'border-gray-300'
//                                 }`}
//                                 placeholder="John"
//                               />
//                             </div>
//                             {errors.firstName && (
//                               <p className="text-red-500 text-xs mt-1 flex items-center">
//                                 <AlertCircle className="h-3 w-3 mr-1" /> {errors.firstName}
//                               </p>
//                             )}
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
//                             <input
//                               type="text"
//                               value={formData.lastName}
//                               onChange={(e) => handleInputChange('lastName', e.target.value)}
//                               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.lastName ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Doe"
//                             />
//                             {errors.lastName && (
//                               <p className="text-red-500 text-xs mt-1 flex items-center">
//                                 <AlertCircle className="h-3 w-3 mr-1" /> {errors.lastName}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
//                             <div className="relative">
//                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <Calendar className="h-4 w-4 text-gray-400" />
//                               </div>
//                               <input
//                                 type="date"
//                                 value={formData.dateOfBirth}
//                                 onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
//                                 max={new Date().toISOString().split('T')[0]}
//                                 className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                   errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
//                                 }`}
//                               />
//                             </div>
//                             {errors.dateOfBirth && (
//                               <p className="text-red-500 text-xs mt-1 flex items-center">
//                                 <AlertCircle className="h-3 w-3 mr-1" /> {errors.dateOfBirth}
//                               </p>
//                             )}
//                           </div>
                          
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
//                             <div className="relative">
//                               <select
//                                 value={formData.gender}
//                                 onChange={(e) => handleInputChange('gender', e.target.value)}
//                                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
//                                   errors.gender ? 'border-red-300' : 'border-gray-300'
//                                 }`}
//                               >
//                                 <option value="">Select gender</option>
//                                 {genderOptions.map(option => (
//                                   <option key={option} value={option}>{option}</option>
//                                 ))}
//                               </select>
//                               <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                                 <ChevronDown className="h-4 w-4 text-gray-400" />
//                               </div>
//                             </div>
//                             {errors.gender && (
//                               <p className="text-red-500 text-xs mt-1 flex items-center">
//                                 <AlertCircle className="h-3 w-3 mr-1" /> {errors.gender}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Mail className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="email"
//                               value={formData.email}
//                               onChange={(e) => handleInputChange('email', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.email ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="doctor@example.com"
//                             />
//                           </div>
//                           {errors.email && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Phone className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="tel"
//                               value={formData.phone}
//                               onChange={(e) => handleInputChange('phone', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.phone ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="+1 (555) 123-4567"
//                             />
//                           </div>
//                           {errors.phone && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Lock className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type={showPassword ? "text" : "password"}
//                               value={formData.password}
//                               onChange={(e) => handleInputChange('password', e.target.value)}
//                               className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.password ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Create a password"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                             >
//                               {showPassword ? (
//                                 <EyeOff className="h-4 w-4" />
//                               ) : (
//                                 <Eye className="h-4 w-4" />
//                               )}
//                             </button>
//                           </div>
//                           {errors.password && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.password}
//                             </p>
//                           )}
//                           <p className="text-xs text-gray-500 mt-1">
//                             Use 8 or more characters with a mix of letters, numbers & symbols
//                           </p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Lock className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type={showConfirmPassword ? "text" : "password"}
//                               value={formData.confirmPassword}
//                               onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                               className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Confirm your password"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                             >
//                               {showConfirmPassword ? (
//                                 <EyeOff className="h-4 w-4" />
//                               ) : (
//                                 <Eye className="h-4 w-4" />
//                               )}
//                             </button>
//                           </div>
//                           {errors.confirmPassword && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.confirmPassword}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {currentStep === 1 && (
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
//                           <Stethoscope className="h-5 w-5 text-indigo-600 mr-2" />
//                           Professional Details
//                         </h3>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Primary Specialty*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Stethoscope className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <select
//                               value={formData.specialty}
//                               onChange={(e) => handleInputChange('specialty', e.target.value)}
//                               className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
//                                 errors.specialty ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                             >
//                               <option value="">Select your specialty</option>
//                               {specialties.map(specialty => (
//                                 <option key={specialty} value={specialty}>{specialty}</option>
//                               ))}
//                             </select>
//                             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                               <ChevronDown className="h-4 w-4 text-gray-400" />
//                             </div>
//                           </div>
//                           {errors.specialty && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.specialty}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Specialty (Optional)</label>
//                           <input
//                             type="text"
//                             value={formData.subSpecialty}
//                             onChange={(e) => handleInputChange('subSpecialty', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                             placeholder="e.g. Pediatric Cardiology"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Calendar className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="number"
//                               min="0"
//                               max="50"
//                               value={formData.experience}
//                               onChange={(e) => handleInputChange('experience', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.experience ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="5"
//                             />
//                           </div>
//                           {errors.experience && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.experience}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Hospital className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="text"
//                               value={formData.hospital}
//                               onChange={(e) => handleInputChange('hospital', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.hospital ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Current workplace"
//                             />
//                           </div>
//                           {errors.hospital && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.hospital}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Contact Number*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <Phone className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="tel"
//                               value={formData.hospitalContactNo}
//                               onChange={(e) => handleInputChange('hospitalContactNo', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.hospitalContactNo ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Hospital phone number"
//                             />
//                           </div>
//                           {errors.hospitalContactNo && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.hospitalContactNo}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Address*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <MapPin className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <textarea
//                               value={formData.hospitalAddress}
//                               onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.hospitalAddress ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Full hospital/clinic address"
//                               rows="2"
//                             />
//                           </div>
//                           {errors.hospitalAddress && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.hospitalAddress}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
//                           <textarea
//                             value={formData.bio}
//                             onChange={(e) => handleInputChange('bio', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                             placeholder="Brief introduction about your practice and expertise"
//                             rows="3"
//                           />
//                         </div>
//                       </div>
//                     )}

//                     {currentStep === 2 && (
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
//                           <ClipboardCheck className="h-5 w-5 text-indigo-600 mr-2" />
//                           Credentials</h3>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Medical License Number*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <FileText className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <input
//                               type="text"
//                               value={formData.licenseNumber}
//                               onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
//                               className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                                 errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                               placeholder="Enter your medical license number"
//                             />
//                           </div>
//                           {errors.licenseNumber && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.licenseNumber}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Primary Qualification*</label>
//                           <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                               <GraduationCap className="h-4 w-4 text-gray-400" />
//                             </div>
//                             <select
//                               value={formData.qualification}
//                               onChange={(e) => handleInputChange('qualification', e.target.value)}
//                               className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
//                                 errors.qualification ? 'border-red-300' : 'border-gray-300'
//                               }`}
//                             >
//                               <option value="">Select your qualification</option>
//                               {qualifications.map(qualification => (
//                                 <option key={qualification} value={qualification}>{qualification}</option>
//                               ))}
//                             </select>
//                             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                               <ChevronDown className="h-4 w-4 text-gray-400" />
//                             </div>
//                           </div>
//                           {errors.qualification && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center">
//                               <AlertCircle className="h-3 w-3 mr-1" /> {errors.qualification}
//                             </p>
//                           )}
//                         </div>

//                         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                           <div className="flex items-start">
//                             <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
//                             <div className="text-sm text-blue-800">
//                               <p className="font-medium mb-1">Document Verification</p>
//                               <p>After registration, you'll need to upload the following documents for verification:</p>
//                               <ul className="list-disc list-inside mt-2 space-y-1">
//                                 <li>Medical license certificate</li>
//                                 <li>Degree certificate</li>
//                                 <li>Government-issued ID</li>
//                                 <li>Hospital affiliation letter</li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {currentStep === 3 && (
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
//                           <BadgeCheck className="h-5 w-5 text-indigo-600 mr-2" />
//                           Review Your Information
//                         </h3>

//                         <div className="space-y-6">
//                           <div className="bg-gray-50 rounded-lg p-4">
//                             <h4 className="font-medium text-gray-800 mb-3 flex items-center">
//                               <User className="h-4 w-4 mr-2" />
//                               Personal Information
//                             </h4>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                               <div>
//                                 <span className="text-gray-600">Name:</span>
//                                 <span className="ml-2 font-medium">{formData.firstName} {formData.lastName}</span>
//                               </div>
//                               <div>
//                                 <span className="text-gray-600">Date of Birth:</span>
//                                 <span className="ml-2 font-medium">{formData.dateOfBirth}</span>
//                               </div>
//                               <div>
//                                 <span className="text-gray-600">Gender:</span>
//                                 <span className="ml-2 font-medium">{formData.gender}</span>
//                               </div>
//                               <div>
//                                 <span className="text-gray-600">Email:</span>
//                                 <span className="ml-2 font-medium">{formData.email}</span>
//                               </div>
//                               <div>
//                                 <span className="text-gray-600">Phone:</span>
//                                 <span className="ml-2 font-medium">{formData.phone}</span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="bg-gray-50 rounded-lg p-4">
//                             <h4 className="font-medium text-gray-800 mb-3 flex items-center">
//                               <Stethoscope className="h-4 w-4 mr-2" />
//                               Professional Details
//                             </h4>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                               <div>
//                                 <span className="text-gray-600">Specialty:</span>
//                                 <span className="ml-2 font-medium">{formData.specialty}</span>
//                               </div>
//                               {formData.subSpecialty && (
//                                 <div>
//                                   <span className="text-gray-600">Sub-specialty:</span>
//                                   <span className="ml-2 font-medium">{formData.subSpecialty}</span>
//                                 </div>
//                               )}
//                               <div>
//                                 <span className="text-gray-600">Experience:</span>
//                                 <span className="ml-2 font-medium">{formData.experience} years</span>
//                               </div>
//                               <div>
//                                 <span className="text-gray-600">Hospital:</span>
//                                 <span className="ml-2 font-medium">{formData.hospital}</span>
//                               </div>
//                               <div className="md:col-span-2">
//                                 <span className="text-gray-600">Hospital Address:</span>
//                                 <span className="ml-2 font-medium">{formData.hospitalAddress}</span>
//                               </div>
//                               {formData.bio && (
//                                 <div className="md:col-span-2">
//                                   <span className="text-gray-600">Bio:</span>
//                                   <p className="ml-2 font-medium">{formData.bio}</p>
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           <div className="bg-gray-50 rounded-lg p-4">
//                             <h4 className="font-medium text-gray-800 mb-3 flex items-center">
//                               <ClipboardCheck className="h-4 w-4 mr-2" />
//                               Credentials
//                             </h4>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
//                               <div>
//                                 <span className="text-gray-600">License Number:</span>
//                                 <span className="ml-2 font-medium">{formData.licenseNumber}</span>
//                               </div>
//                               <div>
//                                 <span className="text-gray-600">Qualification:</span>
//                                 <span className="ml-2 font-medium">{formData.qualification}</span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                             <div className="flex items-start">
//                               <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
//                               <div className="text-sm text-yellow-800">
//                                 <p className="font-medium mb-1">Important Notice</p>
//                                 <p>By submitting this registration, you confirm that all information provided is accurate and you agree to our terms of service and privacy policy. Your account will be activated after document verification.</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 </AnimatePresence>

//                 <div className="flex justify-between items-center mt-8 pt-6 border-t">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 0}
//                     className={`flex items-center px-4 py-2 rounded-lg transition-all ${
//                       currentStep === 0
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
//                     }`}
//                   >
//                     <ArrowLeft className="h-4 w-4 mr-2" />
//                     Previous
//                   </button>

//                   <div className="flex items-center space-x-2">
//                     {steps.map((_, index) => (
//                       <div
//                         key={index}
//                         className={`h-2 w-8 rounded-full transition-all ${
//                           index <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
//                         }`}
//                       />
//                     ))}
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
//                       isSubmitting
//                         ? 'bg-gray-400 text-white cursor-not-allowed'
//                         : 'bg-indigo-600 text-white hover:bg-indigo-700'
//                     }`}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Processing...
//                       </>
//                     ) : currentStep === steps.length - 1 ? (
//                       <>
//                         Complete Registration
//                         <CheckCircle className="h-4 w-4 ml-2" />
//                       </>
//                     ) : (
//                       <>
//                         Next
//                         <ArrowRight className="h-4 w-4 ml-2" />
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }



'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, Stethoscope, 
  Calendar, GraduationCap, MapPin, ChevronDown, 
  CheckCircle, AlertCircle, BadgeCheck, FileText, 
  Hospital, ArrowRight, ArrowLeft, ClipboardCheck,
  Clock, Image, X
} from 'lucide-react'

const specialties = [
  'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 
  'Dermatology', 'Psychiatry', 'Oncology', 'Gynecology',
  'Urology', 'Ophthalmology', 'ENT', 'General Medicine'
]

const qualifications = [
  'MBBS', 'MD', 'MS', 'DM', 'MCh', 'DNB', 
  'BDS', 'MDS', 'BPT', 'MPT', 'PhD'
]

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say']

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const steps = [
  { id: 'personal', title: 'Personal Information', icon: User },
  { id: 'professional', title: 'Professional Details', icon: Stethoscope },
  { id: 'availability', title: 'Availability', icon: Clock },
  { id: 'credentials', title: 'Credentials', icon: ClipboardCheck },
  { id: 'review', title: 'Review', icon: BadgeCheck }
]

export default function DoctorSignup() {
   const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0)
  const [previousStep, setPreviousStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profileImage: null, // local preview URL
  profileImageUrl: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    specialty: '',
    supSpeciality: '',
    experience: '',
    qualifications: [],
    licenseNumber: '',
    hospital: '',
    hospitalAddress: '',
    hospitalNumber: '',
    available: {
      days: [],
      time: ''
    }
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef(null)
const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setFormData(prev => ({ ...prev, profileImage: reader.result }))
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    setIsSubmitting(true);
    
    // First create a local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);

    // Then upload to Cloudinary
    const cloudinaryUrl = await uploadImageToCloudinary(file);
    setFormData(prev => ({ ...prev, profileImageUrl: cloudinaryUrl }));
    
  } catch (error) {
    console.error('Error uploading image:', error);
    // Handle error (show toast, etc.)
  } finally {
    setIsSubmitting(false);
  }
};
  const removeProfileImage = () => {
    setFormData(prev => ({ ...prev, profileImage: null }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const toggleDay = (day) => {
    setFormData(prev => {
      const newDays = prev.available.days.includes(day)
        ? prev.available.days.filter(d => d !== day)
        : [...prev.available.days, day]
      return {
        ...prev,
        available: {
          ...prev.available,
          days: newDays
        }
      }
    })
  }

  const toggleQualification = (qualification) => {
    setFormData(prev => {
      const newQualifications = prev.qualifications.includes(qualification)
        ? prev.qualifications.filter(q => q !== qualification)
        : [...prev.qualifications, qualification]
      return {
        ...prev,
        qualifications: newQualifications
      }
    })
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 0) {
      // Personal Info
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.profileImage) newErrors.profileImage = 'Profile image is required'
      if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required'
      if (!formData.gender) newErrors.gender = 'Gender is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid'
      if (!formData.password) newErrors.password = 'Password is required'
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password'
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    } else if (step === 1) {
      // Professional Info
      if (!formData.specialty) newErrors.specialty = 'Specialty is required'
      if (!formData.experience.trim()) newErrors.experience = 'Experience is required'
      if (!formData.hospital.trim()) newErrors.hospital = 'Hospital/clinic is required'
      if (!formData.hospitalNumber.trim()) newErrors.hospitalNumber = 'Hospital contact number is required'
    } else if (step === 2) {
      // Availability
      if (formData.available.days.length === 0) newErrors.availableDays = 'Select at least one working day'
      if (!formData.available.time.trim()) newErrors.availableTime = 'Working hours are required'
    } else if (step === 3) {
      // Credentials
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required'
      if (formData.qualifications.length === 0) newErrors.qualifications = 'Select at least one qualification'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setPreviousStep(currentStep)
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setPreviousStep(currentStep)
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   if (!validateStep(currentStep)) return

  //   if (currentStep < steps.length - 1) {
  //     nextStep()
  //     return
  //   }

  //   setIsSubmitting(true)
    
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1500))
    
  //   setIsSubmitting(false)
  //   setSuccess(true)
  // }
  //  const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Form submission initiated');
    
  //   if (!validateStep(currentStep)) {
  //     console.log('Validation failed for current step');
  //     return;
  //   }

  //   if (currentStep < steps.length - 1) {
  //     console.log('Proceeding to next step');
  //     nextStep();
  //     return;
  //   }

  //   console.log('Submitting form data:', formData);
  //   setIsSubmitting(true);
    
  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1500));
      
  //     console.log('Submission successful');
  //     setSuccess(true);
  //   } catch (error) {
  //     console.error('Submission error:', error);
  //     // You might want to set an error state to show to the user
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }


  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submission initiated');

  if (!validateStep(currentStep)) {
    console.log('Validation failed for current step');
    return;
  }

  if (currentStep < steps.length - 1) {
    console.log('Proceeding to next step');
    nextStep();
    return;
  }

  console.log('Submitting form data:', formData);
  setIsSubmitting(true);
const cleanedData={
  firstName:formData.firstName,
  lastName:formData.lastName,
  dateOfBirth:formData.dateOfBirth,
  profileImage:formData.profileImageUrl,
  gender:formData.gender,
  email:formData.email,
  password:formData.password,
  phone:formData.phone,
  specialty:formData.specialty,
  supSpeciality:formData.supSpeciality,
  experience:formData.experience,
  qualifications:formData.qualifications,
  licenseNumber:formData.licenseNumber,
  hospital:formData.hospital,
  hospitalAddress:formData.hospitalAddress,
  hospitalNumber:formData.hospitalNumber,
  available:formData.available
}
  try {
    const response = await fetch('http://localhost:3001/api/doctor/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanedData), // Ensure `formData` matches your Doctor schema
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', data.message);
      // Optionally set an error state: setError(data.message);
      return;
    }

    console.log('Submission successful:', data);
    setSuccess(true); // You might show a success screen or navigate
  } catch (error) {
    console.error('Submission error:', error);
    // Optionally set an error state
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Registration Complete!
              </h2>
              <p className="text-gray-600 mb-6">
                Your doctor account has been created successfully.
              </p>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                />
               
              </div>
              <button  onClick={() => router.push('/login')} className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Login
          </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                <h1 className="text-2xl font-bold flex items-center">
                  <Stethoscope className="h-6 w-6 mr-2" />
                  Doctor Registration
                </h1>
                <p className="opacity-90">
                  Create your professional medical account
                </p>
              </div>

              {/* Step Indicator */}
              <div className="px-6 pt-6">
                <div className="flex justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center relative z-10 w-1/5">
                      <button
                        type="button"
                        onClick={() => {
                          if (index < currentStep) {
                            setPreviousStep(currentStep)
                            setCurrentStep(index)
                          }
                        }}
                        disabled={index > currentStep}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                          index <= currentStep 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        } ${index < currentStep ? 'cursor-pointer hover:bg-indigo-700' : ''}`}
                      >
                        <step.icon className="h-5 w-5" />
                      </button>
                      <span className={`text-xs mt-2 text-center ${
                        index <= currentStep ? 'text-indigo-600 font-medium' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`absolute top-5 left-1/2 w-full h-1 transform -translate-y-1/2 ${
                          index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={steps[currentStep].id}
                    initial={{ opacity: 0, x: currentStep > previousStep ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: currentStep > previousStep ? -50 : 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 0 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                          <User className="h-5 w-5 text-indigo-600 mr-2" />
                          Personal Information
                        </h3>
                        
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            {formData.profileImage ? (
                              <>
                                <img 
                                  src={formData.profileImage} 
                                  alt="Profile" 
                                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                                />
                                <button
                                  type="button"
                                  onClick={removeProfileImage}
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                <Image className="h-12 w-12 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                            id="profileImage"
                          />
                          <label
                            htmlFor="profileImage"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
                          >
                            {formData.profileImage ? 'Change Photo' : 'Upload Photo'}
                          </label>
                          {errors.profileImage && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.profileImage}
                            </p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="John"
                              />
                            </div>
                            {errors.firstName && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" /> {errors.firstName}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => handleInputChange('lastName', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.lastName ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Doe"
                            />
                            {errors.lastName && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" /> {errors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                                }`}
                              />
                            </div>
                            {errors.dateOfBirth && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" /> {errors.dateOfBirth}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                            <div className="relative">
                              <select
                                value={formData.gender}
                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
                                  errors.gender ? 'border-red-300' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Select gender</option>
                                {genderOptions.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                            {errors.gender && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1" /> {errors.gender}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.email ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="doctor@example.com"
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.phone ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.password ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Create a password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.password}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Use 8 or more characters with a mix of letters, numbers & symbols
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Confirm your password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                          <Stethoscope className="h-5 w-5 text-indigo-600 mr-2" />
                          Professional Details
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Specialty*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Stethoscope className="h-4 w-4 text-gray-400" />
                            </div>
                            <select
                              value={formData.specialty}
                              onChange={(e) => handleInputChange('specialty', e.target.value)}
                              className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
                                errors.specialty ? 'border-red-300' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select your specialty</option>
                              {specialties.map(specialty => (
                                <option key={specialty} value={specialty}>{specialty}</option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          {errors.specialty && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.specialty}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Specialty (Optional)</label>
                          <input
                            type="text"
                            value={formData.supSpeciality}
                            onChange={(e) => handleInputChange('supSpeciality', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="e.g. Pediatric Cardiology"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              value={formData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.experience ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="5"
                            />
                          </div>
                          {errors.experience && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.experience}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Hospital className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={formData.hospital}
                              onChange={(e) => handleInputChange('hospital', e.target.value)}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.hospital ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Current workplace"
                            />
                          </div>
                          {errors.hospital && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.hospital}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Contact Number*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              value={formData.hospitalNumber}
                              onChange={(e) => handleInputChange('hospitalNumber', e.target.value)}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.hospitalNumber ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Hospital phone number"
                            />
                          </div>
                          {errors.hospitalNumber && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.hospitalNumber}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Address</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MapPin className="h-4 w-4 text-gray-400" />
                            </div>
                            <textarea
                              value={formData.hospitalAddress}
                              onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.hospitalAddress ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Full hospital/clinic address"
                              rows="2"
                            />
                          </div>
                          {errors.hospitalAddress && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.hospitalAddress}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                          <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                          Availability
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Working Days*</label>
                          <div className="flex flex-wrap gap-2">
                            {daysOfWeek.map(day => (
                              <button
                                key={day}
                                type="button"
                                onClick={() => toggleDay(day)}
                                className={`px-3 py-1 rounded-full text-sm transition-all ${
                                  formData.available.days.includes(day)
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {day}
                              </button>
                            ))}
                          </div>
                          {errors.availableDays && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.availableDays}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={formData.available.time}
                              onChange={(e) => handleInputChange('available.time', e.target.value)}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.availableTime ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="e.g. 9:00 AM - 5:00 PM"
                            />
                          </div>
                          {errors.availableTime && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.availableTime}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                          <ClipboardCheck className="h-5 w-5 text-indigo-600 mr-2" />
                          Credentials
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Medical License Number*</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FileText className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              value={formData.licenseNumber}
                              onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
                              }`}
                              placeholder="Enter your medical license number"
                            />
                          </div>
                          {errors.licenseNumber && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.licenseNumber}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications*</label>
                          <div className="space-y-2">
                            {qualifications.map(qualification => (
                              <div key={qualification} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`qual-${qualification}`}
                                  checked={formData.qualifications.includes(qualification)}
                                  onChange={() => toggleQualification(qualification)}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`qual-${qualification}`} className="ml-2 text-sm text-gray-700">
                                  {qualification}
                                </label>
                              </div>
                            ))}
                          </div>
                          {errors.qualifications && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" /> {errors.qualifications}
                            </p>
                          )}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-1">Document Verification</p>
                              <p>After registration, you'll need to upload the following documents for verification:</p>
                              <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Medical license certificate</li>
                                <li>Degree certificate</li>
                                <li>Government-issued ID</li>
                                <li>Hospital affiliation letter</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>                    )}

                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                          <BadgeCheck className="h-5 w-5 text-indigo-600 mr-2" />
                          Review Your Information
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <User className="h-4 w-4 text-indigo-600 mr-2" />
                            Personal Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Full Name</p>
                              <p className="font-medium">
                                {formData.firstName} {formData.lastName}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Date of Birth</p>
                              <p className="font-medium">
                                {formData.dateOfBirth || 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Gender</p>
                              <p className="font-medium">
                                {formData.gender || 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Email</p>
                              <p className="font-medium">{formData.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Phone</p>
                              <p className="font-medium">{formData.phone}</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <Stethoscope className="h-4 w-4 text-indigo-600 mr-2" />
                            Professional Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Specialty</p>
                              <p className="font-medium">{formData.specialty}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Sub-Specialty</p>
                              <p className="font-medium">
                                {formData.supSpeciality || 'None'}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Experience</p>
                              <p className="font-medium">
                                {formData.experience} years
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Hospital/Clinic</p>
                              <p className="font-medium">{formData.hospital}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Hospital Contact</p>
                              <p className="font-medium">{formData.hospitalNumber}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Hospital Address</p>
                              <p className="font-medium">
                                {formData.hospitalAddress || 'Not provided'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <Clock className="h-4 w-4 text-indigo-600 mr-2" />
                            Availability
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Working Days</p>
                              <p className="font-medium">
                                {formData.available.days.length > 0
                                  ? formData.available.days.join(', ')
                                  : 'Not specified'}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Working Hours</p>
                              <p className="font-medium">
                                {formData.available.time || 'Not specified'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <GraduationCap className="h-4 w-4 text-indigo-600 mr-2" />
                            Credentials
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">License Number</p>
                              <p className="font-medium">{formData.licenseNumber}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Qualifications</p>
                              <p className="font-medium">
                                {formData.qualifications.join(', ')}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                            required
                          />
                          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                            I certify that all information provided is accurate and complete.
                            I agree to the Terms of Service and Privacy Policy.
                          </label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex justify-between">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Registration
                          <BadgeCheck className="h-4 w-4 ml-2" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      
      </div>
    </div>
  )
}

