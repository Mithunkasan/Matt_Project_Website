"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClassSchedule } from "@/types";
import { Calendar, Clock, User, MapPin, Building2, BookOpen } from "lucide-react";

interface AddClassFormProps {
  onClassAdded: (classItem: ClassSchedule) => void;
  onCancel: () => void;
}

export function AddClassForm({ onClassAdded, onCancel }: AddClassFormProps) {
  const [formData, setFormData] = useState({
    project: "",
    studentEmail: "",
    day: "",
    date: "",
    time: "",
    faculty: "",
    location: "",
    department: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newClass = await response.json();
        onClassAdded(newClass);
        // Reset form
        setFormData({
          project: "",
          studentEmail: "",
          day: "",
          date: "",
          time: "",
          faculty: "",
          location: "",
          department: ""
        });
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create class schedule');
      }
    } catch (error) {
      console.error('Error creating class schedule:', error);
      alert('Failed to create class schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
      <div className="bg-gradient-to-r from-[#b12222]/5 to-transparent p-4 rounded-lg border-l-4 border-[#b12222] mb-6">
        <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#b12222]" />
          Create Class Schedule
        </h3>
        <p className="text-sm text-gray-600">Add a new class schedule with all necessary details</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project" className="text-sm font-semibold text-black">
              Project <span className="text-red-500">*</span>
            </Label>
            <input
              type="text"
              id="project"
              placeholder="Project title"
              className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-black focus:border-[#b12222] focus:ring-2 focus:ring-[#b12222]/20 outline-none transition-all"
              value={formData.project}
              onChange={(e) => handleInputChange("project", e.target.value)}
              required
            />
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="day" className="text-sm font-semibold text-black flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Day <span className="text-red-500">*</span>
            </Label>
            <select
              id="day"
              className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-black focus:border-[#b12222] focus:ring-2 focus:ring-[#b12222]/20 outline-none transition-all cursor-pointer"
              value={formData.day}
              onChange={(e) => handleInputChange("day", e.target.value)}
              required
            >
              <option value="">Select day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-semibold text-black flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="date"
              type="date"
              className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="studentEmail" className="text-sm font-semibold text-black flex items-center gap-2">
              <User className="w-4 h-4" />
              Student Email (for tracking)
            </Label>
            <Input
              id="studentEmail"
              type="email"
              placeholder="student@example.com"
              className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
              value={formData.studentEmail}
              onChange={(e) => handleInputChange("studentEmail", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-semibold text-black flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time <span className="text-red-500">*</span>
            </Label>
            <Input
              id="time"
              type="text"
              placeholder="e.g., 09:00-10:30"
              className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              required
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="faculty" className="text-sm font-semibold text-black flex items-center gap-2">
              <User className="w-4 h-4" />
              Faculty <span className="text-red-500">*</span>
            </Label>
            <Input
              id="faculty"
              type="text"
              placeholder="Enter faculty name"
              className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
              value={formData.faculty}
              onChange={(e) => handleInputChange("faculty", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-semibold text-black flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="Enter location"
              className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-semibold text-black flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Department <span className="text-red-500">*</span>
            </Label>
            <Input
              id="department"
              type="text"
              placeholder="Enter department"
              className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-[#b12222] hover:bg-[#8a1a1a] text-white "
        >
          {loading ? "Creating..." : "Create Schedule"}
        </Button>
      </div>
    </form>
  );
}
