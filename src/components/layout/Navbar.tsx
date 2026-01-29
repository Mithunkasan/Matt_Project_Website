// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { LogOut, User } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// export function Navbar() {
//   const { data: session, status } = useSession();

//   const handleLogout = async () => {
//     await signOut({ callbackUrl: "/login" });
//   };

//   if (status === "loading") {
//     return (
//       <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                 <Image
//                   src="/logo.png"
//                   alt="MATT Solutions Logo"
//                   width={48}
//                   height={48}
//                   className="rounded"
//                 />
//               </div>
//               <div className="text-xl font-bold text-gray-900">MATT Solutions</div>
//             </div>
//             <div className="text-sm text-gray-500">Loading...</div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Left side - Logo and Title */}
//           <div className="flex items-center space-x-3">
//             <div className="flex-shrink-0">
//               <Link href="/" className="flex items-center justify-center h-12 w-12 transition-colors">
//                 <Image
//                   src="/logo.png"
//                   alt="MATT Engineering Solutions Logo"
//                   width={48}
//                   height={48}
//                   className="rounded"
//                 />
//               </Link>
//             </div>
//             <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
//               MATT Project Solution
//             </Link>
//           </div>

//           {/* Right side - User info and logout */}
//           <div className="flex items-center space-x-4">
//             {session ? (
//               <>
//                 <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
//                   <User className="h-4 w-4 text-gray-500" />
//                   <span className="text-sm font-medium text-gray-700">
//                     {session.user?.name || session.user?.email}
//                   </span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>Logout</span>
//                 </Button>
//               </>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link href="/login">
//                   <Button
//                     size="sm"
//                     className="bg-[#12498b] hover:bg-[#0e3b6f] text-white"
//                   >
//                     Login
//                   </Button>
//                 </Link>
//                 <Link href="/register">
//                   <Button
//                     size="sm"
//                     className="bg-[#b12222] hover:bg-[#911c1c] text-white"
//                   >
//                     Register
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }









"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (status === "loading") {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="MATT Solutions Logo"
                  width={48}
                  height={48}
                  className="rounded"
                />
              </div>
              <div className="text-lg sm:text-xl font-bold text-gray-900">MATT Solutions</div>
            </div>
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 transition-colors">
                <Image
                  src="/logo.png"
                  alt="MATT Engineering Solutions Logo"
                  width={48}
                  height={48}
                  className="rounded"
                />
              </Link>
            </div>
            <Link href="/" className="text-base sm:text-xl font-bold text-gray-900 hover:text-[#12498b] transition-colors">
              <span className="hidden sm:inline">MATT Project Solutions</span>
              <span className="sm:hidden">MATT Project Solutions</span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    size="sm"
                    className="bg-[#12498b] hover:bg-[#0e3b6f] text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-[#b12222] hover:bg-[#911c1c] text-white"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {session ? (
                <>
                  <div className="flex items-center space-x-2 bg-gray-50 px-3 py-3 rounded-lg">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {session.user?.name || session.user?.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" onClick={closeMobileMenu} className="block">
                    <Button
                      size="default"
                      className="w-full bg-[#12498b] hover:bg-[#0e3b6f] text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={closeMobileMenu} className="block">
                    <Button
                      size="default"
                      className="w-full bg-[#b12222] hover:bg-[#911c1c] text-white"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}