// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ClinicRegistrationForm() {
//   const [formData, setFormData] = useState({
//     clinicName: '',
//     address: '',
//     city: '',
//     state: '',
//     postalCode: '',
//     country: '',
//     phone: '',
//     email: '',
//     website: '',
//     registrationNumber: '',
//     taxId: '',
//     clinicType: 'general',
//     specialties: [],
//     openingHours: {
//       monday: { open: '09:00', close: '17:00' },
//       tuesday: { open: '09:00', close: '17:00' },
//       wednesday: { open: '09:00', close: '17:00' },
//       thursday: { open: '09:00', close: '17:00' },
//       friday: { open: '09:00', close: '17:00' },
//       saturday: { open: '', close: '' },
//       sunday: { open: '', close: '' },
//     },
//     description: '',
//     logo: null,
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errors, setErrors] = useState({});
//   const router = useRouter();

//   const clinicTypes = [
//     { value: 'general', label: 'General Practice' },
//     { value: 'specialty', label: 'Specialty Clinic' },
//     { value: 'dental', label: 'Dental Clinic' },
//     { value: 'pediatric', label: 'Pediatric Clinic' },
//     { value: 'surgical', label: 'Surgical Center' },
//     { value: 'diagnostic', label: 'Diagnostic Center' },
//   ];

//   const medicalSpecialties = [
//     'Cardiology',
//     'Dermatology',
//     'Endocrinology',
//     'Gastroenterology',
//     'Neurology',
//     'Oncology',
//     'Ophthalmology',
//     'Orthopedics',
//     'Pediatrics',
//     'Psychiatry',
//     'Pulmonology',
//     'Rheumatology',
//     'Urology',
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSpecialtyChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData(prev => {
//       if (checked) {
//         return {
//           ...prev,
//           specialties: [...prev.specialties, value]
//         };
//       } else {
//         return {
//           ...prev,
//           specialties: prev.specialties.filter(s => s !== value)
//         };
//       }
//     });
//   };

//   const handleOpeningHoursChange = (day, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       openingHours: {
//         ...prev.openingHours,
//         [day]: {
//           ...prev.openingHours[day],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       logo: e.target.files[0]
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.clinicName.trim()) {
//       newErrors.clinicName = 'Clinic name is required';
//     }
    
//     if (!formData.address.trim()) {
//       newErrors.address = 'Address is required';
//     }
    
//     if (!formData.city.trim()) {
//       newErrors.city = 'City is required';
//     }
    
//     if (!formData.country.trim()) {
//       newErrors.country = 'Country is required';
//     }
    
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^[\d\s\+\-\(\)]{10,15}$/.test(formData.phone)) {
//       newErrors.phone = 'Invalid phone number format';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       // In a real application, you would send the data to your backend API
//       const formDataToSend = new FormData();
//       for (const key in formData) {
//         if (key === 'openingHours') {
//           formDataToSend.append(key, JSON.stringify(formData[key]));
//         } else if (key === 'logo' && formData[key]) {
//           formDataToSend.append(key, formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       }
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setSuccessMessage('Clinic registered successfully!');
//       setTimeout(() => {
//         // Redirect to clinic management page or dashboard
//         router.push('/dashboard');
//       }, 2000);
//     } catch (error) {
//       console.error('Registration error:', error);
//       setErrors({ submit: 'Failed to register clinic. Please try again.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//             Clinic Registration
//           </h1>
//           <p className="mt-3 text-xl text-gray-600">
//             Register your clinic to start managing your practice efficiently
//           </p>
//         </div>
        
//         {successMessage && (
//           <div className="mb-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//             {successMessage}
//           </div>
//         )}
        
//         {errors.submit && (
//           <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//             {errors.submit}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="p-8 space-y-8">
//             {/* Basic Information Section */}
//             <div className="border-b border-gray-200 pb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Information</h2>
              
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">
//                     Clinic Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="clinicName"
//                     name="clinicName"
//                     value={formData.clinicName}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.clinicName ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="Enter clinic name"
//                   />
//                   {errors.clinicName && <p className="mt-1 text-sm text-red-600">{errors.clinicName}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="clinicType" className="block text-sm font-medium text-gray-700 mb-1">
//                     Clinic Type
//                   </label>
//                   <select
//                     id="clinicType"
//                     name="clinicType"
//                     value={formData.clinicType}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     {clinicTypes.map(type => (
//                       <option key={type.value} value={type.value}>{type.label}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
              
//               <div className="mt-6">
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                   Clinic Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   rows={3}
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="Brief description about your clinic"
//                 />
//               </div>
              
//               <div className="mt-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Clinic Logo
//                 </label>
//                 <div className="mt-1 flex items-center">
//                   <div className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 mr-4">
//                     {formData.logo ? (
//                       <img src={URL.createObjectURL(formData.logo)} alt="Clinic logo" className="h-full w-full object-cover" />
//                     ) : (
//                       <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
//                       </svg>
//                     )}
//                   </div>
//                   <label className="cursor-pointer">
//                     <span className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                       Upload Logo
//                     </span>
//                     <input type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
//                   </label>
//                 </div>
//               </div>
//             </div>
            
//             {/* Contact Information Section */}
//             <div className="border-b border-gray-200 pb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
              
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//                     Address <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="Street address"
//                   />
//                   {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
//                     City <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="City"
//                   />
//                   {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
//                     State/Province
//                   </label>
//                   <input
//                     type="text"
//                     id="state"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="State or province"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
//                     ZIP/Postal Code
//                   </label>
//                   <input
//                     type="text"
//                     id="postalCode"
//                     name="postalCode"
//                     value={formData.postalCode}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Postal code"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
//                     Country <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="country"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="Country"
//                   />
//                   {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="+1 (555) 123-4567"
//                   />
//                   {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                     placeholder="contact@clinic.com"
//                   />
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                 </div>
                
//                 <div>
//                   <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
//                     Website
//                   </label>
//                   <input
//                     type="url"
//                     id="website"
//                     name="website"
//                     value={formData.website}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="https://yourclinic.com"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             {/* Business Information Section */}
//             <div className="border-b border-gray-200 pb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Business Information</h2>
              
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <div>
//                   <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                     Business Registration Number
//                   </label>
//                   <input
//                     type="text"
//                     id="registrationNumber"
//                     name="registrationNumber"
//                     value={formData.registrationNumber}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Registration number"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
//                     Tax ID
//                   </label>
//                   <input
//                     type="text"
//                     id="taxId"
//                     name="taxId"
//                     value={formData.taxId}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="Tax identification number"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             {/* Specialties Section */}
//             <div className="border-b border-gray-200 pb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Medical Specialties</h2>
              
//               <p className="text-sm text-gray-500 mb-4">Select all that apply</p>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {medicalSpecialties.map(specialty => (
//                   <div key={specialty} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`specialty-${specialty}`}
//                       value={specialty}
//                       checked={formData.specialties.includes(specialty)}
//                       onChange={handleSpecialtyChange}
//                       className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                     />
//                     <label htmlFor={`specialty-${specialty}`} className="ml-2 block text-sm text-gray-700">
//                       {specialty}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Opening Hours Section */}
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Opening Hours</h2>
              
//               <div className="space-y-4">
//                 {Object.entries(formData.openingHours).map(([day, hours]) => (
//                   <div key={day} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
//                     <label className="block text-sm font-medium text-gray-700 capitalize sm:text-right">
//                       {day}
//                     </label>
//                     <div className="flex items-center space-x-2">
//                       <input
//                         type="time"
//                         value={hours.open}
//                         onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                       <span className="text-gray-500">to</span>
//                       <input
//                         type="time"
//                         value={hours.close}
//                         onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       />
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={!hours.open && !hours.close}
//                         onChange={(e) => {
//                           if (e.target.checked) {
//                             handleOpeningHoursChange(day, 'open', '');
//                             handleOpeningHoursChange(day, 'close', '');
//                           } else {
//                             handleOpeningHoursChange(day, 'open', '09:00');
//                             handleOpeningHoursChange(day, 'close', '17:00');
//                           }
//                         }}
//                         className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                       />
//                       <label className="ml-2 block text-sm text-gray-700">
//                         Closed
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           {/* Form Footer */}
//           <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Registering...
//                 </>
//               ) : 'Register Clinic'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState,useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ClinicRegistrationForm() {
  const [formData, setFormData] = useState({
    clinicName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    registrationNumber: '',
    password: '',
    taxId: '',
    clinicType: 'general',
    specialties: [],
    openingHours: {
      monday: { open: '09:00', close: '17:00' },
      tuesday: { open: '09:00', close: '17:00' },
      wednesday: { open: '09:00', close: '17:00' },
      thursday: { open: '09:00', close: '17:00' },
      friday: { open: '09:00', close: '17:00' },
      saturday: { open: '', close: '' },
      sunday: { open: '', close: '' },
    },
    description: '',
    logo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
    const fileInputRef = useRef(null)
const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/clinicImages', {
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

  const clinicTypes = [
    { value: 'general', label: 'General Practice', icon: '🏥' },
    { value: 'specialty', label: 'Specialty Clinic', icon: '⚕️' },
    { value: 'dental', label: 'Dental Clinic', icon: '🦷' },
    { value: 'pediatric', label: 'Pediatric Clinic', icon: '👶' },
    { value: 'surgical', label: 'Surgical Center', icon: '🏥' },
    { value: 'diagnostic', label: 'Diagnostic Center', icon: '🔬' },
  ];

  const medicalSpecialties = [
    { name: 'Cardiology', icon: '❤️' },
    { name: 'Dermatology', icon: '🧴' },
    { name: 'Endocrinology', icon: '🧬' },
    { name: 'Gastroenterology', icon: '🫁' },
    { name: 'Neurology', icon: '🧠' },
    { name: 'Oncology', icon: '🎗️' },
    { name: 'Ophthalmology', icon: '👁️' },
    { name: 'Orthopedics', icon: '🦴' },
    { name: 'Pediatrics', icon: '👶' },
    { name: 'Psychiatry', icon: '🧘' },
    { name: 'Pulmonology', icon: '🫁' },
    { name: 'Rheumatology', icon: '🦴' },
    { name: 'Urology', icon: '🩺' },
  ];

  const steps = [
    { title: 'Basic Info', icon: '📋' },
    { title: 'Contact', icon: '📞' },
    { title: 'Business', icon: '💼' },
    { title: 'Specialties', icon: '⚕️' },
    { title: 'Hours', icon: '🕐' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecialtyChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          specialties: [...prev.specialties, value]
        };
      } else {
        return {
          ...prev,
          specialties: prev.specialties.filter(s => s !== value)
        };
      }
    });
  };

  const handleOpeningHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value
        }
      }
    }));
  };
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
    setFormData(prev => ({ ...prev, logo: cloudinaryUrl }));
    
  } catch (error) {
    console.error('Error uploading image:', error);
    // Handle error (show toast, etc.)
  } finally {
    setIsSubmitting(false);
  }
};
//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       logo: e.target.files[0]
//     }));
//   };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clinicName.trim()) {
      newErrors.clinicName = 'Clinic name is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\+\-\(\)]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
    newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
  }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'openingHours') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'logo' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      console.log(formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      try{
         const response = await fetch('https://practo-backend.vercel.app/api/clinic/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Ensure `formData` matches your Doctor schema
    });

    const data = await response.json();
console.log(data);
      }catch(err){
        console.log("Internal server error",err);

      }
      setSuccessMessage('Clinic registered successfully!');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Failed to register clinic. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Information
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                📋
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Basic Information
              </h2>
              <p className="text-gray-600 mt-2">Let's start with the basics about your clinic</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="group">
                <label htmlFor="clinicName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Clinic Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="clinicName"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-blue-300 ${errors.clinicName ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Enter clinic name"
                />
                {errors.clinicName && (
                  <p className="mt-2 text-sm text-red-600 animate-shake">{errors.clinicName}</p>
                )}
              </div>
              
              <div className="group">
                <label htmlFor="clinicType" className="block text-sm font-semibold text-gray-700 mb-2">
                  Clinic Type
                </label>
                <select
                  id="clinicType"
                  name="clinicType"
                  value={formData.clinicType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-blue-300"
                >
                  {clinicTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="group">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Clinic Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-blue-300 resize-none"
                placeholder="Tell us about your clinic's mission and services..."
              />
            </div>
            
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Clinic Logo
              </label>
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Clinic logo" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl text-blue-400">
                        🏥
                      </div>
                    )}
                  </div>
                </div>
                <label className="cursor-pointer group">
                  <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                    <span>📷</span>
                    <span className="font-medium">Upload Logo</span>
                  </div>
                  <input type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
            </div>
          </div>
        );

      case 1: // Contact Information
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                📞
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Contact Information
              </h2>
              <p className="text-gray-600 mt-2">How can patients reach your clinic?</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 ${errors.address ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Street address"
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600 animate-shake">{errors.address}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="mt-2 text-sm text-red-600 animate-shake">{errors.city}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300"
                  placeholder="State or province"
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700 mb-2">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300"
                  placeholder="Postal code"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 ${errors.country ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Country"
                />
                {errors.country && (
                  <p className="mt-2 text-sm text-red-600 animate-shake">{errors.country}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 animate-shake">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="contact@clinic.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 animate-shake">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300"
                  placeholder="https://yourclinic.com"
                />
              </div>
               <div className="group">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-green-300 ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Create a secure password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => {
                const passwordInput = document.getElementById('password');
                if (passwordInput.type === 'password') {
                  passwordInput.type = 'text';
                } else {
                  passwordInput.type = 'password';
                }
              }}
            >
              👁️
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 animate-shake">{errors.password}</p>
          )}
          <div className="mt-2 text-xs text-gray-500">
            Password must contain:
            <ul className="list-disc pl-5 mt-1">
              <li className={formData.password.length >= 8 ? 'text-green-500' : ''}>At least 8 characters</li>
              <li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}>One uppercase letter</li>
              <li className={/[a-z]/.test(formData.password) ? 'text-green-500' : ''}>One lowercase letter</li>
              <li className={/\d/.test(formData.password) ? 'text-green-500' : ''}>One number</li>
              <li className={/[@$!%*?&]/.test(formData.password) ? 'text-green-500' : ''}>One special character</li>
            </ul>
          </div>
        </div>
            </div>
          </div>
        );

      case 2: // Business Information
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                💼
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Business Information
              </h2>
              <p className="text-gray-600 mt-2">Official business details and registration</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 hover:border-orange-300"
                  placeholder="Registration number"
                />
              </div>
              
              <div>
                <label htmlFor="taxId" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tax ID
                </label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-orange-100 focus:border-orange-500 hover:border-orange-300"
                  placeholder="Tax identification number"
                />
              </div>
            </div>
          </div>
        );

      case 3: // Specialties
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                ⚕️
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Medical Specialties
              </h2>
              <p className="text-gray-600 mt-2">Select the specialties your clinic offers</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalSpecialties.map((specialty, index) => (
                <div 
                  key={specialty.name} 
                  className="group relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <input
                    type="checkbox"
                    id={`specialty-${specialty.name}`}
                    value={specialty.name}
                    checked={formData.specialties.includes(specialty.name)}
                    onChange={handleSpecialtyChange}
                    className="sr-only"
                  />
                  <label 
                    htmlFor={`specialty-${specialty.name}`}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      formData.specialties.includes(specialty.name)
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{specialty.icon}</span>
                      <span className="font-medium text-gray-800">{specialty.name}</span>
                      {formData.specialties.includes(specialty.name) && (
                        <span className="ml-auto text-purple-500">✓</span>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Opening Hours
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                🕐
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Opening Hours
              </h2>
              <p className="text-gray-600 mt-2">When is your clinic open for patients?</p>
            </div>

            <div className="space-y-4">
              {Object.entries(formData.openingHours).map(([day, hours], index) => (
                <div 
                  key={day} 
                  className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 animate-slideInLeft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-indigo-600 capitalize">{day.slice(0, 2)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 capitalize">{day}</h3>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                          disabled={!hours.open && !hours.close}
                          className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-300"
                        />
                        <span className="text-gray-500 font-medium">to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                          disabled={!hours.open && !hours.close}
                          className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400 transition-all duration-300"
                        />
                      </div>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!hours.open && !hours.close}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleOpeningHoursChange(day, 'open', '');
                              handleOpeningHoursChange(day, 'close', '');
                            } else {
                              handleOpeningHoursChange(day, 'open', '09:00');
                              handleOpeningHoursChange(day, 'close', '17:00');
                            }
                          }}
                          className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Closed</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white text-2xl mb-6 shadow-lg animate-bounce">
            🏥          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Register Your Clinic
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Complete the form to set up your clinic profile
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <li key={step.title} className="flex items-center">
                  {index < currentStep ? (
                    <button
                      onClick={() => setCurrentStep(index)}
                      className="group flex items-center cursor-pointer"
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </span>
                      <span className="ml-3 text-sm font-medium text-gray-900 group-hover:text-blue-600">
                        {step.title}
                      </span>
                    </button>
                  ) : index === currentStep ? (
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 bg-white text-blue-500 font-bold shadow-md">
                        {step.icon}
                      </span>
                      <span className="ml-3 text-sm font-medium text-blue-600">
                        {step.title}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 bg-white text-gray-400 font-bold">
                        {step.icon}
                      </span>
                      <span className="ml-3 text-sm font-medium text-gray-500">
                        {step.title}
                      </span>
                    </div>
                  )}
                  {index < steps.length - 1 && (
                    <span className="mx-4 h-0.5 w-8 bg-gray-300"></span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {successMessage ? (
            <div className="p-12 text-center">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
                <svg
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Registration Successful!
              </h3>
              <p className="text-lg text-gray-600 mb-6">{successMessage}</p>
              <div className="animate-pulse">
                <p className="text-sm text-gray-500">
                  Redirecting to Login...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-8 sm:p-10">
                {renderStepContent()}
              </div>

              {/* Form Navigation */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`px-8 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:shadow-md ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Complete Registration'
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}