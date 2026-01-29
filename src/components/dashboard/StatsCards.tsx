// import { TrendingUp, DollarSign, Clock, X } from "lucide-react";
// import { useState } from "react";

// interface StatsCardsProps {
//   totalProjects?: number;
//   completedProjects?: number;
//   totalPayment?: number;
//   totalValue?: number;
//   activeClasses?: number;
//   totalAttendees?: number;
//   activeTab?: "projects" | "classes" | "workshops";
//   // New props for dynamic data
//   projectsChartData?: any[];
//   paymentChartData?: any[];
//   activitiesChartData?: any[];
//   projectsTableData?: any[];
//   paymentTableData?: any[];
//   activitiesTableData?: any[];
//   allProjects?: any[];
//   allClasses?: any[];
//   allWorkshops?: any[];
// }

// interface PopupData {
//   type: "projects" | "payment" | "activities";
//   title: string;
//   data: any;
//   stats: {
//     completedProjects?: number;
//     totalProjects?: number;
//     totalPayment?: number;
//     totalValue?: number;
//     percentage?: number;
//     activeClasses?: number;
//     totalAttendees?: number;
//   };
// }

// export function StatsCards({ 
//   totalProjects = 0,
//   completedProjects = 0,
//   totalPayment = 0,
//   totalValue = 0,
//   activeClasses = 0,
//   totalAttendees = 0,
//   activeTab = "projects",
//   // Default empty arrays for dynamic data
//   projectsChartData = [],
//   paymentChartData = [],
//   activitiesChartData = [],
//   projectsTableData = [],
//   paymentTableData = [],
//   activitiesTableData = [],
//   allProjects = [],
//   allClasses = [],
//   allWorkshops = []
// }: StatsCardsProps) {
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupData, setPopupData] = useState<PopupData | null>(null);

//   const colorMap = {
//     projects: "#12498b",
//     classes: "#b12222", 
//     workshops: "#15803d"
//   };

//   const activeColor = colorMap[activeTab];

//   // Get popup data based on actual data
//   const getPopupData = (type: string, title: string, stats: any) => {
//     const baseData = {
//       projects: {
//         chartData: projectsChartData.length > 0 ? projectsChartData : [
//           { month: 'Jan', completed: 0, ongoing: 0, pending: 0, total: 0 }
//         ],
//         tableData: projectsTableData.length > 0 ? projectsTableData : [
//           { id: 1, name: 'No projects', status: 'N/A', progress: 0, amount: 0 }
//         ]
//       },
//       payment: {
//         chartData: paymentChartData.length > 0 ? paymentChartData : [
//           { month: 'Jan', received: 0, pending: 0 }
//         ],
//         tableData: paymentTableData.length > 0 ? paymentTableData : [
//           { id: 1, project: 'No payments', amount: 0, status: 'N/A', date: 'N/A' }
//         ]
//       },
//       activities: {
//         chartData: activitiesChartData.length > 0 ? activitiesChartData : [
//           { day: 'Mon', classes: 0, workshops: 0 }
//         ],
//         tableData: activitiesTableData.length > 0 ? activitiesTableData : [
//           { id: 1, name: 'No activities', type: 'N/A', attendees: 0, date: 'N/A' }
//         ]
//       }
//     };

//     return {
//       type: type as "projects" | "payment" | "activities",
//       title,
//       data: baseData[type as keyof typeof baseData],
//       stats
//     };
//   };

//   const handleCardClick = (type: string, title: string, stats: any) => {
//     setPopupData(getPopupData(type, title, stats));
//     setShowPopup(true);
//   };

//   // Calculate dynamic percentages
//   const projectCompletionPercentage = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
//   const paymentCollectionPercentage = totalValue > 0 ? Math.round((totalPayment / totalValue) * 100) : 0;

//   const statsData = [
//     {
//       title: activeTab === "projects" ? "Total Projects" : 
//              activeTab === "classes" ? "Total Classes" : "Total Workshops",
//       value: activeTab === "projects" ? totalProjects.toString() :
//              activeTab === "classes" ? activeClasses.toString() : allWorkshops.length.toString(),
//       subtitle: activeTab === "projects" ? `${completedProjects} completed` :
//                 activeTab === "classes" ? "Scheduled sessions" : `${totalAttendees} total attendees`,
//       footer: "Click to view details",
//       icon: TrendingUp,
//       percentage: activeTab === "projects" ? projectCompletionPercentage :
//                  activeTab === "classes" ? 100 : projectCompletionPercentage,
//       type: "projects",
//       clickText: "View Details",
//       stats: {
//         completedProjects: activeTab === "projects" ? completedProjects : activeClasses,
//         totalProjects: activeTab === "projects" ? totalProjects : allWorkshops.length,
//         percentage: activeTab === "projects" ? projectCompletionPercentage : 100
//       }
//     },
//     {
//       title: "Total Payment",
//       value: `₹${totalPayment.toLocaleString()}`,
//       subtitle: `₹${totalValue.toLocaleString()} total value`,
//       footer: "Click to view analytics",
//       icon: DollarSign,
//       percentage: paymentCollectionPercentage,
//       type: "payment",
//       clickText: "View Analytics",
//       stats: {
//         totalPayment,
//         totalValue,
//         percentage: paymentCollectionPercentage
//       }
//     },
//     {
//       title: activeTab === "classes" ? "Upcoming Classes" : "Active Items",
//       value: activeTab === "classes" ? activeClasses.toString() : (allClasses.length + allWorkshops.length).toString(),
//       subtitle: activeTab === "classes" ? "Scheduled sessions" : "Managing schedules",
//       footer: "View all items",
//       icon: Clock,
//       percentage: 100,
//       type: "activities",
//       clickText: "View Schedule",
//       stats: {
//         completedProjects: activeClasses,
//         activeClasses: allClasses.length,
//         totalAttendees,
//         percentage: 100
//       }
//     }
//   ];

//   const renderChart = (data: any, type: string) => {
//     if (!data.chartData || data.chartData.length === 0) {
//       return (
//         <div className="mt-4 text-center py-8 text-gray-500">
//           No data available for chart
//         </div>
//       );
//     }

//     // Find max value for scaling
//     const maxValue = Math.max(
//       ...data.chartData.flatMap((item: any) => {
//         if (type === 'projects') return [item.completed, item.ongoing, item.pending, item.total];
//         if (type === 'payment') return [item.received, item.pending];
//         if (type === 'activities') return [item.classes, item.workshops];
//         return [0];
//       }),
//       1 // Ensure we don't divide by zero
//     );

//     return (
//       <div className="mt-4">
//         <h4 className="text-sm font-semibold mb-3">
//           {type === 'projects' ? 'Monthly Project Overview' : 
//            type === 'payment' ? 'Monthly Payment Overview' : 'Weekly Activities Overview'}
//         </h4>
//         <div className="flex items-end justify-between h-32 gap-2">
//           {data.chartData.map((item: any, index: number) => (
//             <div key={index} className="flex flex-col items-center flex-1">
//               <div className="flex items-end justify-center gap-1 h-20 w-full">
//                 {type === 'projects' && (
//                   <>
//                     <div 
//                       className="w-3 bg-green-500 rounded-t transition-all duration-300 hover:opacity-80"
//                       style={{ height: `${(item.completed / maxValue) * 70}px` }}
//                       title={`Completed: ${item.completed}`}
//                     />
//                     <div 
//                       className="w-3 bg-blue-500 rounded-t transition-all duration-300 hover:opacity-80"
//                       style={{ height: `${(item.ongoing / maxValue) * 70}px` }}
//                       title={`Ongoing: ${item.ongoing}`}
//                     />
//                     <div 
//                       className="w-3 bg-gray-400 rounded-t transition-all duration-300 hover:opacity-80"
//                       style={{ height: `${(item.pending / maxValue) * 70}px` }}
//                       title={`Pending: ${item.pending}`}
//                     />
//                   </>
//                 )}
//                 {type === 'payment' && (
//                   <>
//                     <div 
//                       className="w-4 bg-green-500 rounded-t transition-all duration-300 hover:opacity-80"
//                       style={{ height: `${(item.received / maxValue) * 70}px` }}
//                       title={`Received: ₹${item.received.toLocaleString()}`}
//                     />
//                     <div 
//                       className="w-4 bg-orange-500 rounded-t transition-all duration-300 hover:opacity-80"
//                       style={{ height: `${(item.pending / maxValue) * 70}px` }}
//                       title={`Pending: ₹${item.pending.toLocaleString()}`}
//                     />
//                   </>
//                 )}
//                 {type === 'activities' && (
//                   <>
//                     <div 
//                       className="w-3 bg-purple-500 rounded-t transition-all duration-300 hover:opacity-80"
//                       style={{ height: `${(item.classes / maxValue) * 70}px` }}
//                       title={`Classes: ${item.classes}`}
//                     />
//                     <div 
//                       className="w-3 bg-pink-500 rounded-t transition-all duration-300 hover:opacity-80"
//                       style={{ height: `${(item.workshops / maxValue) * 70}px` }}
//                       title={`Workshops: ${item.workshops}`}
//                     />
//                   </>
//                 )}
//               </div>
//               <span className="text-xs mt-2 text-gray-600 font-medium">{item.month || item.day}</span>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center gap-4 mt-3 text-xs">
//           {type === 'projects' && (
//             <>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 bg-green-500 rounded"></div>
//                 <span>Completed</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 bg-blue-500 rounded"></div>
//                 <span>Ongoing</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 bg-gray-400 rounded"></div>
//                 <span>Pending</span>
//               </div>
//             </>
//           )}
//           {type === 'payment' && (
//             <>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 bg-green-500 rounded"></div>
//                 <span>Received</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 bg-orange-500 rounded"></div>
//                 <span>Pending</span>
//               </div>
//             </>
//           )}
//           {type === 'activities' && (
//             <>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 bg-purple-500 rounded"></div>
//                 <span>Classes</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-3 h-3 bg-pink-500 rounded"></div>
//                 <span>Workshops</span>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderTable = (data: any) => {
//     if (!data.tableData || data.tableData.length === 0) {
//       return (
//         <div className="mt-6 text-center py-4 text-gray-500">
//           No data available
//         </div>
//       );
//     }

//     return (
//       <div className="mt-6">
//         <h4 className="text-sm font-semibold mb-3">Recent Items</h4>
//         <div className="overflow-x-auto border rounded-lg">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 border-b">
//                 {Object.keys(data.tableData[0]).filter(key => key !== 'id').map((key) => (
//                   <th key={key} className="text-left py-3 px-4 font-semibold text-gray-700">
//                     {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.tableData.map((row: any, index: number) => (
//                 <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
//                   {Object.entries(row).filter(([key]) => key !== 'id').map(([key, value]: [string, any], cellIndex) => (
//                     <td key={cellIndex} className="py-2 px-4">
//                       {typeof value === 'number' && value > 1000 && key !== 'progress' ? 
//                         `₹${value.toLocaleString()}` : 
//                         key === 'progress' ? `${value}%` : value
//                       }
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="w-full px-2 py-3">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {statsData.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={index}
//                 className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer bg-white border border-gray-200"
//                 onClick={() => handleCardClick(stat.type, stat.title, stat.stats)}
//               >
//                 <div 
//                   className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                   style={{ 
//                     background: `linear-gradient(135deg, white, ${activeColor}08)`
//                   }}
//                 />

//                 <div className="relative p-4 sm:p-5">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <h3 className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wide">
//                         {stat.title}
//                       </h3>
//                     </div>
//                     <div 
//                       className="ml-3 p-2.5 rounded-lg transition-colors group-hover:scale-105"
//                       style={{ 
//                         backgroundColor: `${activeColor}15`,
//                         color: activeColor
//                       }}
//                     >
//                       <Icon className="w-5 h-5" style={{ color: activeColor }} />
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <div 
//                       className="text-2xl sm:text-3xl font-bold mb-1"
//                       style={{ color: activeColor }}
//                     >
//                       {stat.value}
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-600">
//                       {stat.subtitle}
//                     </p>
//                   </div>

//                   <div className="mb-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                     <div 
//                       className="h-full rounded-full transition-all duration-500"
//                       style={{ 
//                         width: `${stat.percentage}%`,
//                         backgroundColor: activeColor
//                       }}
//                     />
//                   </div>

//                   <div className="w-full text-left">
//                     <p 
//                       className="text-xs transition-colors group-hover:font-medium hover:underline"
//                       style={{ color: activeColor }}
//                     >
//                       {stat.clickText} →
//                     </p>
//                   </div>
//                 </div>

//                 <div 
//                   className="absolute inset-0 rounded-xl border transition-colors pointer-events-none group-hover:border-opacity-50"
//                   style={{ 
//                     borderColor: `${activeColor}30`,
//                     borderWidth: '1px'
//                   }}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Popup Modal */}
//       {showPopup && popupData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl shadow-sm">
//               <h2 className="text-xl font-bold" style={{ color: activeColor }}>
//                 {popupData.title} - Detailed Analysis
//               </h2>
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="p-6">
//               {/* Chart Section */}
//               {renderChart(popupData.data, popupData.type)}

//               {/* Table Section */}
//               {renderTable(popupData.data)}

//               {/* Summary Stats */}
//               <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
//                 {popupData.type === 'projects' && (
//                   <>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-green-600">{popupData.stats.completedProjects}</div>
//                       <div className="text-sm text-gray-600">Completed</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-blue-600">{(popupData.stats.totalProjects || 0) - (popupData.stats.completedProjects || 0)}</div>
//                       <div className="text-sm text-gray-600">Ongoing</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-gray-600">{popupData.stats.totalProjects}</div>
//                       <div className="text-sm text-gray-600">Total</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold" style={{ color: activeColor }}>{popupData.stats.percentage}%</div>
//                       <div className="text-sm text-gray-600">Completion Rate</div>
//                     </div>
//                   </>
//                 )}
//                 {popupData.type === 'payment' && (
//                   <>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-green-600">₹{(popupData.stats.totalPayment || 0).toLocaleString()}</div>
//                       <div className="text-sm text-gray-600">Received</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-orange-600">₹{((popupData.stats.totalValue || 0) - (popupData.stats.totalPayment || 0)).toLocaleString()}</div>
//                       <div className="text-sm text-gray-600">Pending</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-gray-600">₹{(popupData.stats.totalValue || 0).toLocaleString()}</div>
//                       <div className="text-sm text-gray-600">Total Value</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold" style={{ color: activeColor }}>{popupData.stats.percentage}%</div>
//                       <div className="text-sm text-gray-600">Collection Rate</div>
//                     </div>
//                   </>
//                 )}
//                 {popupData.type === 'activities' && (
//                   <>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-purple-600">{popupData.stats.activeClasses}</div>
//                       <div className="text-sm text-gray-600">Active Classes</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-pink-600">{popupData.stats.completedProjects}</div>
//                       <div className="text-sm text-gray-600">Upcoming</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold text-gray-600">{(popupData.stats.activeClasses || 0) + (popupData.stats.completedProjects || 0)}</div>
//                       <div className="text-sm text-gray-600">Total Items</div>
//                     </div>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold" style={{ color: activeColor }}>{popupData.stats.percentage}%</div>
//                       <div className="text-sm text-gray-600">Active Rate</div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }






"use client"

import { TrendingUp, DollarSign, Clock, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface ChartDataItem {
  month?: string;
  day?: string;
  completed?: number;
  ongoing?: number;
  pending?: number;
  total?: number;
  received?: number;
  pendingPayment?: number;
  classes?: number;
  workshops?: number;
}

interface TableDataItem {
  id: number;
  name?: string;
  status?: string;
  progress?: number;
  amount?: number;
  project?: string;
  date?: string;
  type?: string;
  attendees?: number;
}

interface PopupData {
  type: "projects" | "payment" | "activities";
  title: string;
  data: {
    chartData: ChartDataItem[];
    tableData: TableDataItem[];
  };
  stats: {
    completedProjects?: number;
    totalProjects?: number;
    totalPayment?: number;
    totalValue?: number;
    percentage?: number;
    activeClasses?: number;
    totalAttendees?: number;
  };
}

interface StatsCardsProps {
  totalProjects?: number;
  completedProjects?: number;
  totalPayment?: number;
  totalValue?: number;
  activeClasses?: number;
  totalAttendees?: number;
  activeTab?: "projects" | "classes" | "workshops";
  projectsChartData?: ChartDataItem[];
  paymentChartData?: ChartDataItem[];
  activitiesChartData?: ChartDataItem[];
  projectsTableData?: TableDataItem[];
  paymentTableData?: TableDataItem[];
  activitiesTableData?: TableDataItem[];
  allProjects?: unknown[];
  allClasses?: unknown[];
  allWorkshops?: unknown[];
}

export function StatsCards({
  totalProjects = 0,
  completedProjects = 0,
  totalPayment = 0,
  totalValue = 0,
  activeClasses = 0,
  totalAttendees = 0,
  activeTab = "projects",
  projectsChartData = [],
  paymentChartData = [],
  activitiesChartData = [],
  projectsTableData = [],
  paymentTableData = [],
  activitiesTableData = [],
  allClasses = [],
  allWorkshops = []
}: StatsCardsProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState<PopupData | null>(null);


  const colorMap = {
    projects: "#12498b",
    classes: "#b12222",
    workshops: "#15803d"
  };

  const activeColor = colorMap[activeTab];

  const getPopupData = (type: string, title: string, stats: PopupData['stats']) => {
    const baseData = {
      projects: {
        chartData: projectsChartData.length > 0 ? projectsChartData : [
          { month: 'Jan', completed: 0, ongoing: 0, pending: 0, total: 0 }
        ],
        tableData: projectsTableData.length > 0 ? projectsTableData : [
          { id: 1, name: 'No projects', status: 'N/A', progress: 0, amount: 0 }
        ]
      },
      payment: {
        chartData: paymentChartData.length > 0 ? paymentChartData : [
          { month: 'Jan', received: 0, pending: 0 }
        ],
        tableData: paymentTableData.length > 0 ? paymentTableData : [
          { id: 1, project: 'No payments', amount: 0, status: 'N/A', date: 'N/A' }
        ]
      },
      activities: {
        chartData: activitiesChartData.length > 0 ? activitiesChartData : [
          { day: 'Mon', classes: 0, workshops: 0 }
        ],
        tableData: activitiesTableData.length > 0 ? activitiesTableData : [
          { id: 1, name: 'No activities', type: 'N/A', attendees: 0, date: 'N/A' }
        ]
      }
    };

    return {
      type: type as "projects" | "payment" | "activities",
      title,
      data: baseData[type as keyof typeof baseData],
      stats
    };
  };

  const handleCardClick = (type: string, title: string, stats: PopupData['stats']) => {
    setPopupData(getPopupData(type, title, stats));
    setShowPopup(true);
  };

  const projectCompletionPercentage = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
  const paymentCollectionPercentage = totalValue > 0 ? Math.round((totalPayment / totalValue) * 100) : 0;

  const statsData = [
    {
      title: activeTab === "projects" ? "Total Projects" :
        activeTab === "classes" ? "Total Classes" : "Total Workshops",
      value: activeTab === "projects" ? totalProjects.toString() :
        activeTab === "classes" ? activeClasses.toString() : allWorkshops.length.toString(),
      subtitle: activeTab === "projects" ? `${completedProjects} completed` :
        activeTab === "classes" ? "Scheduled sessions" : `${totalAttendees} total attendees`,
      footer: "Click to view details",
      icon: TrendingUp,
      percentage: activeTab === "projects" ? projectCompletionPercentage :
        activeTab === "classes" ? 100 : projectCompletionPercentage,
      type: "projects",
      clickText: "View Details",
      stats: {
        completedProjects: activeTab === "projects" ? completedProjects : activeClasses,
        totalProjects: activeTab === "projects" ? totalProjects : allWorkshops.length,
        percentage: activeTab === "projects" ? projectCompletionPercentage : 100
      },
      visible: true
    },
    {
      title: "Total Payment",
      value: `₹${totalPayment.toLocaleString()}`,
      subtitle: `₹${totalValue.toLocaleString()} total value`,
      footer: "Click to view analytics",
      icon: DollarSign,
      percentage: paymentCollectionPercentage,
      type: "payment",
      clickText: "View Analytics",
      stats: {
        totalPayment,
        totalValue,
        percentage: paymentCollectionPercentage
      },
      visible: isAdmin // HIDE FOR STUDENTS
    },
    {
      title: activeTab === "classes" ? "Upcoming Classes" : "Active Items",
      value: activeTab === "classes" ? activeClasses.toString() : (allClasses.length + allWorkshops.length).toString(),
      subtitle: activeTab === "classes" ? "Scheduled sessions" : "Managing schedules",
      footer: "View all items",
      icon: Clock,
      percentage: 100,
      type: "activities",
      clickText: "View Schedule",
      stats: {
        completedProjects: activeClasses,
        activeClasses: allClasses.length,
        totalAttendees,
        percentage: 100
      },
      visible: true
    }
  ].filter(stat => stat.visible);


  const renderChart = (data: PopupData['data'], type: string) => {
    if (!data.chartData || data.chartData.length === 0) {
      return (
        <div className="mt-4 text-center py-8 text-gray-500">
          No data available for chart
        </div>
      );
    }

    const maxValue = Math.max(
      ...data.chartData.flatMap((item: ChartDataItem) => {
        if (type === 'projects') return [item.completed || 0, item.ongoing || 0, item.pending || 0, item.total || 0];
        if (type === 'payment') return [item.received || 0, item.pendingPayment || 0];
        if (type === 'activities') return [item.classes || 0, item.workshops || 0];
        return [0];
      }),
      1
    );

    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-3">
          {type === 'projects' ? 'Monthly Project Overview' :
            type === 'payment' ? 'Monthly Payment Overview' : 'Weekly Activities Overview'}
        </h4>
        <div className="flex items-end justify-between h-32 gap-2">
          {data.chartData.map((item: ChartDataItem, index: number) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-end justify-center gap-1 h-20 w-full">
                {type === 'projects' && (
                  <>
                    <div
                      className="w-3 bg-green-500 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${((item.completed || 0) / maxValue) * 70}px` }}
                      title={`Completed: ${item.completed}`}
                    />
                    <div
                      className="w-3 bg-blue-500 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${((item.ongoing || 0) / maxValue) * 70}px` }}
                      title={`Ongoing: ${item.ongoing}`}
                    />
                    <div
                      className="w-3 bg-gray-400 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${((item.pending || 0) / maxValue) * 70}px` }}
                      title={`Pending: ${item.pending}`}
                    />
                  </>
                )}
                {type === 'payment' && (
                  <>
                    <div
                      className="w-4 bg-green-500 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${((item.received || 0) / maxValue) * 70}px` }}
                      title={`Received: ₹${(item.received || 0).toLocaleString()}`}
                    />
                    <div
                      className="w-4 bg-orange-500 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${((item.pendingPayment || 0) / maxValue) * 70}px` }}
                      title={`Pending: ₹${(item.pendingPayment || 0).toLocaleString()}`}
                    />
                  </>
                )}
                {type === 'activities' && (
                  <>
                    <div
                      className="w-3 bg-purple-500 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${((item.classes || 0) / maxValue) * 70}px` }}
                      title={`Classes: ${item.classes}`}
                    />
                    <div
                      className="w-3 bg-pink-500 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${((item.workshops || 0) / maxValue) * 70}px` }}
                      title={`Workshops: ${item.workshops}`}
                    />
                  </>
                )}
              </div>
              <span className="text-xs mt-2 text-gray-600 font-medium">{item.month || item.day}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-3 text-xs">
          {type === 'projects' && (
            <>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Ongoing</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-400 rounded"></div>
                <span>Pending</span>
              </div>
            </>
          )}
          {type === 'payment' && (
            <>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Received</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Pending</span>
              </div>
            </>
          )}
          {type === 'activities' && (
            <>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Classes</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-pink-500 rounded"></div>
                <span>Workshops</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderTable = (data: PopupData['data']) => {
    if (!data.tableData || data.tableData.length === 0) {
      return (
        <div className="mt-6 text-center py-4 text-gray-500">
          No data available
        </div>
      );
    }

    return (
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-3">Recent Items</h4>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                {Object.keys(data.tableData[0]).filter(key => key !== 'id').map((key) => (
                  <th key={key} className="text-left py-3 px-4 font-semibold text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tableData.map((row: TableDataItem, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  {Object.entries(row).filter(([key]) => key !== 'id').map(([key, value], cellIndex) => (
                    <td key={cellIndex} className="py-2 px-4">
                      {typeof value === 'number' && value > 1000 && key !== 'progress' ?
                        `₹${value.toLocaleString()}` :
                        key === 'progress' ? `${value}%` : value
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full px-2 py-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer bg-white border border-gray-200"
                onClick={() => handleCardClick(stat.type, stat.title, stat.stats)}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, white, ${activeColor}08)`
                  }}
                />

                <div className="relative p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wide">
                        {stat.title}
                      </h3>
                    </div>
                    <div
                      className="ml-3 p-2.5 rounded-lg transition-colors group-hover:scale-105"
                      style={{
                        backgroundColor: `${activeColor}15`,
                        color: activeColor
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: activeColor }} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div
                      className="text-2xl sm:text-3xl font-bold mb-1"
                      style={{ color: activeColor }}
                    >
                      {stat.value}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {stat.subtitle}
                    </p>
                  </div>

                  <div className="mb-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${stat.percentage}%`,
                        backgroundColor: activeColor
                      }}
                    />
                  </div>

                  <div className="w-full text-left">
                    <p
                      className="text-xs transition-colors group-hover:font-medium hover:underline"
                      style={{ color: activeColor }}
                    >
                      {stat.clickText} →
                    </p>
                  </div>
                </div>

                <div
                  className="absolute inset-0 rounded-xl border transition-colors pointer-events-none group-hover:border-opacity-50"
                  style={{
                    borderColor: `${activeColor}30`,
                    borderWidth: '1px'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && popupData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl shadow-sm">
              <h2 className="text-xl font-bold" style={{ color: activeColor }}>
                {popupData.title} - Detailed Analysis
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Chart Section */}
              {renderChart(popupData.data, popupData.type)}

              {/* Table Section */}
              {renderTable(popupData.data)}

              {/* Summary Stats */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                {popupData.type === 'projects' && (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{popupData.stats.completedProjects}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{(popupData.stats.totalProjects || 0) - (popupData.stats.completedProjects || 0)}</div>
                      <div className="text-sm text-gray-600">Ongoing</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{popupData.stats.totalProjects}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: activeColor }}>{popupData.stats.percentage}%</div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                  </>
                )}
                {popupData.type === 'payment' && (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">₹{(popupData.stats.totalPayment || 0).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Received</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">₹{((popupData.stats.totalValue || 0) - (popupData.stats.totalPayment || 0)).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">₹{(popupData.stats.totalValue || 0).toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: activeColor }}>{popupData.stats.percentage}%</div>
                      <div className="text-sm text-gray-600">Collection Rate</div>
                    </div>
                  </>
                )}
                {popupData.type === 'activities' && (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{popupData.stats.activeClasses}</div>
                      <div className="text-sm text-gray-600">Active Classes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600">{popupData.stats.completedProjects}</div>
                      <div className="text-sm text-gray-600">Upcoming</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{(popupData.stats.activeClasses || 0) + (popupData.stats.completedProjects || 0)}</div>
                      <div className="text-sm text-gray-600">Total Items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold" style={{ color: activeColor }}>{popupData.stats.percentage}%</div>
                      <div className="text-sm text-gray-600">Active Rate</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}