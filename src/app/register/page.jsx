'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiCalendar } from 'react-icons/fi';
import { FaHeartbeat, FaUserInjured, FaClinicMedical, FaStethoscope } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const specialties = [
  'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 
  'Dermatology', 'Psychiatry', 'Oncology', 'Gynecology',
  'Urology', 'Ophthalmology', 'ENT', 'General Medicine'
];

const qualifications = [
  'MBBS', 'MD', 'MS', 'DM', 'MCh', 'DNB', 
  'BDS', 'MDS', 'BPT', 'MPT', 'PhD'
];

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const doctorSteps = [
  { id: 'personal', title: 'Personal Information', icon: FiUser },
  { id: 'professional', title: 'Professional Details', icon: FaStethoscope },
  { id: 'availability', title: 'Availability', icon: FiCalendar },
  { id: 'credentials', title: 'Credentials', icon: FiLock },
  { id: 'review', title: 'Review', icon: FaClinicMedical }
];

export default function RegistrationPortal() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  
  // Patient form state
  const [patientFormData, setPatientFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    bloodType: '',
    password: '',
    confirmPassword: ''
  });
  const [currentPatientStep, setCurrentPatientStep] = useState(1);
  const [isPatientLoading, setIsPatientLoading] = useState(false);
  const [patientRegistrationSuccess, setPatientRegistrationSuccess] = useState(false);

  // Doctor form state
  const [currentDoctorStep, setCurrentDoctorStep] = useState(0);
  const [previousDoctorStep, setPreviousDoctorStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [doctorFormData, setDoctorFormData] = useState({
    firstName: '',
    lastName: '',
    profileImage: null,
    profileImageUrl: '',
    consultantFee: '',
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
  });
  const [doctorErrors, setDoctorErrors] = useState({});
  const [isDoctorSubmitting, setIsDoctorSubmitting] = useState(false);
  const [doctorSuccess, setDoctorSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const roles = [
    {
      id: 'patient-registration',
      title: 'Patient',
      description: 'Register to book appointments and manage your health records',
      icon: '👨‍⚕️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'doctor-registration',
      title: 'Doctor',
      description: 'Join our network of healthcare professionals',
      icon: '🩺',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'clinic-registration',
      title: 'Clinic',
      description: 'Register your healthcare facility with our platform',
      icon: '🏥',
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  // Patient form handlers
  const handlePatientFormChange = (e) => {
    const { name, value } = e.target;
    setPatientFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();

    if (currentPatientStep === 3) {
      setIsPatientLoading(true);
      try {
        const response = await fetch('https://practo-backend.vercel.app/api/patients/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(patientFormData)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Registration successful:', result);
          setPatientRegistrationSuccess(true);
          
          setTimeout(() => {
            setPatientFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              dob: '',
              gender: '',
              bloodType: '',
              password: '',
              confirmPassword: ''
            });
            setCurrentPatientStep(1);
            setIsPatientLoading(false);
            setShowPatientModal(false);
            setPatientRegistrationSuccess(false);
          }, 2000);
        } else {
          const error = await response.json();
          console.error('Registration failed:', error);
          alert(`Registration failed: ${error.message || 'Server Error'}`);
          setIsPatientLoading(false);
        }
      } catch (err) {
        console.error('Error submitting form:', err);
        alert('Network or server error occurred');
        setIsPatientLoading(false);
      }
    }
  };

  const nextPatientStep = () => setCurrentPatientStep(prev => prev + 1);
  const prevPatientStep = () => setCurrentPatientStep(prev => prev - 1);

  // Doctor form handlers
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

  const handleDoctorInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setDoctorFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setDoctorFormData(prev => ({ ...prev, [field]: value }));
    }
    
    if (doctorErrors[field]) {
      setDoctorErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsDoctorSubmitting(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setDoctorFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);

      const cloudinaryUrl = await uploadImageToCloudinary(file);
      setDoctorFormData(prev => ({ ...prev, profileImageUrl: cloudinaryUrl }));
      
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsDoctorSubmitting(false);
    }
  };

  const removeProfileImage = () => {
    setDoctorFormData(prev => ({ ...prev, profileImage: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleDay = (day) => {
    setDoctorFormData(prev => {
      const newDays = prev.available.days.includes(day)
        ? prev.available.days.filter(d => d !== day)
        : [...prev.available.days, day];
      return {
        ...prev,
        available: {
          ...prev.available,
          days: newDays
        }
      }
    });
  };

  const toggleQualification = (qualification) => {
    setDoctorFormData(prev => {
      const newQualifications = prev.qualifications.includes(qualification)
        ? prev.qualifications.filter(q => q !== qualification)
        : [...prev.qualifications, qualification];
      return {
        ...prev,
        qualifications: newQualifications
      }
    });
  };

  const validateDoctorStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!doctorFormData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!doctorFormData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!doctorFormData.profileImage) newErrors.profileImage = 'Profile image is required';
      if (!doctorFormData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
      if (!doctorFormData.gender) newErrors.gender = 'Gender is required';
      if (!doctorFormData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(doctorFormData.email)) newErrors.email = 'Email is invalid';
      if (!doctorFormData.password) newErrors.password = 'Password is required';
      else if (doctorFormData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!doctorFormData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
      else if (doctorFormData.password !== doctorFormData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!doctorFormData.phone.trim()) newErrors.phone = 'Phone is required';
    } else if (step === 1) {
      if (!doctorFormData.specialty) newErrors.specialty = 'Specialty is required';
      if (!doctorFormData.experience.trim()) newErrors.experience = 'Experience is required';
      if (!doctorFormData.hospital.trim()) newErrors.hospital = 'Hospital/clinic is required';
      if (!doctorFormData.consultantFee) newErrors.consultantFee = 'Consultation fee is required';
      if (!doctorFormData.hospitalNumber.trim()) newErrors.hospitalNumber = 'Hospital contact number is required';
    } else if (step === 2) {
      if (doctorFormData.available.days.length === 0) newErrors.availableDays = 'Select at least one working day';
      if (!doctorFormData.available.time.trim()) newErrors.availableTime = 'Working hours are required';
    } else if (step === 3) {
      if (!doctorFormData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (doctorFormData.qualifications.length === 0) newErrors.qualifications = 'Select at least one qualification';
    }
    
    setDoctorErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextDoctorStep = () => {
    if (validateDoctorStep(currentDoctorStep)) {
      setPreviousDoctorStep(currentDoctorStep);
      setCurrentDoctorStep(prev => Math.min(prev + 1, doctorSteps.length - 1));
    }
  };

  const prevDoctorStep = () => {
    setPreviousDoctorStep(currentDoctorStep);
    setCurrentDoctorStep(prev => Math.max(prev - 1, 0));
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateDoctorStep(currentDoctorStep)) {
      return;
    }

    if (currentDoctorStep < doctorSteps.length - 1) {
      nextDoctorStep();
      return;
    }

    setIsDoctorSubmitting(true);
    const cleanedData = {
      firstName: doctorFormData.firstName,
      lastName: doctorFormData.lastName,
      dateOfBirth: doctorFormData.dateOfBirth,
      consultantFee: doctorFormData.consultantFee,
      profileImage: doctorFormData.profileImageUrl,
      gender: doctorFormData.gender,
      email: doctorFormData.email,
      password: doctorFormData.password,
      phone: doctorFormData.phone,
      specialty: doctorFormData.specialty,
      supSpeciality: doctorFormData.supSpeciality,
      experience: doctorFormData.experience,
      qualifications: doctorFormData.qualifications,
      licenseNumber: doctorFormData.licenseNumber,
      hospital: doctorFormData.hospital,
      hospitalAddress: doctorFormData.hospitalAddress,
      hospitalNumber: doctorFormData.hospitalNumber,
      available: doctorFormData.available
    };

    try {
      const response = await fetch('https://practo-backend.vercel.app/api/doctor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', data.message);
        return;
      }

      console.log('Submission successful:', data);
      setDoctorSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsDoctorSubmitting(false);
    }
  };

  const handleCardClick = (roleId) => {
    if (roleId === 'patient-registration') {
      setShowPatientModal(true);
    } else if (roleId === 'doctor-registration') {
      setShowDoctorModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Healthcare Network</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your role to begin your registration journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${hoveredCard === role.id ? 'scale-105' : 'scale-100'}`}
              onMouseEnter={() => setHoveredCard(role.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(role.id)}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-10`}></div>
              <div className="relative p-8 h-full flex flex-col">
                <div className="text-5xl mb-6">{role.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{role.description}</p>
                <div className="mt-auto">
                  <button className={`w-full py-3 px-6 rounded-lg font-medium bg-gradient-to-br ${role.color} text-white shadow-md hover:shadow-lg transition-all`}>
                    Register as {role.title}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Patient Registration Modal */}
      <AnimatePresence>
        {showPatientModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => !isPatientLoading && setShowPatientModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Side - Illustration */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-cyan-50 p-8"
                >
                  <div className="relative w-full h-96">
                    <img src="/pateint-login.png" alt="Patient" className="w-full h-full object-contain" />
                    
                    <motion.div
                      animate={{
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute top-10 left-20 bg-white p-3 rounded-full shadow-lg"
                    >
                      <FaHeartbeat className="text-red-400 text-2xl" />
                    </motion.div>
                    
                    <motion.div
                      animate={{
                        y: [0, 15, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                      className="absolute bottom-20 right-10 bg-white p-3 rounded-full shadow-lg"
                    >
                      <FaUserInjured className="text-blue-400 text-2xl" />
                    </motion.div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mt-8 text-center">
                    Your Health Journey Starts Here
                  </h2>
                  <p className="text-gray-600 mt-2 text-center max-w-md">
                    Join thousands of patients getting personalized care from top doctors
                  </p>
                </motion.div>

                {/* Right Side - Form */}
                <form onSubmit={handlePatientSubmit} className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">Patient Registration</h1>
                      <p className="text-gray-500">Step {currentPatientStep} of 3</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        if (!isPatientLoading) {
                          setShowPatientModal(false);
                          setCurrentPatientStep(1);
                        }
                      }}
                      className="text-gray-400 hover:text-gray-500"
                      disabled={isPatientLoading}
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex space-x-2 mb-8">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step}
                        className={`flex-1 h-2 rounded-full ${currentPatientStep >= step ? 'bg-blue-500' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode='wait'>
                    {currentPatientStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="firstName"
                                value={patientFormData.firstName}
                                onChange={handlePatientFormChange}
                                className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                                placeholder="John"
                                required
                                disabled={isPatientLoading}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="lastName"
                                value={patientFormData.lastName}
                                onChange={handlePatientFormChange}
                                className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                                placeholder="Doe"
                                required
                                disabled={isPatientLoading}
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={patientFormData.email}
                              onChange={handlePatientFormChange}
                              className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                              placeholder="your@email.com"
                              required
                              disabled={isPatientLoading}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiPhone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={patientFormData.phone}
                              onChange={handlePatientFormChange}
                              className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                              placeholder="+1 (555) 123-4567"
                              disabled={isPatientLoading}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <motion.button
                            type="button" 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={nextPatientStep}
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
                            disabled={isPatientLoading}
                          >
                            Next: Medical Info
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {currentPatientStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiCalendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="date"
                              name="dob"
                              value={patientFormData.dob}
                              onChange={handlePatientFormChange}
                              className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                              required
                              disabled={isPatientLoading}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                          <select
                            name="gender"
                            value={patientFormData.gender}
                            onChange={handlePatientFormChange}
                            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                            disabled={isPatientLoading}
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                          <select
                            name="bloodType"
                            value={patientFormData.bloodType || ''}
                            onChange={handlePatientFormChange}
                            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                            disabled={isPatientLoading}
                          >
                            <option value="">Select blood type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>

                        <div className="flex justify-between">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={prevPatientStep}
                            className="text-gray-600 py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                            disabled={isPatientLoading}
                          >
                            Back
                          </motion.button>
                          <motion.button
                            type="button" 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={nextPatientStep}
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
                            disabled={isPatientLoading}
                          >
                            Next: Account Setup
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {currentPatientStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="password"
                              name="password"
                              value={patientFormData.password}
                              onChange={handlePatientFormChange}
                              className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                              placeholder="••••••••"
                              required
                              disabled={isPatientLoading}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={patientFormData.confirmPassword}
                              onChange={handlePatientFormChange}
                              className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 py-3"
                              placeholder="••••••••"
                              required
                              disabled={isPatientLoading}
                            />
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              type="checkbox"
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                              required
                              disabled={isPatientLoading}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-gray-700">
                              I agree to the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={prevPatientStep}
                            className="text-gray-600 py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                            disabled={isPatientLoading}
                          >
                            Back
                          </motion.button>
                          
                          {isPatientLoading ? (
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-8 rounded-lg shadow-lg flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </div>
                          ) : patientRegistrationSuccess ? (
                            <div className="bg-green-500 text-white py-3 px-8 rounded-lg shadow-lg flex items-center gap-2">
                              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Registration Successful!
                            </div>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              type="submit"
                              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition flex items-center gap-2"
                            >
                              <FaClinicMedical className="text-lg" />
                              Complete Registration
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <a href="#" className="text-blue-600 font-medium hover:text-blue-500">Sign in</a>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Doctor Registration Modal */}
      <AnimatePresence>
        {showDoctorModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => !isDoctorSubmitting && setShowDoctorModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                  <h1 className="text-2xl font-bold flex items-center">
                    <FaStethoscope className="h-6 w-6 mr-2" />
                    Doctor Registration
                  </h1>
                  <p className="opacity-90">
                    Create your professional medical account
                  </p>
                </div>

                {/* Step Indicator */}
                <div className="px-6 pt-6">
                  <div className="flex justify-between">
                    {doctorSteps.map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center relative z-10 w-1/5">
                        <button
                          type="button"
                          onClick={() => {
                            if (index < currentDoctorStep) {
                              setPreviousDoctorStep(currentDoctorStep);
                              setCurrentDoctorStep(index);
                            }
                          }}
                          disabled={index > currentDoctorStep}
                          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                            index <= currentDoctorStep 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-gray-200 text-gray-600'
                          } ${index < currentDoctorStep ? 'cursor-pointer hover:bg-indigo-700' : ''}`}
                        >
                          <step.icon className="h-5 w-5" />
                        </button>
                        <span className={`text-xs mt-2 text-center ${
                          index <= currentDoctorStep ? 'text-indigo-600 font-medium' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </span>
                        {index < doctorSteps.length - 1 && (
                          <div className={`absolute top-5 left-1/2 w-full h-1 transform -translate-y-1/2 ${
                            index < currentDoctorStep ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleDoctorSubmit} className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={doctorSteps[currentDoctorStep].id}
                      initial={{ opacity: 0, x: currentDoctorStep > previousDoctorStep ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: currentDoctorStep > previousDoctorStep ? -50 : 50 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentDoctorStep === 0 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                            <FiUser className="h-5 w-5 text-indigo-600 mr-2" />
                            Personal Information
                          </h3>
                          
                          <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                              {doctorFormData.profileImage ? (
                                <>
                                  <img 
                                    src={doctorFormData.profileImage} 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                                  />
                                  <button
                                    type="button"
                                    onClick={removeProfileImage}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                  >
                                    <FiUser className="h-4 w-4" />
                                  </button>
                                </>
                              ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                                  <FiUser className="h-12 w-12 text-gray-400" />
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
                              {doctorFormData.profileImage ? 'Change Photo' : 'Upload Photo'}
                            </label>
                            {doctorErrors.profileImage && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.profileImage}
                              </p>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <FiUser className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                  type="text"
                                  value={doctorFormData.firstName}
                                  onChange={(e) => handleDoctorInputChange('firstName', e.target.value)}
                                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                    doctorErrors.firstName ? 'border-red-300' : 'border-gray-300'
                                  }`}
                                  placeholder="John"
                                />
                              </div>
                              {doctorErrors.firstName && (
                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                  <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.firstName}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                              <input
                                type="text"
                                value={doctorFormData.lastName}
                                onChange={(e) => handleDoctorInputChange('lastName', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.lastName ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Doe"
                              />
                              {doctorErrors.lastName && (
                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                  <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.lastName}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth*</label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <FiCalendar className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                  type="date"
                                  value={doctorFormData.dateOfBirth}
                                  onChange={(e) => handleDoctorInputChange('dateOfBirth', e.target.value)}
                                  max={new Date().toISOString().split('T')[0]}
                                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                    doctorErrors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                                  }`}
                                />
                              </div>
                              {doctorErrors.dateOfBirth && (
                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                  <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.dateOfBirth}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                              <div className="relative">
                                <select
                                  value={doctorFormData.gender}
                                  onChange={(e) => handleDoctorInputChange('gender', e.target.value)}
                                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
                                    doctorErrors.gender ? 'border-red-300' : 'border-gray-300'
                                  }`}
                                >
                                  <option value="">Select gender</option>
                                  {genderOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                  <FiUser className="h-4 w-4 text-gray-400" />
                                </div>
                              </div>
                              {doctorErrors.gender && (
                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                  <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.gender}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                value={doctorFormData.email}
                                onChange={(e) => handleDoctorInputChange('email', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.email ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="doctor@example.com"
                              />
                            </div>
                            {doctorErrors.email && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.email}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                value={doctorFormData.phone}
                                onChange={(e) => handleDoctorInputChange('phone', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.phone ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                            {doctorErrors.phone && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.phone}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type={showPassword ? "text" : "password"}
                                value={doctorFormData.password}
                                onChange={(e) => handleDoctorInputChange('password', e.target.value)}
                                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.password ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Create a password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? (
                                  <FiLock className="h-4 w-4" />
                                ) : (
                                  <FiLock className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            {doctorErrors.password && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.password}
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
                                <FiLock className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={doctorFormData.confirmPassword}
                                onChange={(e) => handleDoctorInputChange('confirmPassword', e.target.value)}
                                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Confirm your password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                              >
                                {showConfirmPassword ? (
                                  <FiLock className="h-4 w-4" />
                                ) : (
                                  <FiLock className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            {doctorErrors.confirmPassword && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.confirmPassword}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {currentDoctorStep === 1 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                            <FaStethoscope className="h-5 w-5 text-indigo-600 mr-2" />
                            Professional Details
                          </h3>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Specialty*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaStethoscope className="h-4 w-4 text-gray-400" />
                              </div>
                              <select
                                value={doctorFormData.specialty}
                                onChange={(e) => handleDoctorInputChange('specialty', e.target.value)}
                                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none ${
                                  doctorErrors.specialty ? 'border-red-300' : 'border-gray-300'
                                }`}
                              >
                                <option value="">Select your specialty</option>
                                {specialties.map(specialty => (
                                  <option key={specialty} value={specialty}>{specialty}</option>
                                ))}
                              </select>
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <FiUser className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                            {doctorErrors.specialty && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.specialty}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Specialty (Optional)</label>
                            <input
                              type="text"
                              value={doctorFormData.supSpeciality}
                              onChange={(e) => handleDoctorInputChange('supSpeciality', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                              placeholder="e.g. Pediatric Cardiology"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiCalendar className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="number"
                                min="0"
                                max="50"
                                value={doctorFormData.experience}
                                onChange={(e) => handleDoctorInputChange('experience', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.experience ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="5"
                              />
                            </div>
                            {doctorErrors.experience && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.experience}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hospital/Clinic*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaClinicMedical className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                value={doctorFormData.hospital}
                                onChange={(e) => handleDoctorInputChange('hospital', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.hospital ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Current workplace"
                              />
                            </div>
                            {doctorErrors.hospital && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.hospital}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Contact Number*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                value={doctorFormData.hospitalNumber}
                                onChange={(e) => handleDoctorInputChange('hospitalNumber', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.hospitalNumber ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Hospital phone number"
                              />
                            </div>
                            {doctorErrors.hospitalNumber && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.hospitalNumber}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Address</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-4 w-4 text-gray-400" />
                              </div>
                              <textarea
                                value={doctorFormData.hospitalAddress}
                                onChange={(e) => handleDoctorInputChange('hospitalAddress', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.hospitalAddress ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Full hospital/clinic address"
                                rows="2"
                              />
                            </div>
                            {doctorErrors.hospitalAddress && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.hospitalAddress}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">₹</span>
                              </div>
                              <input
                                type="number"
                                min="0"
                                value={doctorFormData.consultantFee}
                                onChange={(e) => handleDoctorInputChange('consultantFee', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.consultantFee ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="e.g. 500"
                              />
                            </div>
                            {doctorErrors.consultantFee && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.consultantFee}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {currentDoctorStep === 2 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                            <FiCalendar className="h-5 w-5 text-indigo-600 mr-2" />
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
                                    doctorFormData.available.days.includes(day)
                                      ? 'bg-indigo-600 text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {day}
                                </button>
                              ))}
                            </div>
                            {doctorErrors.availableDays && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.availableDays}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiCalendar className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                value={doctorFormData.available.time}
                                onChange={(e) => handleDoctorInputChange('available.time', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.availableTime ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="e.g. 9:00 AM - 5:00 PM"
                              />
                            </div>
                            {doctorErrors.availableTime && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.availableTime}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {currentDoctorStep === 3 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                            <FiLock className="h-5 w-5 text-indigo-600 mr-2" />
                            Credentials
                          </h3>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Medical License Number*</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-4 w-4 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                value={doctorFormData.licenseNumber}
                                onChange={(e) => handleDoctorInputChange('licenseNumber', e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                  doctorErrors.licenseNumber ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your medical license number"
                              />
                            </div>
                            {doctorErrors.licenseNumber && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.licenseNumber}
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
                                    checked={doctorFormData.qualifications.includes(qualification)}
                                    onChange={() => toggleQualification(qualification)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                  />
                                  <label htmlFor={`qual-${qualification}`} className="ml-2 text-sm text-gray-700">
                                    {qualification}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {doctorErrors.qualifications && (
                              <p className="text-red-500 text-xs mt-1 flex items-center">
                                <FaUserInjured className="h-3 w-3 mr-1" /> {doctorErrors.qualifications}
                              </p>
                            )}
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start">
                              <FaUserInjured className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
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
                        </div>                    
                      )}

                      {currentDoctorStep === 4 && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                            <FaClinicMedical className="h-5 w-5 text-indigo-600 mr-2" />
                            Review Your Information
                          </h3>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                              <FiUser className="h-4 w-4 text-indigo-600 mr-2" />
                              Personal Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Full Name</p>
                                <p className="font-medium">
                                  {doctorFormData.firstName} {doctorFormData.lastName}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Date of Birth</p>
                                <p className="font-medium">
                                  {doctorFormData.dateOfBirth || 'Not provided'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Gender</p>
                                <p className="font-medium">
                                  {doctorFormData.gender || 'Not provided'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Email</p>
                                <p className="font-medium">{doctorFormData.email}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Phone</p>
                                <p className="font-medium">{doctorFormData.phone}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                              <FaStethoscope className="h-4 w-4 text-indigo-600 mr-2" />
                              Professional Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Specialty</p>
                                <p className="font-medium">{doctorFormData.specialty}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Sub-Specialty</p>
                                <p className="font-medium">
                                  {doctorFormData.supSpeciality || 'None'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Experience</p>
                                <p className="font-medium">
                                  {doctorFormData.experience} years
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Hospital/Clinic</p>
                                <p className="font-medium">{doctorFormData.hospital}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Hospital Contact</p>
                                <p className="font-medium">{doctorFormData.hospitalNumber}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Hospital Address</p>
                                <p className="font-medium">
                                  {doctorFormData.hospitalAddress || 'Not provided'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Consultation Fee</p>
                                <p className="font-medium">
                                  {doctorFormData.consultantFee ? `₹${doctorFormData.consultantFee}` : 'Not specified'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                              <FiCalendar className="h-4 w-4 text-indigo-600 mr-2" />
                              Availability
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Working Days</p>
                                <p className="font-medium">
                                  {doctorFormData.available.days.length > 0
                                    ? doctorFormData.available.days.join(', ')
                                    : 'Not specified'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Working Hours</p>
                                <p className="font-medium">
                                  {doctorFormData.available.time || 'Not specified'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                              <FiLock className="h-4 w-4 text-indigo-600 mr-2" />
                              Credentials
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">License Number</p>
                                <p className="font-medium">{doctorFormData.licenseNumber}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Qualifications</p>
                                <p className="font-medium">
                                  {doctorFormData.qualifications.join(', ')}
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
                    {currentDoctorStep > 0 ? (
                      <button
                        type="button"
                        onClick={prevDoctorStep}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                      >
                        <FiUser className="h-4 w-4 mr-2" />
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {currentDoctorStep < doctorSteps.length - 1 ? (
                      <button
                        type="button"
                        onClick={nextDoctorStep}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                      >
                        Next
                        <FiUser className="h-4 w-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isDoctorSubmitting}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isDoctorSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : doctorSuccess ? (
                          <>
                            Registration Complete!
                            <FaClinicMedical className="h-4 w-4 ml-2" />
                          </>
                        ) : (
                          <>
                            Submit Registration
                            <FaClinicMedical className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}