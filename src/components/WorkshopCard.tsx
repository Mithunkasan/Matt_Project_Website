// import Link from "next/link"
// import { Calendar, MapPin, Users, DollarSign } from "lucide-react"

// type Workshop = {
//   id: string
//   title: string
//   description: string
//   college: string
//   department: string
//   organizer: string
//   team: string
//   date: string
//   duration: string
//   location: string
//   attendees: number
//   status: string
//   fee?: number
// }

// interface WorkshopCardProps {
//   workshop: Workshop
//   view: "grid" | "detail"
// }

// export default function WorkshopCard({ workshop, view = "grid" }: WorkshopCardProps) {
//   if (view === "detail") {
//     return (
//       <div className="bg-white rounded-2xl shadow-2xl p-8 border-l-8 border-[#cb773b]">
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">{workshop.title}</h1>
//             {workshop.description && (
//               <p className="text-lg text-gray-600 max-w-2xl">{workshop.description}</p>
//             )}
//           </div>
//           <span
//             className={`px-4 py-2 rounded-full text-sm font-semibold ${
//               workshop.status === "completed"
//                 ? "bg-green-100 text-green-700"
//                 : workshop.status === "ongoing"
//                 ? "bg-blue-100 text-blue-700"
//                 : "bg-yellow-100 text-yellow-700"
//             }`}
//           >
//             {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
//           </span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Workshop Information</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3 text-lg">
//                   <Calendar className="w-5 h-5 text-[#cb773b]" />
//                   <span>{new Date(workshop.date).toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                   })}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-lg">
//                   <span className="font-semibold">Duration:</span> {workshop.duration}
//                 </div>
//                 <div className="flex items-center gap-3 text-lg">
//                   <MapPin className="w-5 h-5 text-[#cb773b]" />
//                   <span>{workshop.location}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-lg">
//                   <Users className="w-5 h-5 text-[#cb773b]" />
//                   <span>{workshop.attendees} attendees</span>
//                 </div>
//                 {workshop.fee && (
//                   <div className="flex items-center gap-3 text-lg">
//                     <DollarSign className="w-5 h-5 text-[#cb773b]" />
//                     <span>Registration Fee: ₹{workshop.fee}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Organization Details</h3>
//               <div className="space-y-3 text-lg">
//                 <p><span className="font-semibold">College:</span> {workshop.college}</p>
//                 <p><span className="font-semibold">Department:</span> {workshop.department}</p>
//                 <p><span className="font-semibold">Organizer:</span> {workshop.organizer}</p>
//                 <p><span className="font-semibold">Team:</span> {workshop.team}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-orange-50 rounded-xl p-6">
//           <h4 className="text-lg font-semibold text-[#cb773b] mb-2">Workshop Status</h4>
//           <p className="text-gray-700">
//             This workshop is currently {workshop.status}. 
//             {workshop.status === 'upcoming' && ' Registration is open for participants.'}
//             {workshop.status === 'ongoing' && ' The workshop is currently in progress.'}
//             {workshop.status === 'completed' && ' The workshop has been successfully completed.'}
//           </p>
//         </div>
//       </div>
//     )
//   }

//   // Grid view (for browse page)
//   return (
//     <Link href={`/workshops/${workshop.id}`}>
//       <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-[#cb773b] hover:-translate-y-1 cursor-pointer">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">{workshop.title}</h3>
//         {workshop.description && <p className="text-sm text-gray-600 mb-4">{workshop.description}</p>}
//         <div className="space-y-2 mb-4 text-sm text-gray-600">
//           <p><span className="font-semibold">College:</span> {workshop.college}</p>
//           <p><span className="font-semibold">Organizer:</span> {workshop.organizer}</p>
//           <p><span className="font-semibold">Date:</span> {new Date(workshop.date).toLocaleDateString()}</p>
//         </div>
//         <div className="space-y-2 mb-4 text-sm">
//           <div className="flex items-center gap-2 text-gray-700">
//             <MapPin className="w-4 h-4 text-[#cb773b]" />
//             <span>{workshop.location}</span>
//           </div>
//           <div className="flex items-center gap-2 text-gray-700">
//             <Users className="w-4 h-4 text-[#cb773b]" />
//             <span>{workshop.attendees} attendees</span>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//               workshop.status === "completed"
//                 ? "bg-green-100 text-green-700"
//                 : workshop.status === "ongoing"
//                 ? "bg-blue-100 text-blue-700"
//                 : "bg-yellow-100 text-yellow-700"
//             }`}
//           >
//             {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
//           </span>
//         </div>
//       </div>
//     </Link>
//   )
// }








import Link from "next/link"
import { Calendar, MapPin, Users, DollarSign, Building, Users2, User } from "lucide-react"

type Workshop = {
  id: string
  title: string
  description: string
  college: string
  department: string
  organizer: string
  team: string
  date: string
  duration: string
  location: string
  attendees: number
  status: string
  fee?: number
}

interface WorkshopCardProps {
  workshop: Workshop
  view: "grid" | "detail"
}

export default function WorkshopCard({ workshop, view = "grid" }: WorkshopCardProps) {
  if (view === "detail") {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-900 to-orange-700 px-6 py-6 md:px-8 md:py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                {workshop.title}
              </h1>
              {workshop.description && (
                <p className="text-orange-100 text-base md:text-lg leading-relaxed max-w-4xl">
                  {workshop.description}
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                  workshop.status === "completed"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : workshop.status === "ongoing"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-amber-100 text-amber-800 border border-amber-200"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    workshop.status === "completed"
                      ? "bg-green-500"
                      : workshop.status === "ongoing"
                      ? "bg-blue-500"
                      : "bg-amber-500"
                  }`}
                ></div>
                {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Workshop Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  Workshop Schedule
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Date</span>
                    <span className="text-gray-900 font-semibold">
                      {new Date(workshop.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Duration</span>
                    <span className="text-gray-900 font-semibold">{workshop.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Location</span>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      {workshop.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 font-medium">Attendees</span>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold">
                      <Users className="w-4 h-4 text-orange-600" />
                      {workshop.attendees} registered
                    </div>
                  </div>
                </div>
              </div>

              {workshop.fee && (
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Registration Fee</p>
                        <p className="text-xl font-bold text-gray-900">₹{workshop.fee}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Organization Details */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-600" />
                  Organization Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">College</span>
                    <span className="text-gray-900 font-semibold text-right">{workshop.college}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Department</span>
                    <span className="text-gray-900 font-semibold text-right">{workshop.department}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Organizer</span>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold">
                      <User className="w-4 h-4 text-orange-600" />
                      {workshop.organizer}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600 font-medium">Team</span>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold">
                      <Users2 className="w-4 h-4 text-orange-600" />
                      {workshop.team}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
              <h4 className="text-lg font-semibold text-orange-900 mb-3 flex items-center gap-2">
                Workshop Status
              </h4>
              <p className="text-gray-700 leading-relaxed">
                This workshop is currently <span className="font-semibold text-orange-900">{workshop.status}</span>. 
                {workshop.status === 'upcoming' && ' Registration is open for participants.'}
                {workshop.status === 'ongoing' && ' The workshop is currently in progress.'}
                {workshop.status === 'completed' && ' The workshop has been successfully completed.'}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300 font-medium">
                  View Materials
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium">
                  Contact Organizer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view (for browse page)
  return (
    <Link href={`/workshops/${workshop.id}`}>
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-orange-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
        {/* Header with status */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 pr-4 leading-tight flex-1">
            {workshop.title}
          </h3>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${
              workshop.status === "completed"
                ? "bg-green-100 text-green-800 border border-green-200"
                : workshop.status === "ongoing"
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-amber-100 text-amber-800 border border-amber-200"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                workshop.status === "completed"
                  ? "bg-green-500"
                  : workshop.status === "ongoing"
                  ? "bg-blue-500"
                  : "bg-amber-500"
              }`}
            ></div>
            {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
          </span>
        </div>

        {/* Description */}
        {workshop.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {workshop.description}
          </p>
        )}

        {/* Basic info */}
        <div className="space-y-3 mb-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Building className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <span className="truncate">{workshop.college}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <User className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <span className="truncate">{workshop.organizer}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <span>{new Date(workshop.date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Location and attendees */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <span className="truncate">{workshop.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <span>{workshop.attendees} attendees</span>
          </div>
        </div>

        {/* Fee if exists */}
        {workshop.fee && (
          <div className="mb-4">
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              <DollarSign className="w-3 h-3" />
              Registration Fee: ₹{workshop.fee}
            </div>
          </div>
        )}

        {/* Hover indicator */}
        <div className="mt-auto pt-4 border-t border-gray-100 group-hover:border-orange-200 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 group-hover:text-orange-600 transition-colors">
              View workshop details
            </span>
            <svg 
              className="w-4 h-4 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}