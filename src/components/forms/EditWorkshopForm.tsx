"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Workshop {
  id: string
  title?: string
  college?: string
  department?: string
  description?: string
  date?: string
  duration?: string
  location?: string
  attendees?: number
  fee?: number
  organizer?: string
  status?: string
}

interface EditWorkshopFormProps {
  workshop: Workshop
  onSuccess: () => void
}

export function EditWorkshopForm({ workshop, onSuccess }: EditWorkshopFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: workshop.title || "",
    college: workshop.college || "",
    department: workshop.department || "",
    description: workshop.description || "",
    date: workshop.date?.split("T")[0] || "",
    duration: workshop.duration || "",
    location: workshop.location || "",
    attendees: workshop.attendees || 0,
    fee: workshop.fee || 0,
    organizer: workshop.organizer || "",
    status: workshop.status || "upcoming",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "attendees" || name === "fee" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/workshops/${workshop.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Workshop updated successfully")
        onSuccess()
      } else {
        alert("Failed to update workshop")
      }
    } catch {
      alert("An error occurred while updating the workshop")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input name="title" placeholder="Workshop Title" value={formData.title} onChange={handleChange} required />
        <Input name="college" placeholder="College" value={formData.college} onChange={handleChange} required />
        <Input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <Input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <Input
          name="duration"
          placeholder="Duration (e.g., 2 hours)"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <Input
          name="attendees"
          type="number"
          placeholder="Number of Attendees"
          value={formData.attendees}
          onChange={handleChange}
          required
        />
        <Input name="fee" type="number" placeholder="Fee" value={formData.fee} onChange={handleChange} />
        <Input name="organizer" placeholder="Organizer" value={formData.organizer} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange} className="px-3 py-2 border rounded-md">
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="col-span-2 px-3 py-2 border rounded-md"
          rows={3}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update Workshop"}
      </Button>
    </form>
  )
}