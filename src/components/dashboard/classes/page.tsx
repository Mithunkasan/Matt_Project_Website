// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, Calendar, MapPin, User, Clock, Trash2 } from "lucide-react"
// import { EditClassDialog } from "@/components/dashboard/EditClassDialog"

// export default function ClassesPage() {
//   const [classSchedules, setClassSchedules] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await fetch("/api/classes")
//         const data = await response.json()
//         setClassSchedules(data)
//       } catch (error) {
//         console.error("Error fetching class schedules:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchClasses()
//   }, [])

//   if (loading) {
//     return <div className="text-center py-12">Loading class schedules...</div>
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-4">
//         <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
//           <ArrowLeft className="w-4 h-4" />
//           Back to Dashboard
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Class Schedules</h1>
//           <p className="text-gray-600">View and manage all class schedules</p>
//         </div>
//       </div>

//       {/* Classes Grid */}
//       {classSchedules.length === 0 ? (
//         <Card>
//           <CardContent className="py-12 text-center">
//             <p className="text-gray-500">No class schedules found.</p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classSchedules.map((classSchedule) => (
//             <div key={classSchedule.id} className="relative group">
//               <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-[#b12222] to-[#12498b] border-0 text-white overflow-hidden">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="text-xl text-white">{classSchedule.project}</CardTitle>
//                   <CardDescription className="text-gray-100">{classSchedule.department}</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center gap-2 text-sm">
//                     <Calendar className="w-4 h-4" />
//                     <span>{new Date(classSchedule.date).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Clock className="w-4 h-4" />
//                     <span>{classSchedule.time}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <User className="w-4 h-4" />
//                     <span>{classSchedule.faculty}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <MapPin className="w-4 h-4" />
//                     <span>{classSchedule.location}</span>
//                   </div>
//                   <div className="pt-2">
//                     <Badge className="bg-white text-[#b12222]">{classSchedule.day}</Badge>
//                   </div>

//                   <div className="flex gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <EditClassDialog classSchedule={classSchedule} />
//                     <Button variant="destructive" size="sm" className="flex-1">
//                       <Trash2 className="w-4 h-4 mr-1" />
//                       Delete
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }





"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, User, Clock, Trash2 } from "lucide-react"
import { EditClassDialog } from "@/components/dashboard/EditClassDialog"

interface ClassSchedule {
  id: string
  project: string
  department: string
  date: string
  time: string
  faculty: string
  location: string
  day: string
}

export default function ClassesPage() {
  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("/api/classes")
        const data = await response.json()
        setClassSchedules(data)
      } catch (error) {
        console.error("Error fetching class schedules:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchClasses()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading class schedules...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Schedules</h1>
          <p className="text-gray-600">View and manage all class schedules</p>
        </div>
      </div>

      {/* Classes Grid */}
      {classSchedules.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No class schedules found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classSchedules.map((classSchedule) => (
            <div key={classSchedule.id} className="relative group">
              <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-[#b12222] to-[#12498b] border-0 text-white overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white">{classSchedule.project}</CardTitle>
                  <CardDescription className="text-gray-100">{classSchedule.department}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(classSchedule.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{classSchedule.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    <span>{classSchedule.faculty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{classSchedule.location}</span>
                  </div>
                  <div className="pt-2">
                    <Badge className="bg-white text-[#b12222]">{classSchedule.day}</Badge>
                  </div>

                  <div className="flex gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditClassDialog classSchedule={classSchedule} />
                    <Button variant="destructive" size="sm" className="flex-1">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}