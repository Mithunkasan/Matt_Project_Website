"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, User, MapPin, Building2, BookOpen } from "lucide-react"

interface ClassSchedule {
  id: string
  project?: string
  department?: string
  date?: string
  time?: string
  faculty?: string
  location?: string
  day?: string
}

interface EditClassFormProps {
  classSchedule: ClassSchedule
  onSuccess: () => void
}

export function EditClassForm({ classSchedule, onSuccess }: EditClassFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    project: classSchedule.project || "",
    department: classSchedule.department || "",
    date: classSchedule.date?.split("T")[0] || "",
    time: classSchedule.time || "",
    faculty: classSchedule.faculty || "",
    location: classSchedule.location || "",
    day: classSchedule.day || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/classes/${classSchedule.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Class schedule updated successfully")
        onSuccess()
      } else {
        alert("Failed to update class schedule")
      }
    } catch {
      alert("An error occurred while updating the class schedule")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6">
      <div className="bg-gradient-to-r from-[#b12222]/5 to-transparent p-4 rounded-lg border-l-4 border-[#b12222] mb-6">
        <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#b12222]" />
          Edit Class Schedule
        </h3>
        <p className="text-sm text-gray-600">Update class schedule information</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="project" className="text-sm font-semibold text-black">
            Project Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="project"
            name="project"
            placeholder="Project Name"
            value={formData.project}
            onChange={handleChange}
            className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
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
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-semibold text-black flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date <span className="text-red-500">*</span>
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-semibold text-black flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time <span className="text-red-500">*</span>
          </Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="faculty" className="text-sm font-semibold text-black flex items-center gap-2">
            <User className="w-4 h-4" />
            Faculty Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="faculty"
            name="faculty"
            placeholder="Faculty Name"
            value={formData.faculty}
            onChange={handleChange}
            className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-semibold text-black flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="h-11 border-gray-300 focus:border-[#b12222] focus:ring-[#b12222]/20 transition-all text-black"
            required
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="day" className="text-sm font-semibold text-black flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Day <span className="text-red-500">*</span>
          </Label>
          <select
            id="day"
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-black focus:border-[#b12222] focus:ring-2 focus:ring-[#b12222]/20 outline-none transition-all cursor-pointer"
            required
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-gray-200">
        <Button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-[#b12222] hover:bg-[#8a1a1a]"
        >
          {loading ? "Updating..." : "Update Class Schedule"}
        </Button>
      </div>
    </form>
  )
}
