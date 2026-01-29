// "use client";

// import { Search } from "lucide-react";
// import { AddProjectDialog } from "./AddProjectDialog";
// import { useAppStore } from "@/lib/store";

// interface FiltersSectionProps {
//   selectedTeam: string;
//   selectedStatus: string;
//   onTeamChange: (team: string) => void;
//   onStatusChange: (status: string) => void;
//   onProjectAdded: (project: any) => void;
// }

// const teams = ["All MATT Teams", "HR", "AI", "Hardware", "Software", "JClicks", "CAD Point"];
// const statuses = ["All Statuses", "Pending", "Ongoing", "Completed"];

// export function FiltersSection({
//   selectedTeam,
//   selectedStatus,
//   onTeamChange,
//   onStatusChange,
//   onProjectAdded,
// }: FiltersSectionProps) {
//   const addProject = useAppStore((state) => state.addProject);

//   const handleProjectAdded = (project: any) => {
//     addProject(project);
//     onProjectAdded(project);
//   };

//   return (
//     <div className="flex flex-wrap gap-2 w-full items-center">
//       {/* Search Bar */}
//       <div className="relative flex-1 min-w-[250px]">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
//         <input
//           type="text"
//           placeholder="Search projects..."
//           className="w-full pl-10 pr-4 py-2 border-2 border-[#12498b] rounded-lg bg-white text-black placeholder-black focus:ring-2 focus:ring-[#12498b] focus:border-[#12498b] outline-none transition-colors"
//         />
//       </div>

//       <div className="flex gap-3 items-center">
//         {/* Team Select */}
//         <select
//           className="h-10 border-2 border-[#12498b] rounded-lg px-4 text-black bg-white focus:ring-2 focus:ring-[#12498b] focus:border-[#12498b] outline-none cursor-pointer appearance-none bg-right bg-no-repeat pr-8"
//           style={{
//             backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/csvg%3e")`,
//             backgroundPosition: "right 12px center",
//             backgroundSize: "20px",
//           }}
//           value={selectedTeam}
//           onChange={(e) => onTeamChange(e.target.value)}
//         >
//           {teams.map((team) => (
//             <option key={team} value={team}>
//               {team}
//             </option>
//           ))}
//         </select>

//         {/* Status Select */}
//         <select
//           className="h-10 border-2 border-[#b12222] rounded-lg px-4 text-black bg-white focus:ring-2 focus:ring-[#b12222] focus:border-[#b12222] outline-none cursor-pointer appearance-none bg-right bg-no-repeat pr-8"
//           style={{
//             backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/csvg%3e")`,
//             backgroundPosition: "right 12px center",
//             backgroundSize: "20px",
//           }}
//           value={selectedStatus}
//           onChange={(e) => onStatusChange(e.target.value)}
//         >
//           {statuses.map((status) => (
//             <option key={status} value={status}>
//               {status}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Add Project Button */}
//       <AddProjectDialog onProjectAdded={handleProjectAdded} />
//     </div>
//   );
// }





"use client";

import { Search } from "lucide-react";
import { AddProjectDialog } from "./AddProjectDialog";
import { useAppStore } from "@/lib/store";
import { Project } from "@/types";
import { useSession } from "next-auth/react";

interface FiltersSectionProps {
  selectedTeam: string;
  selectedStatus: string;
  searchQuery: string;
  onTeamChange: (team: string) => void;
  onStatusChange: (status: string) => void;
  onSearchChange: (query: string) => void;
  onProjectAdded: (project: Project) => void;
}

const teams = ["All MATT Teams", "HR", "AI", "Hardware", "Software", "JClicks", "CAD Point"];
const statuses = ["All Statuses", "Pending", "Ongoing", "Completed"];

export function FiltersSection({
  selectedTeam,
  selectedStatus,
  searchQuery,
  onTeamChange,
  onStatusChange,
  onSearchChange,
  onProjectAdded,
}: FiltersSectionProps) {
  const { data: session } = useSession();
  const addProject = useAppStore((state) => state.addProject);

  const handleProjectAdded = (project: Project) => {
    addProject(project);
    onProjectAdded(project);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm">
      {/* Main Container with proper spacing */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">

        {/* Search Bar - Takes full width on mobile, flex-grows on desktop */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#12498b] h-5 w-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-12 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:border-[#12498b] focus:ring-2 focus:ring-[#12498b]/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Filters Group - Wraps nicely on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-stretch sm:items-center">

          {/* Team Select */}
          <div className="relative">
            <select
              className="h-12 pl-4 pr-10 bg-white border-2 border-gray-200 rounded-lg text-black font-medium focus:border-[#12498b] focus:ring-2 focus:ring-[#12498b]/20 outline-none cursor-pointer appearance-none transition-all min-w-[160px] hover:border-[#12498b]"
              value={selectedTeam}
              onChange={(e) => onTeamChange(e.target.value)}
            >
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-[#12498b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Status Select */}
          <div className="relative">
            <select
              className="h-12 pl-4 pr-10 bg-white border-2 border-gray-200 rounded-lg text-black font-medium focus:border-[#12498b] focus:ring-2 focus:ring-[#12498b]/20 outline-none cursor-pointer appearance-none transition-all min-w-[160px] hover:border-[#12498b]"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-[#12498b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Add Project Button - Admin Only */}
          {session?.user?.role === 'ADMIN' && (
            <div className="flex items-center">
              <AddProjectDialog onProjectAdded={handleProjectAdded} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}