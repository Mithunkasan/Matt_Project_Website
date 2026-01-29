import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Calendar, Briefcase } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Manage your college projects, classes, and workshops in one place
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Projects Card */}
        <Link href="/dashboard/projects">
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-t-4 border-[#12498b]">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#12498b] bg-opacity-10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#12498b]" />
                </div>
                <div>
                  <CardTitle className="text-xl">Projects</CardTitle>
                  <CardDescription>Manage your projects</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Track project details, payments, and completion status
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Classes Card */}
        <Link href="/dashboard/classes">
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-t-4 border-[#b12222]">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#b12222] bg-opacity-10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#b12222]" />
                </div>
                <div>
                  <CardTitle className="text-xl">Class Schedules</CardTitle>
                  <CardDescription>View your classes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Organize class timings and faculty information
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Workshops Card */}
        <Link href="/dashboard/workshops">
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-t-4 border-[#cb773b]">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#cb773b] bg-opacity-10 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#cb773b]" />
                </div>
                <div>
                  <CardTitle className="text-xl">Workshops</CardTitle>
                  <CardDescription>Manage workshops</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Track workshops, seminars, and special events
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}