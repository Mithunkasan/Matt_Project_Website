"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Building2, User, Calendar } from "lucide-react"
import BrowseClassScheduleCard from "@/components/BrowseClassScheduleCard"
import { LoadingSpinner } from "../browse/Loading"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Projectcard1 } from "@/components/projectcard1"
import { Project, ClassSchedule } from "@/types"

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get("tab") as "projects" | "classes") || "projects"

  const [activeTab, setActiveTab] = useState<"projects" | "classes">(initialTab)
  const [projects, setProjects] = useState<Project[]>([])
  const [classes, setClasses] = useState<ClassSchedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [selectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        if (activeTab === "projects") {
          const res = await fetch("/api/public/projects")
          if (!res.ok) throw new Error("Failed to fetch projects")
          const data = await res.json()
          setProjects(data)
        } else if (activeTab === "classes") {
          const res = await fetch("/api/public/classes")
          if (!res.ok) throw new Error("Failed to fetch classes")
          const data = await res.json()
          setClasses(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section with Brand Colors */}
      <div className="bg-[#12498b] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Browse Our Portfolio
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100/90 leading-relaxed">
              Explore our project achievements and upcoming class schedules. Real-time data directly from our management system.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
        {/* Tab Toggle */}
        <div className="bg-white rounded-2xl shadow-xl p-2 flex gap-2 w-fit mx-auto sm:mx-0 border border-gray-200 mb-8 sm:mb-12">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 sm:px-10 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 ${activeTab === "projects"
              ? "bg-[#12498b] text-white shadow-lg scale-105"
              : "text-gray-500 hover:bg-gray-50 hover:text-[#12498b]"
              }`}
          >
            <Building2 className="w-4 h-4 sm:w-5 h-5" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("classes")}
            className={`px-6 sm:px-10 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 ${activeTab === "classes"
              ? "bg-[#b12222] text-white shadow-lg scale-105"
              : "text-gray-500 hover:bg-gray-50 hover:text-[#b12222]"
              }`}
          >
            <Calendar className="w-4 h-4 sm:w-5 h-5" />
            Classes
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <LoadingSpinner />
            <p className="mt-4 text-gray-500 font-medium animate-pulse">Fetching latest updates...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 sm:py-20 bg-red-50 rounded-3xl border border-red-100 max-w-2xl mx-auto px-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Oops! Error Occurred</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {activeTab === "projects" ? (
              <div className="animate-fadeIn">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Featured Projects
                    {projects.length > 0 && (
                      <span className="ml-3 text-base sm:text-lg font-normal text-gray-500">
                        ({projects.length})
                      </span>
                    )}
                  </h2>
                </div>
                {projects.length === 0 ? (
                  <div className="text-center py-16 sm:py-24">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h3>
                    <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                      There are no projects available at the moment. Check back later!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {projects.map((project) => (
                      <div key={project.id} className="flex">
                        <Projectcard1 projects={project} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-fadeIn">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    All Classes
                    {classes.length > 0 && (
                      <span className="ml-3 text-base sm:text-lg font-normal text-gray-500">
                        ({classes.length})
                      </span>
                    )}
                  </h2>
                </div>
                {classes.length === 0 ? (
                  <div className="text-center py-16 sm:py-24">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Classes Yet</h3>
                    <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                      There are no classes scheduled at the moment. Check back later!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {classes.map((classItem) => (
                      <div key={classItem.id} className="flex">
                        <BrowseClassScheduleCard classItem={classItem} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Project Details Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedProject?.name}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-700">
              Complete project information
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">College</p>
                  <p className="text-base text-gray-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {selectedProject.college}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Department</p>
                  <p className="text-base text-gray-900">{selectedProject.department}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Handler</p>
                  <p className="text-base text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {selectedProject.handler}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Team</p>
                  <p className="text-base text-gray-900">{selectedProject.team}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Student</p>
                  <p className="text-base text-gray-900">{selectedProject.student}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Date</p>
                  <p className="text-base text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedProject.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${selectedProject.status === "completed"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : selectedProject.status === "ongoing"
                      ? "bg-blue-100 text-blue-800 border-blue-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }`}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Payment Progress</span>
                  <span className="font-semibold text-gray-900">{selectedProject.paymentProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#12498b] to-[#1a5ba8] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${selectedProject.paymentProgress}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Amount Paid</p>
                    <p className="text-lg font-bold text-gray-900">₹{selectedProject.amountPaid.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Final Amount</p>
                    <p className="text-lg font-bold text-gray-900">₹{selectedProject.finalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>


      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}