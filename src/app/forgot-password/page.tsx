// "use client";

// import { useState, FormEvent } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [success, setSuccess] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [emailSent, setEmailSent] = useState<boolean>(false);
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     // Enhanced email validation
//     if (!email) {
//       setError("Email address is required");
//       setLoading(false);
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError("Please enter a valid email address");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("/api/auth/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess(data.message || "Password reset link has been sent to your email!");
//         setEmailSent(true);
        
//         // In development mode, show the reset link directly
//         if (data.resetLink) {
//           setSuccess(prev => prev + " Check the console for development link.");
//           console.log("Development Reset Link:", data.resetLink);
//         }
//       } else {
//         setError(data.error || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Forgot password error:", error);
//       setError("Network error. Please check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendEmail = async () => {
//     if (!email) {
//       setError("Please enter your email address first");
//       return;
//     }
//     await handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>);
//   };

//   const handleBackToLogin = () => {
//     router.push("/login");
//   };

//   const handleTryDifferentEmail = () => {
//     setEmail("");
//     setEmailSent(false);
//     setError("");
//     setSuccess("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
//       {/* Main Card Container */}
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
//         <div className="px-6 sm:px-8 py-12 sm:py-16 bg-white">
//           <div className="w-full max-w-sm mx-auto">
            
//             {/* Logo */}
//             <div className="flex justify-center mb-6">
//               <div 
//                 className="w-20 h-20 rounded-xl flex items-center justify-center shadow-lg"
//                 style={{ backgroundColor: "#12498b" }}
//               >
//                 <img 
//                   src="/logo.png" 
//                   alt="Logo"
//                   className="w-16 h-16 object-contain"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement;
//                     target.style.display = 'none';
//                     const parent = target.parentElement;
//                     if (parent) {
//                       parent.innerHTML = '<span class="text-2xl font-bold text-white">🔒</span>';
//                     }
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Header */}
//             <div className="text-center mb-2">
//               <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//                 {emailSent ? "Check Your Email" : "Forgot Password"}
//               </h3>
//               <p className="text-sm text-gray-600 mt-2">
//                 {emailSent 
//                   ? `We sent a reset link to ${email}`
//                   : "Enter your email to receive a password reset link"
//                 }
//               </p>
//             </div>

//             {/* Success Message */}
//             {success && (
//               <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded text-sm">
//                 <div className="flex items-start">
//                   <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <div>
//                     <p className="font-semibold">Success!</p>
//                     <p>{success}</p>
//                     {emailSent && (
//                       <div className="mt-2 text-xs">
//                         <p>Didn't receive the email?</p>
//                         <button
//                           onClick={handleResendEmail}
//                           disabled={loading}
//                           className="text-green-700 font-medium hover:text-green-800 underline transition duration-200"
//                         >
//                           Click to resend
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm">
//                 <div className="flex items-start">
//                   <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <div>
//                     <p className="font-semibold">Error</p>
//                     <p>{error}</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Email Sent Success View */}
//             {emailSent ? (
//               <div className="space-y-6">
//                 {/* Email Sent Illustration */}
//                 <div className="text-center py-4">
//                   <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
//                     <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     We've sent a password reset link to<br />
//                     <strong className="text-gray-900">{email}</strong>
//                   </p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   <button
//                     onClick={handleResendEmail}
//                     disabled={loading}
//                     className="w-full py-2.5 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 text-sm transition duration-200 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50"
//                   >
//                     {loading ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                         </svg>
//                         Resend Email
//                       </>
//                     )}
//                   </button>

//                   <button
//                     onClick={handleTryDifferentEmail}
//                     className="w-full py-2.5 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 text-sm transition duration-200 hover:border-gray-400 hover:bg-gray-50"
//                   >
//                     Use Different Email
//                   </button>
//                 </div>

//                 {/* Help Text */}
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-700">
//                   <p className="font-semibold mb-1">Didn't receive the email?</p>
//                   <ul className="list-disc list-inside space-y-1">
//                     <li>Check your spam or junk folder</li>
//                     <li>Make sure you entered the correct email address</li>
//                     <li>Wait a few minutes and try again</li>
//                   </ul>
//                 </div>
//               </div>
//             ) : (
//               /* Email Input Form */
//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 {/* Email Field */}
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={email}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                     placeholder="Enter your email address"
//                     className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
//                     onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
//                       e.target.style.borderColor = "#b12222";
//                       e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
//                     }}
//                     onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
//                       e.target.style.borderColor = "#d1d5db";
//                       e.target.style.boxShadow = "0 0 0 0 transparent";
//                     }}
//                     disabled={loading}
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-6 hover:shadow-lg disabled:hover:shadow-none"
//                   style={{
//                     backgroundColor: loading ? "#c1353d" : "#b12222",
//                     cursor: loading ? "not-allowed" : "pointer",
//                     opacity: loading ? 0.8 : 1
//                   }}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sending Reset Link...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                       Send Reset Link
//                     </>
//                   )}
//                 </button>
//               </form>
//             )}

//             {/* Back to Login */}
//             <div className="text-center mt-6 pt-6 border-t border-gray-200">
//               <button
//                 onClick={handleBackToLogin}
//                 className="text-sm font-medium transition duration-200 inline-flex items-center text-gray-600 hover:text-gray-900"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Login
//               </button>
//             </div>

//             {/* Development Helper - Only show in development */}
//             {process.env.NODE_ENV === 'development' && success && (
//               <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <p className="text-xs text-yellow-800 font-medium mb-1">Development Mode:</p>
//                 <p className="text-xs text-yellow-700">
//                   Check browser console for the reset link if email is not configured.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Enhanced email validation
    if (!email) {
      setError("Email address is required");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Password reset link has been sent to your email!");
        setEmailSent(true);
        
        // In development mode, show the reset link directly
        if (data.resetLink) {
          setSuccess(prev => prev + " Check the console for development link.");
          console.log("Development Reset Link:", data.resetLink);
        }
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }
    await handleSubmit({ preventDefault: () => {} } as FormEvent<HTMLFormElement>);
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleTryDifferentEmail = () => {
    setEmail("");
    setEmailSent(false);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-12 sm:py-16 bg-white">
          <div className="w-full max-w-sm mx-auto">
            
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "#12498b" }}
              >
                <Image 
                  src="/logo.png" 
                  alt="Logo"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                  onError={() => {
                    const parent = document.querySelector('[style*="background-color: #12498b"]');
                    if (parent) {
                      parent.innerHTML = '<span class="text-2xl font-bold text-white">🔒</span>';
                    }
                  }}
                />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {emailSent ? "Check Your Email" : "Forgot Password"}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {emailSent 
                  ? `We sent a reset link to ${email}`
                  : "Enter your email to receive a password reset link"
                }
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded text-sm">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold">Success!</p>
                    <p>{success}</p>
                    {emailSent && (
                      <div className="mt-2 text-xs">
                        <p>Didn&apos;t receive the email?</p>
                        <button
                          onClick={handleResendEmail}
                          disabled={loading}
                          className="text-green-700 font-medium hover:text-green-800 underline transition duration-200"
                        >
                          Click to resend
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Sent Success View */}
            {emailSent ? (
              <div className="space-y-6">
                {/* Email Sent Illustration */}
                <div className="text-center py-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">
                    We&apos;ve sent a password reset link to<br />
                    <strong className="text-gray-900">{email}</strong>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleResendEmail}
                    disabled={loading}
                    className="w-full py-2.5 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 text-sm transition duration-200 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Resend Email
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleTryDifferentEmail}
                    className="w-full py-2.5 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 text-sm transition duration-200 hover:border-gray-400 hover:bg-gray-50"
                  >
                    Use Different Email
                  </button>
                </div>

                {/* Help Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-700">
                  <p className="font-semibold mb-1">Didn&apos;t receive the email?</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check your spam or junk folder</li>
                    <li>Make sure you entered the correct email address</li>
                    <li>Wait a few minutes and try again</li>
                  </ul>
                </div>
              </div>
            ) : (
              /* Email Input Form */
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.style.borderColor = "#b12222";
                      e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "0 0 0 0 transparent";
                    }}
                    disabled={loading}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-6 hover:shadow-lg disabled:hover:shadow-none"
                  style={{
                    backgroundColor: loading ? "#c1353d" : "#b12222",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.8 : 1
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Reset Link...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Back to Login */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleBackToLogin}
                className="text-sm font-medium transition duration-200 inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </button>
            </div>

            {/* Development Helper - Only show in development */}
            {process.env.NODE_ENV === 'development' && success && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 font-medium mb-1">Development Mode:</p>
                <p className="text-xs text-yellow-700">
                  Check browser console for the reset link if email is not configured.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}