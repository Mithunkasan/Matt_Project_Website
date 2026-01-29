// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, Calendar, MapPin, Users, Clock, DollarSign, Trash2 } from "lucide-react"
// import { EditWorkshopDialog } from "@/components/dashboard/EditWorkshopDialog"

// export default function WorkshopsPage() {
//   const [workshops, setWorkshops] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchWorkshops = async () => {
//       try {
//         const response = await fetch("/api/workshops")
//         const data = await response.json()
//         setWorkshops(data)
//       } catch (error) {
//         console.error("Error fetching workshops:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchWorkshops()
//   }, [])

//   if (loading) {
//     return <div className="text-center py-12">Loading workshops...</div>
//   }

//   function getStatusBadgeVariant(status: string) {
//     switch (status) {
//       case "upcoming":
//         return "secondary"
//       case "ongoing":
//         return "default"
//       case "completed":
//         return "outline"
//       case "cancelled":
//         return "destructive"
//       default:
//         return "outline"
//     }
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
//           <h1 className="text-3xl font-bold text-gray-900">Workshops</h1>
//           <p className="text-gray-600">Manage and view all workshops and events</p>
//         </div>
//       </div>

//       {/* Workshops Grid */}
//       {workshops.length === 0 ? (
//         <Card>
//           <CardContent className="py-12 text-center">
//             <p className="text-gray-500">No workshops found.</p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {workshops.map((workshop) => (
//             <div key={workshop.id} className="relative group">
//               <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-[#12498b] via-purple-600 to-[#b12222] border-0 text-white overflow-hidden">
//                 <CardHeader className="pb-4">
//                   <div className="flex justify-between items-start">
//                     <CardTitle className="text-xl text-white">{workshop.title}</CardTitle>
//                     <Badge className="bg-white text-[#12498b]">{workshop.status}</Badge>
//                   </div>
//                   <CardDescription className="text-gray-100">
//                     {workshop.college} - {workshop.department}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   {workshop.description && <p className="text-sm text-gray-100">{workshop.description}</p>}
//                   <div className="flex items-center gap-2 text-sm">
//                     <Calendar className="w-4 h-4" />
//                     <span>{new Date(workshop.date).toLocaleDateString()}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Clock className="w-4 h-4" />
//                     <span>{workshop.duration}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <MapPin className="w-4 h-4" />
//                     <span>{workshop.location}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Users className="w-4 h-4" />
//                     <span>{workshop.attendees} attendees</span>
//                   </div>
//                   {workshop.fee && workshop.fee > 0 && (
//                     <div className="flex items-center gap-2 text-sm">
//                       <DollarSign className="w-4 h-4" />
//                       <span>Fee: ${workshop.fee}</span>
//                     </div>
//                   )}
//                   <div className="pt-2">
//                     <p className="text-xs text-gray-100">Organized by: {workshop.organizer}</p>
//                   </div>

//                   <div className="flex gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <EditWorkshopDialog workshop={workshop} />
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
import { ArrowLeft, Calendar, MapPin, Users, Clock, DollarSign, Trash2 } from "lucide-react"
import { EditWorkshopDialog } from "@/components/dashboard/EditWorkshopDialog"

interface Workshop {
  id: string
  title: string
  college: string
  department: string
  date: string
  duration: string
  location: string
  attendees: number
  fee?: number
  organizer: string
  status: string
  description?: string
}

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch("/api/workshops")
        const data = await response.json()
        setWorkshops(data)
      } catch (error) {
        console.error("Error fetching workshops:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchWorkshops()
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading workshops...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Workshops</h1>
          <p className="text-gray-600">Manage and view all workshops and events</p>
        </div>
      </div>

      {/* Workshops Grid */}
      {workshops.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No workshops found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <div key={workshop.id} className="relative group">
              <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-[#12498b] via-purple-600 to-[#b12222] border-0 text-white overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-white">{workshop.title}</CardTitle>
                    <Badge className="bg-white text-[#12498b]">{workshop.status}</Badge>
                  </div>
                  <CardDescription className="text-gray-100">
                    {workshop.college} - {workshop.department}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {workshop.description && <p className="text-sm text-gray-100">{workshop.description}</p>}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{workshop.attendees} attendees</span>
                  </div>
                  {workshop.fee && workshop.fee > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4" />
                      <span>Fee: ${workshop.fee}</span>
                    </div>
                  )}
                  <div className="pt-2">
                    <p className="text-xs text-gray-100">Organized by: {workshop.organizer}</p>
                  </div>

                  <div className="flex gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditWorkshopDialog workshop={workshop} />
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