// @/components/dashboard/DashboardClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FiltersSection } from "@/components/dashboard/FiltersSection";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { ClassScheduleCard } from "@/components/dashboard/ClassScheduleCard";
import { AddClassDialog } from "@/components/dashboard/AddClassDialog";
import { PageLoading } from "@/components/layout/PageLoading";
import { LoadingSpinner } from "@/components/ui/Loading";
import { useAppStore } from "@/lib/store";
import { Project, ClassSchedule } from "@/types";
import { Search } from "lucide-react";

export function DashboardClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    projects,
    classSchedules,
    addProject,
    deleteProject,
    updateProject,
    addClassSchedule,
    deleteClassSchedule,
    updateClassSchedule,
    fetchProjects,
    fetchClassSchedules
  } = useAppStore();

  const [selectedTeam, setSelectedTeam] = useState("All MATT Teams");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "classes">("projects");
  const [loading, setLoading] = useState(true);
  const [fetchingData, setFetchingData] = useState(false);

  // Teams and statuses options


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const loadData = async () => {
      if (session) {
        setFetchingData(true);
        try {
          await Promise.all([
            fetchProjects(),
            fetchClassSchedules()
          ]);
        } catch (error) {
          console.error('Failed to load data:', error);
        } finally {
          setFetchingData(false);
          setLoading(false);
        }
      }
    };

    loadData();
  }, [session, fetchProjects, fetchClassSchedules]);

  // Reset search when changing tabs
  useEffect(() => {
    setSearchQuery("");
  }, [activeTab]);

  const handleProjectUpdated = (projectId: string, updatedData: Partial<Project>) => {
    updateProject(projectId, updatedData);
  };

  const handleProjectDeleted = (projectId: string) => {
    deleteProject(projectId);
  };

  const handleClassUpdated = (classId: string, updatedData: Partial<ClassSchedule>) => {
    updateClassSchedule(classId, updatedData);
  };

  const handleClassDeleted = (classId: string) => {
    deleteClassSchedule(classId);
  };

  if (status === "loading" || loading) {
    return <PageLoading />;
  }

  if (!session) {
    return null;
  }

  const handleProjectAdded = (newProject: Project) => {
    addProject(newProject);
  };

  const handleClassAdded = (newClass: ClassSchedule) => {
    addClassSchedule(newClass);
  };

  // Safe filtering function to handle undefined values
  const safeSearchMatch = (text: string | undefined | null, query: string): boolean => {
    if (!text) return false;
    return text.toLowerCase().includes(query.toLowerCase());
  };

  // Updated filtering logic with safe search - using actual Project properties
  const filteredProjects = projects.filter(project => {
    const teamMatch = selectedTeam === "All MATT Teams" || project.team === selectedTeam;
    const statusMatch = selectedStatus === "All Statuses" || project.status === selectedStatus.toLowerCase();

    // Safe search filter - using properties that actually exist in Project type
    const searchMatch = searchQuery === "" ||
      safeSearchMatch(project.name, searchQuery) ||
      safeSearchMatch(project.college, searchQuery) ||
      safeSearchMatch(project.department, searchQuery) ||
      safeSearchMatch(project.handler, searchQuery) ||
      safeSearchMatch(project.student, searchQuery);

    return teamMatch && statusMatch && searchMatch;
  });


  // Filter class schedules with safe search
  const filteredClassSchedules = classSchedules.filter(classItem => {
    const searchMatch = searchQuery === "" ||
      safeSearchMatch(classItem.project, searchQuery) ||
      safeSearchMatch(classItem.department, searchQuery) ||
      safeSearchMatch(classItem.faculty, searchQuery) ||
      safeSearchMatch(classItem.location, searchQuery);

    return searchMatch;
  });

  // Calculate stats dynamically
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalPayment = projects.reduce((sum, project) => sum + (project.amountPaid || 0), 0);
  const totalValue = projects.reduce((sum, project) => sum + (project.finalAmount || 0), 0);

  // Class schedule stats
  const totalClasses = classSchedules.length;

  // Prepare dynamic data for charts
  const getProjectsChartData = () => {
    // Group projects by month
    const monthlyData: { [key: string]: { completed: number; ongoing: number; pending: number; total: number } } = {};

    // Get last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleString('default', { month: 'short' }));
    }

    // Initialize all months with zero values
    months.forEach(month => {
      monthlyData[month] = { completed: 0, ongoing: 0, pending: 0, total: 0 };
    });

    projects.forEach(project => {
      // Use createdDate or fallback to current month
      const date = project.createdAt ? new Date(project.createdAt) : new Date();
      const monthKey = date.toLocaleString('default', { month: 'short' });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { completed: 0, ongoing: 0, pending: 0, total: 0 };
      }

      monthlyData[monthKey].total++;
      if (project.status === 'completed') monthlyData[monthKey].completed++;
      else if (project.status === 'ongoing') monthlyData[monthKey].ongoing++;
      else monthlyData[monthKey].pending++;
    });

    return months.map(month => ({
      month,
      completed: monthlyData[month].completed,
      ongoing: monthlyData[month].ongoing,
      pending: monthlyData[month].pending,
      total: monthlyData[month].total
    }));
  };

  const getPaymentChartData = () => {
    // Group payments by month
    const monthlyData: { [key: string]: { received: number; pending: number } } = {};

    // Get last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      months.push(date.toLocaleString('default', { month: 'short' }));
    }

    // Initialize all months with zero values
    months.forEach(month => {
      monthlyData[month] = { received: 0, pending: 0 };
    });

    projects.forEach(project => {
      const date = project.createdAt ? new Date(project.createdAt) : new Date();
      const monthKey = date.toLocaleString('default', { month: 'short' });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { received: 0, pending: 0 };
      }

      monthlyData[monthKey].received += project.amountPaid || 0;
      monthlyData[monthKey].pending += (project.finalAmount || 0) - (project.amountPaid || 0);
    });

    return months.map(month => ({
      month,
      received: monthlyData[month].received,
      pending: monthlyData[month].pending
    }));
  };

  const getActivitiesChartData = () => {
    // Group activities by day of week
    const dailyData: { [key: string]: { classes: number } } = {
      'Mon': { classes: 0 },
      'Tue': { classes: 0 },
      'Wed': { classes: 0 },
      'Thu': { classes: 0 },
      'Fri': { classes: 0 },
      'Sat': { classes: 0 },
      'Sun': { classes: 0 }
    };

    // Count classes by day of week
    classSchedules.forEach(classItem => {
      if (classItem.date) {
        const date = new Date(classItem.date);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        if (dailyData[day]) {
          dailyData[day].classes++;
        }
      }
    });

    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      day,
      classes: dailyData[day].classes
    }));
  };

  // Prepare table data - FIXED: Use default value for attendees since ClassSchedule doesn't have students property
  // In your DashboardClient.tsx, update the table data preparation section:

  // Prepare table data - FIXED: Convert id to number or use index
  const isAdmin = session?.user?.role === 'ADMIN';

  const projectsTableData = projects.slice(0, 5).map((project, index) => ({
    id: index + 1,
    name: project.name,
    status: project.status.charAt(0).toUpperCase() + project.status.slice(1),
    progress: project.status === 'completed' ? 100 : project.status === 'ongoing' ? 50 : 0,
    ...(isAdmin && { amount: project.finalAmount || 0 })
  }));

  const paymentTableData = isAdmin ? projects.slice(0, 5).map((project, index) => ({
    id: index + 1,
    project: project.name,
    amount: project.finalAmount || 0,
    status: project.amountPaid === project.finalAmount ? 'Paid' :
      project.amountPaid && project.amountPaid > 0 ? 'Partial' : 'Pending',
    date: project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'
  })) : [];

  const activitiesTableData = classSchedules.slice(0, 5).map((classItem, index) => ({
    id: index + 1,
    name: classItem.project,
    type: 'Class' as const,
    attendees: 0,
    date: classItem.date ? new Date(classItem.date).toLocaleDateString() : 'N/A'
  }));


  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <Header />

        {/* Loading overlay when fetching data */}
        {fetchingData && (
          <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center">
            <LoadingSpinner size="lg" color={activeTab === "projects" ? "blue" : "red"} />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6 lg:mb-8">
          <div className="flex space-x-1 rounded-lg bg-gray-200 p-1 max-w-md mx-auto lg:mx-0">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "projects"
                ? "bg-[#12498b] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-300"
                }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("classes")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "classes"
                ? "bg-[#b12222] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-300"
                }`}
            >
              Class Schedules
            </button>
          </div>
        </div>

        {/* Stats Cards with dynamic data */}
        <StatsCards
          totalProjects={totalProjects}
          completedProjects={completedProjects}
          totalPayment={totalPayment}
          totalValue={totalValue}
          activeClasses={totalClasses}
          activeTab={activeTab}
          // Pass dynamic chart and table data
          projectsChartData={getProjectsChartData()}
          paymentChartData={getPaymentChartData()}
          activitiesChartData={getActivitiesChartData()}
          projectsTableData={projectsTableData}
          paymentTableData={paymentTableData}
          activitiesTableData={activitiesTableData}
          allProjects={projects}
          allClasses={classSchedules}
        />

        {/* Content based on active tab */}
        {activeTab === "projects" && (
          <div className="space-y-6 lg:space-y-8">
            {/* Projects Filter Section - Using ONLY FiltersSection component */}
            <FiltersSection
              selectedTeam={selectedTeam}
              selectedStatus={selectedStatus}
              searchQuery={searchQuery}
              onTeamChange={setSelectedTeam}
              onStatusChange={setSelectedStatus}
              onSearchChange={setSearchQuery}
              onProjectAdded={handleProjectAdded}
            />

            {/* Projects List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="flex">
                  <ProjectCard
                    projects={project}
                    onDelete={handleProjectDeleted}
                    onUpdate={handleProjectUpdated}
                  />
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200 col-span-full">
                  {searchQuery ?
                    `No projects found matching "${searchQuery}". Try a different search term.` :
                    "No projects found. Create your first project!"
                  }
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === "classes" && (
          <div className="space-y-6 lg:space-y-8">
            {/* Class Schedules Filter Section */}
            <div className="w-full bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">

                {/* Search Bar */}
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b12222] h-5 w-5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search classes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-12 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-lg text-black placeholder-gray-400 focus:border-[#b12222] focus:ring-2 focus:ring-[#b12222]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Add Class Button - Admin Only */}
                {session?.user?.role === 'ADMIN' && (
                  <div className="flex gap-3 items-center">
                    <AddClassDialog onClassAdded={handleClassAdded} />
                  </div>
                )}
              </div>
            </div>

            {/* Class Schedules List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClassSchedules.map((classItem) => (
                <div key={classItem.id} className="flex">
                  <ClassScheduleCard
                    classItem={classItem}
                    onDelete={handleClassDeleted}
                    onUpdate={handleClassUpdated}
                  />
                </div>
              ))}
              {filteredClassSchedules.length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200 col-span-full">
                  {searchQuery ?
                    `No classes found matching "${searchQuery}".` :
                    "No class schedules found. Add your first class schedule!"
                  }
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Simplified Student Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <Header />

      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Project Status</h2>
          <p className="text-gray-600">Track your project&apos;s progress and implementation stages.</p>
        </div>

        {/* Project List for Student */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="flex">
              <ProjectCard
                projects={project}
                onDelete={handleProjectDeleted}
                onUpdate={handleProjectUpdated}
              />
            </div>
          ))}
          {projects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 col-span-full">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Projects Found</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                We couldn&apos;t find any projects linked to your email ({session.user?.email}). Please contact support if this is an error.
              </p>
            </div>
          )}
        </div>

        {/* Class Schedules for Student */}
        <div className="pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">My Class Schedules</h2>
            <p className="text-gray-600">View your upcoming project guidance sessions and workshops.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classSchedules.map((classItem) => (
              <div key={classItem.id} className="flex">
                <ClassScheduleCard
                  classItem={classItem}
                  onDelete={handleClassDeleted}
                  onUpdate={handleClassUpdated}
                />
              </div>
            ))}
            {classSchedules.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 col-span-full">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No Class Schedules Found</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  You don&apos;t have any scheduled classes yet. Contact your project handler for more information.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Help for Students */}
        <div className="bg-[#12498b]/5 border border-[#12498b]/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-[#12498b] text-lg">Need help with your project?</h4>
            <p className="text-gray-600">Our technical support team is available 24/7 for project guidance.</p>
          </div>
          <a
            href="tel:+919778754400"
            className="px-6 py-3 bg-[#12498b] text-white rounded-xl font-bold hover:bg-[#0d3566] transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );

}