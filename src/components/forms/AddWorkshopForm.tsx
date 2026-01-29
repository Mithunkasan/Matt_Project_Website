"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Workshop } from "@/types";

interface AddWorkshopFormProps {
  onWorkshopAdded: (workshop: Workshop) => void;
  onCancel: () => void;
}

export function AddWorkshopForm({ onWorkshopAdded, onCancel }: AddWorkshopFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    college: "",
    department: "",
    organizer: "",
    team: "",
    date: "",
    duration: "",
    location: "",
    attendees: 0,
    status: "upcoming" as "upcoming" | "ongoing" | "completed" | "cancelled",
    fee: 0
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.date) {
      alert('Please select a workshop date');
      return;
    }

    if (formData.attendees < 0) {
      alert('Attendees cannot be negative');
      return;
    }

    if (formData.fee < 0) {
      alert('Fee cannot be negative');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/workshops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        onWorkshopAdded(responseData);
        // Reset form
        setFormData({
          title: "",
          description: "",
          college: "",
          department: "",
          organizer: "",
          team: "",
          date: "",
          duration: "",
          location: "",
          attendees: 0,
          status: "upcoming",
          fee: 0
        });
      } else {
        alert(responseData.error || 'Failed to create workshop');
      }
    } catch (error) {
      console.error('Error creating workshop:', error);
      alert('Failed to create workshop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Workshop Title *</label>
        <input
          type="text"
          placeholder="Enter workshop title"
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
        <textarea
          placeholder="Enter workshop description"
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-400 min-h-[80px]"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">College Name *</label>
          <input
            type="text"
            placeholder="Enter college name"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            value={formData.college}
            onChange={(e) => handleInputChange("college", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Department *</label>
          <input
            type="text"
            placeholder="Enter department name"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Organizer *</label>
          <input
            type="text"
            placeholder="Enter organizer name"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            value={formData.organizer}
            onChange={(e) => handleInputChange("organizer", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">MATT Team *</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            value={formData.team}
            onChange={(e) => handleInputChange("team", e.target.value)}
            required
          >
            <option value="">Select team</option>
            <option value="HR">HR</option>
            <option value="AI">AI</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="JClicks">JClicks</option>
            <option value="CAD Point">CAD Point</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Workshop Date *</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            min={today}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Duration *</label>
          <input
            type="text"
            placeholder="e.g., 2 hours, 1 day"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Location *</label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Expected Attendees *</label>
          <input
            type="number"
            value={formData.attendees}
            onChange={(e) => handleInputChange("attendees", parseInt(e.target.value) || 0)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Registration Fee ($)</label>
          <input
            type="number"
            value={formData.fee}
            onChange={(e) => handleInputChange("fee", parseFloat(e.target.value) || 0)}
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg text-gray-400"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Workshop"}
        </Button>
      </div>
    </form>
  );
}