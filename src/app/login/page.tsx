// "use client";

// import { useState, FormEvent } from "react";
// import { signIn, getSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LoginPage() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false,
//       });

//       if (result?.error) {
//         setError("Invalid email or password");
//       } else {
//         // Check if session exists before redirecting
//         const session = await getSession();
//         if (session) {
//           router.push("/home");
//           router.refresh();
//         }
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

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
//                   {/* Fallback */}
//                   {/* <span className="text-4xl sm:text-5xl font-bold" style={{ color: "#12498b" }}>M</span> */}
//                 </div>
//               </div>

//               {/* Left Content */}
//               <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
//                 Welcome Back
//               </h1>
//               <p className="text-sm sm:text-base text-blue-100 mb-6">
//                 Sign in to your account and continue your journey
//               </p>
//               <div className="text-blue-50 text-xs sm:text-sm">
//                 <p className="mb-3">Don't have an account?</p>
//                 <Link 
//                   href="/register" 
//                   className="text-white font-semibold inline-block hover:text-blue-100 transition duration-200 border-b-2 border-white pb-1"
//                 >
//                   Create a new account
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Right Portion - Login Form Card */}
//           <div className="flex flex-col justify-center items-center px-6 sm:px-8 py-10 sm:py-16 bg-white">
//             <div className="w-full max-w-sm">
//               <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
//                 Login
//               </h3>

//               {/* Error Message */}
//               {error && (
//                 <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm">
//                   <p className="font-semibold">Error</p>
//                   <p>{error}</p>
//                 </div>
//               )}

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
//                     placeholder="Enter your email"
//                     className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
//                     onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
//                       e.target.style.borderColor = "#b12222";
//                       e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
//                     }}
//                     onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
//                       e.target.style.borderColor = "#d1d5db";
//                       e.target.style.boxShadow = "0 0 0 0 transparent";
//                     }}
//                   />
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     value={password}
//                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
//                     onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
//                       e.target.style.borderColor = "#b12222";
//                       e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
//                     }}
//                     onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
//                       e.target.style.borderColor = "#d1d5db";
//                       e.target.style.boxShadow = "0 0 0 0 transparent";
//                     }}
//                   />
//                 </div>

//                 {/* Forgot Password Link */}
//                 <div className="flex justify-end">
//                   <Link 
//                     href="/forgot-password" 
//                     className="text-xs sm:text-sm font-medium transition duration-200"
//                     style={{ color: "#b12222" }}
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-6 hover:shadow-lg"
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
//                       Signing in...
//                     </>
//                   ) : (
//                     "Sign In"
//                   )}
//                 </button>
//               </form>

//               {/* Footer Text */}
//               <p className="text-center text-xs text-gray-500 mt-6">
//                 By signing in, you agree to our{" "}
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

import { useState, FormEvent } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Handle error silently or show message
        console.error("Login failed:", result.error);
      } else {
        // Check if session exists before redirecting
        const session = await getSession();
        if (session) {
          router.push("/home");
          router.refresh();
        }
      }
    } catch {
      // Handle error silently
      console.error("Login error occurred");
    } finally {
      setLoading(false);
    }
  };

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
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-blue-100 mb-6">
                Sign in to your account and continue your journey
              </p>
              <div className="text-blue-50 text-xs sm:text-sm">
                <p className="mb-3">Don&apos;t have an account?</p>
                <Link 
                  href="/register" 
                  className="text-white font-semibold inline-block hover:text-blue-100 transition duration-200 border-b-2 border-white pb-1"
                >
                  Create a new account
                </Link>
              </div>
            </div>
          </div>

          {/* Right Portion - Login Form Card */}
          <div className="flex flex-col justify-center items-center px-6 sm:px-8 py-10 sm:py-16 bg-white">
            <div className="w-full max-w-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
                Login
              </h3>

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
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.style.borderColor = "#b12222";
                      e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "0 0 0 0 transparent";
                    }}
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none transition duration-200 text-sm"
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.style.borderColor = "#b12222";
                      e.target.style.boxShadow = "0 0 0 3px rgba(177, 34, 34, 0.1)";
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "0 0 0 0 transparent";
                    }}
                  />
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link 
                    href="/forgot-password" 
                    className="text-xs sm:text-sm font-medium transition duration-200"
                    style={{ color: "#b12222" }}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-lg font-semibold text-white text-sm transition duration-200 flex items-center justify-center mt-6 hover:shadow-lg"
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
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Footer Text */}
              <p className="text-center text-xs text-gray-500 mt-6">
                By signing in, you agree to our{" "}
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