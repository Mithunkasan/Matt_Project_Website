// // app/reset-password/page.tsx
// "use client";

// import { useState, FormEvent, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";

// export default function ResetPasswordPage() {
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [success, setSuccess] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [token, setToken] = useState<string>("");
//   const [tokenValid, setTokenValid] = useState<boolean>(true);
//   const [tokenChecked, setTokenChecked] = useState<boolean>(false);
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     const tokenParam = searchParams.get("token");
//     console.log("Token from URL:", tokenParam);
    
//     if (tokenParam) {
//       setToken(tokenParam);
//       validateToken(tokenParam);
//     } else {
//       setTokenValid(false);
//       setTokenChecked(true);
//       setError("Invalid or missing reset token");
//     }
//   }, [searchParams]);

//   const validateToken = async (token: string) => {
//     try {
//       console.log("Validating token:", token);
//       const response = await fetch(`/api/auth/validate-token?token=${token}`);
//       const data = await response.json();
//       console.log("Token validation response:", data);
      
//       if (!data.valid) {
//         setTokenValid(false);
//         setError(data.error || "Invalid or expired reset token");
//       }
//       setTokenChecked(true);
//     } catch (error) {
//       console.error('Token validation error:', error);
//       setTokenValid(false);
//       setTokenChecked(true);
//       setError("Failed to validate token");
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     // Validation
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("Submitting password reset with token:", token);
//       const response = await fetch("/api/auth/reset-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token, password }),
//       });

//       const data = await response.json();
//       console.log("Reset password response:", data);

//       if (response.ok) {
//         setSuccess("Password reset successfully! Redirecting to login...");
//         setTimeout(() => {
//           router.push("/login");
//         }, 3000);
//       } else {
//         setError(data.error || "Failed to reset password");
//         if (data.error?.includes('expired') || data.error?.includes('invalid')) {
//           setTokenValid(false);
//         }
//       }
//     } catch (error) {
//       console.error("Reset password error:", error);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show loading while checking token
//   if (!tokenChecked) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
//           <div className="px-6 sm:px-8 py-12 sm:py-16 bg-white">
//             <div className="w-full max-w-sm mx-auto text-center">
//               <div className="flex justify-center mb-6">
//                 <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-lg bg-blue-600">
//                   <span className="text-2xl font-bold text-white">🔒</span>
//                 </div>
//               </div>
//               <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
//                 Verifying Reset Link
//               </h3>
//               <div className="flex items-center justify-center">
//                 <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               </div>
//               <p className="text-sm text-gray-600 mt-4">
//                 Please wait while we verify your reset link...
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

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
//                 <span className="text-2xl font-bold text-white">🔒</span>
//               </div>
//             </div>

//             <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-2">
//               Reset Password
//             </h3>
//             <p className="text-sm text-gray-600 text-center mb-6">
//               Enter your new password below.
//             </p>

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

//             {tokenValid ? (
//               <form className="space-y-4" onSubmit={handleSubmit}>
//                 {/* Password Field */}
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//                     New Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="new-password"
//                     required
//                     value={password}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
//                     placeholder="Enter new password (min. 6 characters)"
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
//                     minLength={6}
//                   />
//                 </div>

//                 {/* Confirm Password Field */}
//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Confirm New Password
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     autoComplete="new-password"
//                     required
//                     value={confirmPassword}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm new password"
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
//                     minLength={6}
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-4 hover:shadow-lg disabled:hover:shadow-none"
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
//                       Resetting Password...
//                     </>
//                   ) : (
//                     "Reset Password"
//                   )}
//                 </button>
//               </form>
//             ) : (
//               <div className="text-center py-4">
//                 <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//                   <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                   </svg>
//                 </div>
//                 <p className="text-red-600 mb-4 font-medium">Invalid or expired reset token</p>
//                 <Link 
//                   href="/forgot-password" 
//                   className="inline-flex items-center text-sm font-medium transition duration-200 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
//                   style={{ color: "#b12222" }}
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   Request a new reset link
//                 </Link>
//               </div>
//             )}

//             {/* Back to Login */}
//             <div className="text-center mt-6 pt-6 border-t border-gray-200">
//               <Link 
//                 href="/login" 
//                 className="text-sm font-medium transition duration-200 inline-flex items-center text-gray-600 hover:text-gray-900"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// app/reset-password/page.tsx
"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordContent() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [tokenValid, setTokenValid] = useState<boolean>(true);
  const [tokenChecked, setTokenChecked] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    console.log("Token from URL:", tokenParam);
    
    if (tokenParam) {
      setToken(tokenParam);
      validateToken(tokenParam);
    } else {
      setTokenValid(false);
      setTokenChecked(true);
      setError("Invalid or missing reset token");
    }
  }, [searchParams]);

  const validateToken = async (token: string) => {
    try {
      console.log("Validating token:", token);
      const response = await fetch(`/api/auth/validate-token?token=${token}`);
      const data = await response.json();
      console.log("Token validation response:", data);
      
      if (!data.valid) {
        setTokenValid(false);
        setError(data.error || "Invalid or expired reset token");
      }
      setTokenChecked(true);
    } catch (error) {
      console.error('Token validation error:', error);
      setTokenValid(false);
      setTokenChecked(true);
      setError("Failed to validate token");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      console.log("Submitting password reset with token:", token);
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      console.log("Reset password response:", data);

      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setError(data.error || "Failed to reset password");
        if (data.error?.includes('expired') || data.error?.includes('invalid')) {
          setTokenValid(false);
        }
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking token
  if (!tokenChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 sm:px-8 py-12 sm:py-16 bg-white">
            <div className="w-full max-w-sm mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-lg bg-blue-600">
                  <span className="text-2xl font-bold text-white">🔒</span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Verifying Reset Link
              </h3>
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Please wait while we verify your reset link...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <span className="text-2xl font-bold text-white">🔒</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-2">
              Reset Password
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your new password below.
            </p>

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

            {tokenValid ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Enter new password (min. 6 characters)"
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
                    minLength={6}
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
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
                    minLength={6}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-4 hover:shadow-lg disabled:hover:shadow-none"
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
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-600 mb-4 font-medium">Invalid or expired reset token</p>
                <Link 
                  href="/forgot-password" 
                  className="inline-flex items-center text-sm font-medium transition duration-200 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50"
                  style={{ color: "#b12222" }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Request a new reset link
                </Link>
              </div>
            )}

            {/* Back to Login */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <Link 
                href="/login" 
                className="text-sm font-medium transition duration-200 inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function ResetPasswordLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-12 sm:py-16 bg-white">
          <div className="w-full max-w-sm mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-lg bg-blue-600">
                <span className="text-2xl font-bold text-white">🔒</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Loading...
            </h3>
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Preparing reset password page...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}