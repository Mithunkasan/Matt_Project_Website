// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
//   const [emailValidation, setEmailValidation] = useState({
//     isValid: false,
//     isGoogle: false,
//     message: ""
//   });
//   const router = useRouter();

//   // Enhanced email validation function
//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       return {
//         isValid: false,
//         isGoogle: false,
//         message: "Please enter a valid email address"
//       };
//     }

//     // Check for Google domains
//     const googleDomains = [
//       'gmail.com', 'googlemail.com', 'google.com'
//     ];

//     const domain = email.split('@')[1]?.toLowerCase();
//     const isGoogleEmail = googleDomains.includes(domain);

//     // Check for disposable emails
//     const disposableDomains = [
//       'tempmail.com', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
//       'yopmail.com', 'throwaway.com', 'fakeinbox.com', 'trashmail.com',
//       'temp-mail.org', 'getairmail.com', 'maildrop.cc', 'dispostable.com'
//     ];

//     if (disposableDomains.some(disposable => domain?.includes(disposable))) {
//       return {
//         isValid: false,
//         isGoogle: false,
//         message: "Temporary email addresses are not allowed. Please use a permanent email like Gmail."
//       };
//     }

//     return {
//       isValid: true,
//       isGoogle: isGoogleEmail,
//       message: isGoogleEmail ? "✓ Valid Google email" : "✓ Valid email"
//     };
//   };

//   // Real-time Google SMTP validation (client-side simulation)
//   const checkGoogleEmailExistence = async (email: string) => {
//     if (!email.includes('@gmail.com')) return null;

//     try {
//       // This is a client-side simulation - for real validation, use backend API
//       const response = await fetch('/api/auth/validate-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       }
//     } catch (error) {
//       console.log('Email validation service unavailable');
//     }
//     return null;
//   };

//   // Password validation function (keep your existing function)
//   const validatePassword = (password: string, name: string) => {
//     const errors: string[] = [];

//     if (password.length < 8) {
//       errors.push("Password must be at least 8 characters long");
//     }

//     if (!/(?=.*[a-z])/.test(password)) {
//       errors.push("Password must contain at least one lowercase letter");
//     }

//     if (!/(?=.*[A-Z])/.test(password)) {
//       errors.push("Password must contain at least one uppercase letter");
//     }

//     if (!/(?=.*\d)/.test(password)) {
//       errors.push("Password must contain at least one number");
//     }

//     if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
//       errors.push("Password must contain at least one special character");
//     }

//     if (name && password.toLowerCase().includes(name.toLowerCase())) {
//       errors.push("Password should not contain your name");
//     }

//     if (/(.)\1\1/.test(password)) {
//       errors.push("Password should not contain repeating characters");
//     }

//     if (/12345|abcde|qwerty/.test(password.toLowerCase())) {
//       errors.push("Password should not contain common sequences");
//     }

//     return errors;
//   };

//   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Real-time email validation
//     if (name === 'email' && value) {
//       const validation = validateEmail(value);
//       setEmailValidation(validation);

//       // Additional Google email check for Gmail addresses
//       if (validation.isValid && validation.isGoogle) {
//         const existenceCheck = await checkGoogleEmailExistence(value);
//         if (existenceCheck?.exists === false) {
//           setEmailValidation(prev => ({
//             ...prev,
//             message: "⚠ This Gmail address doesn't seem to exist"
//           }));
//         }
//       }
//     }

//     // Real-time password validation
//     if (name === 'password' || name === 'name') {
//       const passwordToValidate = name === 'password' ? value : formData.password;
//       const nameToUse = name === 'name' ? value : formData.name;

//       if (passwordToValidate) {
//         const errors = validatePassword(passwordToValidate, nameToUse);
//         setPasswordErrors(errors);
//       } else {
//         setPasswordErrors([]);
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // Final email validation
//     const emailValidation = validateEmail(formData.email);
//     if (!emailValidation.isValid) {
//       setError(emailValidation.message);
//       setLoading(false);
//       return;
//     }

//     // Password validation
//     const passwordValidationErrors = validatePassword(formData.password, formData.name);
//     if (passwordValidationErrors.length > 0) {
//       setPasswordErrors(passwordValidationErrors);
//       setError("Please fix the password requirements below");
//       setLoading(false);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           email: formData.email.toLowerCase().trim(),
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong");
//       }

//       setSuccess(true);
//       setFormData({ name: "", email: "", password: "", confirmPassword: "" });
//       setPasswordErrors([]);
//       setEmailValidation({ isValid: false, isGoogle: false, message: "" });

//       setTimeout(() => {
//         router.push("/login?message=Registration successful. Please login.");
//       }, 1500);
//     } catch (error) {
//       setError(error instanceof Error ? error.message : "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isPasswordStrong = passwordErrors.length === 0 && formData.password.length > 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
//       {/* Main Card Container */}
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

//           {/* Left Portion - Card View */}
//           <div 
//             className="flex flex-col justify-center items-center px-6 sm:px-8 py-12 sm:py-16 text-center"
//             style={{ backgroundColor: "#12498b" }}
//           >
//             <div className="max-w-sm">
//               {/* Logo Container */}
//               <div className="flex justify-center mb-6 sm:mb-8">
//                 <div 
//                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center shadow-lg"
//                   style={{ backgroundColor: "white" }}
//                 >
//                   <img 
//                     src="/logo.png" 
//                     alt="Logo"
//                     className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
//                   />
//                 </div>
//               </div>

//               {/* Left Content */}
//               <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
//                 Create Your Account
//               </h1>
//               <p className="text-sm sm:text-base text-blue-100 mb-6">
//                 Join us today and get started with amazing features
//               </p>
//               <div className="text-blue-50 text-xs sm:text-sm">
//                 <p className="mb-3">Already have an account?</p>
//                 <Link 
//                   href="/login" 
//                   className="text-white font-semibold inline-block hover:text-blue-100 transition duration-200 border-b-2 border-white pb-1"
//                 >
//                   Sign in to your account
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Right Portion - Registration Form Card */}
//           <div className="flex flex-col justify-center items-center px-6 sm:px-8 py-10 sm:py-16 bg-white">
//             <div className="w-full max-w-sm">
//               <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
//                 Register
//               </h3>

//               {/* Success Message */}
//               {success && (
//                 <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded text-sm">
//                   <p className="font-semibold">Success!</p>
//                   <p>Your account has been created. Redirecting...</p>
//                 </div>
//               )}

//               {/* Error Message */}
//               {error && (
//                 <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm">
//                   <p className="font-semibold">Error</p>
//                   <p>{error}</p>
//                 </div>
//               )}

//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 {/* Full Name Field */}
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     autoComplete="name"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter your full name"
//                     className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
//                     onFocus={(e) => {
//                       e.target.style.borderColor = "#b12222";
//                       e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = "#d1d5db";
//                       e.target.style.boxShadow = "0 0 0 0 transparent";
//                     }}
//                   />
//                 </div>

//                 {/* Email Field with Google Validation */}
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address
//                     {emailValidation.message && (
//                       <span className={`ml-2 text-xs font-medium ${
//                         emailValidation.isValid ? 
//                         (emailValidation.message.includes('⚠') ? 'text-yellow-600' : 'text-green-600') : 
//                         'text-red-600'
//                       }`}>
//                         {emailValidation.message}
//                       </span>
//                     )}
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email (Gmail recommended)"
//                     className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
//                     onFocus={(e) => {
//                       e.target.style.borderColor = "#b12222";
//                       e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = "#d1d5db";
//                       e.target.style.boxShadow = "0 0 0 0 transparent";
//                     }}
//                   />
//                   {emailValidation.isGoogle && (
//                     <div className="flex items-center mt-1 text-xs text-green-600">
//                       <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                       </svg>
//                       Google email detected
//                     </div>
//                   )}
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Password
//                     {formData.password && (
//                       <span className={`ml-2 text-xs font-medium ${isPasswordStrong ? 'text-green-600' : 'text-red-600'}`}>
//                         {isPasswordStrong ? '✓ Strong password' : '✗ Weak password'}
//                       </span>
//                     )}
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="new-password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Enter your password"
//                     className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
//                     onFocus={(e) => {
//                       e.target.style.borderColor = "#b12222";
//                       e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = "#d1d5db";
//                       e.target.style.boxShadow = "0 0 0 0 transparent";
//                     }}
//                   />

//                   {/* Password Requirements */}
//                   {passwordErrors.length > 0 && (
//                     <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
//                       <p className="text-xs font-semibold text-red-800 mb-2">Password must contain:</p>
//                       <ul className="text-xs text-red-700 space-y-1">
//                         {passwordErrors.map((error, index) => (
//                           <li key={index} className="flex items-center">
//                             <span className="mr-2">•</span>
//                             {error}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}

//                   {/* Password Strength Indicator */}
//                   {formData.password && (
//                     <div className="mt-2">
//                       <div className="flex space-x-1 mb-1">
//                         {[1, 2, 3, 4].map((index) => (
//                           <div
//                             key={index}
//                             className={`h-1 flex-1 rounded-full ${
//                               index <= Math.ceil(formData.password.length / 2) && formData.password.length >= 8
//                                 ? isPasswordStrong ? 'bg-green-500' : 'bg-yellow-500'
//                                 : 'bg-gray-200'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <p className="text-xs text-gray-600">
//                         Use 8+ characters with uppercase, lowercase, numbers, and special characters
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Confirm Password Field */}
//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Confirm Password
//                     {formData.confirmPassword && formData.password === formData.confirmPassword && (
//                       <span className="ml-2 text-xs font-medium text-green-600">✓ Passwords match</span>
//                     )}
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     autoComplete="new-password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm your password"
//                     className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
//                     onFocus={(e) => {
//                       e.target.style.borderColor = "#b12222";
//                       e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = "#d1d5db";
//                       e.target.style.boxShadow = "0 0 0 0 transparent";
//                     }}
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading || passwordErrors.length > 0 || !emailValidation.isValid}
//                   className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-6 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                   style={{
//                     backgroundColor: loading ? "#c1353d" : "#b12222",
//                   }}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Creating account...
//                     </>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>
//               </form>

//               {/* Footer Text */}
//               <p className="text-center text-xs text-gray-500 mt-6">
//                 By signing up, you agree to our{" "}
//                 <Link href="#" className="font-medium" style={{ color: "#b12222" }}>
//                   Terms of Service
//                 </Link>
//                 {" "}and{" "}
//                 <Link href="#" className="font-medium" style={{ color: "#b12222" }}>
//                   Privacy Policy
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailValidation, setEmailValidation] = useState({
    isValid: false,
    isGoogle: false,
    message: ""
  });
  const router = useRouter();

  // Enhanced email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        isGoogle: false,
        message: "Please enter a valid email address"
      };
    }

    // Check for Google domains
    const googleDomains = [
      'gmail.com', 'googlemail.com', 'google.com'
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    const isGoogleEmail = googleDomains.includes(domain);

    // Check for disposable emails
    const disposableDomains = [
      'tempmail.com', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
      'yopmail.com', 'throwaway.com', 'fakeinbox.com', 'trashmail.com',
      'temp-mail.org', 'getairmail.com', 'maildrop.cc', 'dispostable.com'
    ];

    if (disposableDomains.some(disposable => domain?.includes(disposable))) {
      return {
        isValid: false,
        isGoogle: false,
        message: "Temporary email addresses are not allowed. Please use a permanent email like Gmail."
      };
    }

    return {
      isValid: true,
      isGoogle: isGoogleEmail,
      message: isGoogleEmail ? "✓ Valid Google email" : "✓ Valid email"
    };
  };

  // Password validation function
  const validatePassword = (password: string, name: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    if (name && password.toLowerCase().includes(name.toLowerCase())) {
      errors.push("Password should not contain your name");
    }

    if (/(.)\1\1/.test(password)) {
      errors.push("Password should not contain repeating characters");
    }

    if (/12345|abcde|qwerty/.test(password.toLowerCase())) {
      errors.push("Password should not contain common sequences");
    }

    return errors;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time email validation
    if (name === 'email' && value) {
      const validation = validateEmail(value);
      setEmailValidation(validation);
    }

    // Real-time password validation
    if (name === 'password' || name === 'name') {
      const passwordToValidate = name === 'password' ? value : formData.password;
      const nameToUse = name === 'name' ? value : formData.name;

      if (passwordToValidate) {
        const errors = validatePassword(passwordToValidate, nameToUse);
        setPasswordErrors(errors);
      } else {
        setPasswordErrors([]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Final email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      setLoading(false);
      return;
    }

    // Password validation
    const passwordValidationErrors = validatePassword(formData.password, formData.name);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
      setError("Please fix the password requirements below");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "STUDENT" });
      setPasswordErrors([]);
      setEmailValidation({ isValid: false, isGoogle: false, message: "" });

      setTimeout(() => {
        router.push("/login?message=Registration successful. Please login.");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isPasswordStrong = passwordErrors.length === 0 && formData.password.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      {/* Main Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

          {/* Left Portion - Card View */}
          <div
            className="flex flex-col justify-center items-center px-6 sm:px-8 py-12 sm:py-16 text-center"
            style={{ backgroundColor: "#12498b" }}
          >
            <div className="max-w-sm">
              {/* Logo Container */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "white" }}
                >
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  />
                </div>
              </div>

              {/* Left Content */}
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                User Registration
              </h1>
              <p className="text-sm sm:text-base text-blue-100 mb-6">
                Join our community of engineering students and track your success
              </p>
              <div className="text-blue-50 text-xs sm:text-sm">
                <p className="mb-3">Already have an account?</p>
                <Link
                  href="/login"
                  className="text-white font-semibold inline-block hover:text-blue-100 transition duration-200 border-b-2 border-white pb-1"
                >
                  Sign in to your account
                </Link>
              </div>
            </div>
          </div>

          {/* Right Portion - Registration Form Card */}
          <div className="flex flex-col justify-center items-center px-6 sm:px-8 py-10 sm:py-16 bg-white">
            <div className="w-full max-w-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
                Register
              </h3>

              {/* Success Message */}
              {success && (
                <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded text-sm">
                  <p className="font-semibold">Success!</p>
                  <p>Your account has been created. Redirecting...</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#b12222";
                      e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "0 0 0 0 transparent";
                    }}
                  />
                </div>

                {/* Role Field */}
                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                    I am a...
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none transition duration-200 text-sm bg-white"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#b12222";
                      e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "0 0 0 0 transparent";
                    }}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                </div>

                {/* Email Field with Google Validation */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                    {emailValidation.message && (
                      <span className={`ml-2 text-xs font-medium ${emailValidation.isValid ?
                        (emailValidation.message.includes('⚠') ? 'text-yellow-600' : 'text-green-600') :
                        'text-red-600'
                        }`}>
                        {emailValidation.message}
                      </span>
                    )}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email (Gmail recommended)"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#b12222";
                      e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "0 0 0 0 transparent";
                    }}
                  />
                  {emailValidation.isGoogle && (
                    <div className="flex items-center mt-1 text-xs text-green-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google email detected
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                    {formData.password && (
                      <span className={`ml-2 text-xs font-medium ${isPasswordStrong ? 'text-green-600' : 'text-red-600'}`}>
                        {isPasswordStrong ? '✓ Strong password' : '✗ Weak password'}
                      </span>
                    )}
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#b12222";
                      e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "0 0 0 0 transparent";
                    }}
                  />

                  {/* Password Requirements */}
                  {passwordErrors.length > 0 && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs font-semibold text-red-800 mb-2">Password must contain:</p>
                      <ul className="text-xs text-red-700 space-y-1">
                        {passwordErrors.map((error, index) => (
                          <li key={index} className="flex items-center">
                            <span className="mr-2">•</span>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex space-x-1 mb-1">
                        {[1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 rounded-full ${index <= Math.ceil(formData.password.length / 2) && formData.password.length >= 8
                              ? isPasswordStrong ? 'bg-green-500' : 'bg-yellow-500'
                              : 'bg-gray-200'
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600">
                        Use 8+ characters with uppercase, lowercase, numbers, and special characters
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <span className="ml-2 text-xs font-medium text-green-600">✓ Passwords match</span>
                    )}
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
                    onFocus={(e) => {
                      e.target.style.borderColor = "#b12222";
                      e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "0 0 0 0 transparent";
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || passwordErrors.length > 0 || !emailValidation.isValid}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-6 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: loading ? "#c1353d" : "#b12222",
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Footer Text */}
              <p className="text-center text-xs text-gray-500 mt-6">
                By signing up, you agree to our{" "}
                <Link href="#" className="font-medium" style={{ color: "#b12222" }}>
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="#" className="font-medium" style={{ color: "#b12222" }}>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}