"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type BrowseClassSchedule = {
  id: string;
  day: string;
  time: string;
  faculty?: string;
  location?: string;
  department?: string;
  subject?: string;
  project?: string;
  room?: string;
};

interface BrowseClassScheduleCardProps {
  classItem: BrowseClassSchedule;
}

export default function BrowseClassScheduleCard({ classItem }: BrowseClassScheduleCardProps) {
  const title = classItem.subject || classItem.project || "Class";
  const locationText = classItem.location || classItem.room || "";

  return (
    <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#b12222] h-full flex flex-col">
      <div className="bg-[#b12222] px-5 sm:px-6 py-4">
        <h3 className="font-bold text-xl sm:text-2xl text-white break-words">
          {title}
        </h3>
      </div>

      <CardContent className="p-5 sm:p-6 flex-grow flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 pb-5 border-b border-gray-200">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#b12222] uppercase tracking-wide mb-1">
              Day
            </span>
            <p className="text-sm text-gray-800 font-medium break-words">
              {classItem.day}
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#b12222] uppercase tracking-wide mb-1">
              Time
            </span>
            <p className="text-sm text-gray-800 font-medium break-words">
              {classItem.time}
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#b12222] uppercase tracking-wide mb-1">
              {locationText ? "Location" : ""}
            </span>
            <p className="text-sm text-gray-800 font-medium break-words">
              {locationText}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-200">
          {classItem.department && (
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#b12222] uppercase tracking-wide mb-1">
                Department
              </span>
              <p className="text-sm text-gray-800 font-medium break-words">
                {classItem.department}
              </p>
            </div>
          )}
          {classItem.faculty && (
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#b12222] uppercase tracking-wide mb-1">
                Faculty
              </span>
              <p className="text-sm text-gray-800 font-medium break-words">
                {classItem.faculty}
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Link href={`/browse/classes/${classItem.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-2 border-[#b12222] text-[#b12222] hover:bg-[#b12222] hover:text-white font-semibold transition-colors"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
