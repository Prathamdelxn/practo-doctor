
// 'use client'
// import { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation'
// import { useAuth } from '@/context/AuthContext';
// import { 
//   EyeIcon, 
//   EyeSlashIcon, 
//   UserIcon, 
//   LockClosedIcon, 
//   ArrowRightIcon,
//   IdentificationIcon,
//   ShieldCheckIcon
// } from '@heroicons/react/24/outline';
// import Image from 'next/image';

// const AuthPage = () => {
//   const { login } = useAuth();
//     const router = useRouter()
//   const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
//   const [userType, setUserType] = useState('doctor'); // 'doctor' or 'admin'
//   const [showPassword, setShowPassword] = useState(false);

//   // Validation schemas
//   const loginSchema = Yup.object().shape({
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string().min(6, 'Too short!').required('Required'),
//   });

//   const signupSchema = Yup.object().shape({
//     name: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
//     password: Yup.string().min(6, 'Too short!').required('Required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Required'),
//   });

//   // const handleSubmit = (values) => {
//   //    const payload = {
//   //   ...values,
//   //   role: userType, // Send role info
//   // };
//   //   console.log(`${authMode === 'login' ? 'Logging in' : 'Signing up'} as ${userType}:`, payload);
//   // };


// //   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
// //   const payload = {
// //     name: values.name,
// //     email: values.email,
// //     password: values.password,
// //     role: userType, // 'doctor' or 'admin'
// //   };

// //   try {
// //     const res = await fetch("http://localhost:3001/api/admin/auth/signup", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(payload),
// //     });

// //     const data = await res.json();

// //     if (res.ok) {
// //       console.log("Signup successful:", data);
// //       alert("Signup successful");
// //       resetForm();
// //     } else {
// //       console.error("Signup failed:", data);
// //       alert(data.error || "Signup failed");
// //     }
// //   } catch (error) {
// //     console.error("Error occurred:", error);
// //     alert("An error occurred. Please try again.");
// //   } finally {
// //     setSubmitting(false);
// //   }
// // };

// const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//   const payload = {
//     name: values.name,
//     email: values.email,
//     password: values.password,
//     role: userType, // 'doctor' or 'admin'
//   };

//   try {
//     const apiBase = "https://practo-backend.vercel.app/api";
//     const endpoint =
//       authMode === "signup"
//         ? `${apiBase}/${userType}/auth/signup`
//         : `${apiBase}/${userType}/auth/login`;

//     const res = await fetch(endpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     console.log(data);

//     if (res.ok) {
//       console.log(`${authMode === "signup" ? "Signup" : "Login"} successful:`, data);
//       if (authMode === "login") {
//   login(data.token, data.user);

//   resetForm();
//   console.log(userType);
//   if(userType=="doctor"){
//        router.push("/doctor-dashboard");

//   }
//   else{
//    router.push("/admin");
   
//   }
 
// } else {

//   resetForm();
// }

//       alert(`${authMode === "signup" ? "Signup" : "Login"} successful`);
     
//       resetForm();
//     } else {
//       console.error("Failed:", data);
//       alert(data.error || "Something went wrong");
//     }
//   } catch (error) {
//     console.error("Error occurred:", error);
//     alert("An error occurred. Please try again.");
//   } finally {
//     setSubmitting(false);
//   }
// };


//   return (
//     <div className="min-h-screen flex bg-white">
//       {/* Left Side - Animated Image */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center p-12"
//       >
//         <motion.div
//           animate={{ y: [-10, 10, -10] }}
//           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <Image 
//             src="/login.png" // Replace with your image
//             alt="Medical Illustration"
//             width={500}
//             height={500}
//             className="drop-shadow-2xl rounded-3xl"
//           />
//         </motion.div>
//       </motion.div>

//       {/* Right Side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24">
//         <motion.div 
//           initial={{ x: 50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md"
//         >
//           <div className="text-center mb-10">
//             <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
//               {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
//             </h1>
//             <p className="text-gray-500">
//               {authMode === 'login' 
//                 ? `Access your ${userType} dashboard` 
//                 : `Register as a ${userType}`}
//             </p>
//           </div>

//           {/* Role Toggle */}
//           <motion.div 
//             whileTap={{ scale: 0.95 }}
//             className="flex bg-gray-100 p-1 rounded-xl mb-8"
//           >
//             <button
//               onClick={() => setUserType('doctor')}
//               className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
//                 userType === 'doctor' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'
//               }`}
//             >
//               <UserIcon className="w-5 h-5 inline mr-2" />
//               Doctor
//             </button>
//             <button
//               onClick={() => setUserType('admin')}
//               className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
//                 userType === 'admin' ? 'bg-white shadow-md text-purple-600' : 'text-gray-500'
//               }`}
//             >
//               <ShieldCheckIcon className="w-5 h-5 inline mr-2" />
//               Admin
//             </button>
//           </motion.div>

//           {/* Form */}
//           <Formik
//             initialValues={{ 
//               name: '', 
//               email: '', 
//               password: '', 
//               confirmPassword: '' 
//             }}
//             validationSchema={authMode === 'login' ? loginSchema : signupSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-6">
//                 <AnimatePresence mode="wait">
//                   {/* Name Field (Only for Signup) */}
//                   {authMode === 'signup' && (
//                     <motion.div
//                       key="name-field"
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                       <div className="relative">
//                         <Field
//                           type="text"
//                           name="name"
//                           placeholder="Dr. John Doe"
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         />
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <IdentificationIcon className="h-5 w-5 text-gray-400" />
//                         </div>
//                       </div>
//                       <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Email Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <div className="relative">
//                     <Field
//                       type="email"
//                       name="email"
//                       placeholder="your@email.com"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                         <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                       </svg>
//                     </div>
//                   </div>
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Field
//                       type={showPassword ? 'text' : 'password'}
//                       name="password"
//                       placeholder="••••••••"
//                       className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     >
//                       {showPassword ? (
//                         <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                       ) : (
//                         <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                       )}
//                     </button>
//                   </div>
//                   <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
//                 </div>

//                 {/* Confirm Password (Only for Signup) */}
//                 <AnimatePresence mode="wait">
//                   {authMode === 'signup' && (
//                     <motion.div
//                       key="confirm-password"
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Confirm Password
//                       </label>
//                       <div className="relative">
//                         <Field
//                           type="password"
//                           name="confirmPassword"
//                           placeholder="••••••••"
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         />
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <LockClosedIcon className="h-5 w-5 text-gray-400" />
//                         </div>
//                       </div>
//                       <ErrorMessage 
//                         name="confirmPassword" 
//                         component="div" 
//                         className="text-red-500 text-xs mt-1" 
//                       />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <motion.button
//                   type="submit"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   disabled={isSubmitting}
//                   className={`w-full py-3 px-6 rounded-xl font-semibold text-white ${
//                     userType === 'doctor' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'
//                   } transition-all flex items-center justify-center`}
//                 >
//                   {isSubmitting ? (
//                     'Processing...'
//                   ) : (
//                     <>
//                       {authMode === 'login' ? 'Login' : 'Sign Up'} 
//                       <ArrowRightIcon className="w-5 h-5 ml-2" />
//                     </>
//                   )}
//                 </motion.button>
//               </Form>
//             )}
//           </Formik>

//           <div className="mt-6 text-center text-sm text-gray-500">
//             {/* {authMode === 'login' ? (
//               <>
//                 Don’t have an account?{' '}
//                 <button 
//                   onClick={() => setAuthMode('signup')} 
//                   className="font-medium text-blue-600 hover:text-blue-500"
//                 >
//                   Sign up
//                 </button>
//               </>
//             ) : (
//               <>
//                 Already have an account?{' '}
//                 <button 
//                   onClick={() => setAuthMode('login')} 
//                   className="font-medium text-blue-600 hover:text-blue-500"
//                 >
//                   Login
//                 </button>
//               </>
//             )} */}
//             {authMode === 'login' ? (
//   userType === 'admin' ? (
//     <>
//       Don’t have an account?{' '}
//       <button 
//         onClick={() => setAuthMode('signup')} 
//         className="font-medium text-blue-600 hover:text-blue-500"
//       >
//         Sign up
//       </button>
//     </>
//   ) : <div>
//       Login Receptionist here?{' '}
//       <button 
//         onClick={() =>  router.push("/receptionist-login")} 
//         className="font-medium text-blue-600 hover:text-blue-500"
//       >
//         Login
//       </button>
//   </div>
// ) : (
//   <>
//     Already have an account?{' '}
//     <button 
//       onClick={() => setAuthMode('login')} 
//       className="font-medium text-blue-600 hover:text-blue-500"
//     >
//       Login
//     </button>
//   </>
// )}

//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
'use client'
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  LockClosedIcon, 
  ArrowRightIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const AuthPage = () => {
  const { login } = useAuth();
  const router = useRouter()
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [userType, setUserType] = useState('doctor'); // 'doctor', 'admin', 'clinic', 'patient', 'receptionist'
  const [showPassword, setShowPassword] = useState(false);

  // Validation schemas
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
  });

  const signupSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: userType,
    };

    try {
      const apiBase = "https://practo-backend.vercel.app/api";
      const endpoint =
        authMode === "signup"
          ? `${apiBase}/${userType}/auth/signup`
          : `${apiBase}/${userType}/auth/login`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log(`${authMode === "signup" ? "Signup" : "Login"} successful:`, data);
        if (authMode === "login") {
          login(data.token, data.user);
          resetForm();
          
          // Redirect based on user type
          switch(userType) {
            case 'doctor':
              router.push("/doctor-dashboard");
              break;
            case 'admin':
              router.push("/admin");
              break;
            case 'clinic':
              router.push("/clinic-dashboard");
              break;
            case 'patients':
              router.push("/patient-dashboard");
              break;
            case 'reciptionist':
              router.push("/receptionist-dashboard");
              break;
            default:
              router.push("/");
          }
        } else {
          resetForm();
        }
        alert(`${authMode === "signup" ? "Signup" : "Login"} successful`);
      } else {
        console.error("Failed:", data);
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // User type configuration
  const userTypes = [
    { id: 'doctor', name: 'Doctor', icon: UserIcon, color: 'blue' },
    { id: 'admin', name: 'Admin', icon: ShieldCheckIcon, color: 'purple' },
    { id: 'clinic', name: 'Clinic', icon: BuildingOfficeIcon, color: 'green' },
    { id: 'patients', name: 'Patient', icon: UserGroupIcon, color: 'orange' },
    { id: 'reciptionist', name: 'Receptionist', icon: ClipboardDocumentIcon, color: 'pink' }
  ];

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Animated Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center p-12"
      >
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image 
            src="/login.png"
            alt="Medical Illustration"
            width={500}
            height={500}
            className="drop-shadow-2xl rounded-3xl"
          />
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24">
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-500">
              {authMode === 'login' 
                ? `Access your ${userType} dashboard` 
                : `Register as a ${userType}`}
            </p>
          </div>

          {/* Role Toggle - Updated for all user types */}
          <motion.div 
            whileTap={{ scale: 0.95 }}
            className="grid grid-cols-2 gap-2 mb-8"
          >
            {userTypes.map((type) => {
              const Icon = type.icon;
              const isActive = userType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setUserType(type.id)}
                  className={`py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center ${
                    isActive 
                      ? `bg-white shadow-md text-${type.color}-600` 
                      : 'text-gray-500 bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 inline mr-2" />
                  {type.name}
                </button>
              );
            })}
          </motion.div>

          {/* Form */}
          <Formik
            initialValues={{ 
              name: '', 
              email: '', 
              password: '', 
              confirmPassword: '' 
            }}
            validationSchema={authMode === 'login' ? loginSchema : signupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* Name Field (Only for Signup) */}
                  {authMode === 'signup' && (
                    <motion.div
                      key="name-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <Field
                          type="text"
                          name="name"
                          placeholder={userType === 'doctor' ? 'Dr. John Doe' : 'Your full name'}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IdentificationIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Confirm Password (Only for Signup) */}
                <AnimatePresence mode="wait">
                  {authMode === 'signup' && (
                    <motion.div
                      key="confirm-password"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Field
                          type="password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                      <ErrorMessage 
                        name="confirmPassword" 
                        component="div" 
                        className="text-red-500 text-xs mt-1" 
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-white ${
                    userTypes.find(t => t.id === userType)?.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                    userTypes.find(t => t.id === userType)?.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                    userTypes.find(t => t.id === userType)?.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                    userTypes.find(t => t.id === userType)?.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                    'bg-pink-600 hover:bg-pink-700'
                  } transition-all flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      {authMode === 'login' ? 'Login' : 'Sign Up'} 
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </motion.button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center text-sm text-gray-500">
            {authMode === 'login' ? (
              userType === 'patient' ? (
                <>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setAuthMode('signup')} 
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <div>
                  {userType === 'receptionist' ? (
                    <span>Please login through your clinic portal</span>
                  ) : (
                    <>
                      Need a different login?{' '}
                      <button 
                        onClick={() => router.push("/select-login-type")} 
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Change login type
                      </button>
                    </>
                  )}
                </div>
              )
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  onClick={() => setAuthMode('login')} 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;