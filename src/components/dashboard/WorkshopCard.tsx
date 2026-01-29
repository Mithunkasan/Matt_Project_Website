import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workshop } from "@/types";
import { useState } from "react";

interface WorkshopCardProps {
  workshop: Workshop;
  onDelete: (workshopId: string) => void;
  onUpdate: (workshopId: string, updatedData: Partial<Workshop>) => void;
}

export function WorkshopCard({ workshop, onDelete, onUpdate }: WorkshopCardProps) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Workshop>>(workshop);
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    setEditing(true);
    setEditData(workshop);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/workshops/${workshop.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        // FIX: Pass editData instead of the full response object
        if (onUpdate && typeof onUpdate === 'function') {
          onUpdate(workshop.id, editData);
        } else {
          console.warn('onUpdate is not a function');
        }
        setEditing(false);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update workshop");
      }
    } catch (error) {
      console.error("Error updating workshop:", error);
      alert("Failed to update workshop");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditData(workshop);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this workshop?")) {
      setDeleting(true);
      try {
        const response = await fetch(`/api/workshops/${workshop.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          if (onDelete && typeof onDelete === 'function') {
            onDelete(workshop.id);
          }
        } else {
          alert("Failed to delete workshop");
        }
      } catch (error) {
        console.error("Error deleting workshop:", error);
        alert("Failed to delete workshop");
      } finally {
        setDeleting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleInputChange = (field: keyof Workshop, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNumberChange = (field: keyof Workshop, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    setEditData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case 'ongoing':
        return "bg-green-100 text-green-700 border border-green-300";
      case 'completed':
        return "bg-gray-100 text-gray-700 border border-gray-300";
      case 'cancelled':
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
  };

  return (
    <Card className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#15803d]">
      {/* Header Section with Accent Color */}
      <div className="bg-[#15803d] px-5 sm:px-6 py-4">
        {editing ? (
          <input
            type="text"
            value={editData.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full font-bold text-xl sm:text-2xl text-white bg-transparent border-b border-white/50 focus:border-white focus:outline-none px-1"
          />
        ) : (
          <h3 className="font-bold text-xl sm:text-2xl text-white break-words">
            {workshop.title}
          </h3>
        )}
      </div>

      <CardContent className="p-5 sm:p-6">
        {/* Description */}
        {workshop.description && (
          <div className="mb-5 pb-5 border-b border-gray-200">
            <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide mb-2 block">
              Description
            </span>
            {editing ? (
              <textarea
                value={editData.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full text-sm text-gray-800 font-medium border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#15803d] resize-vertical min-h-[80px]"
                rows={3}
              />
            ) : (
              <p className="text-sm text-gray-800 font-medium break-words">
                {workshop.description}
              </p>
            )}
          </div>
        )}

        {/* College, Department, Organizer Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 pb-5 border-b border-gray-200">
          {[
            { key: "college", label: "College" },
            { key: "department", label: "Department" },
            { key: "organizer", label: "Organizer" }
          ].map(({ key, label }) => (
            <div key={key} className="flex flex-col">
              <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide mb-1">
                {label}
              </span>
              {editing ? (
                <input
                  type="text"
                  value={editData[key as keyof Workshop] as string || ""}
                  onChange={(e) => handleInputChange(key as keyof Workshop, e.target.value)}
                  className="text-sm text-gray-800 font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#15803d]"
                />
              ) : (
                <p className="text-sm text-gray-800 font-medium break-words">
                  {workshop[key as keyof Workshop] as string}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Date, Duration, Attendees Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 pb-5 border-b border-gray-200">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide mb-1">
              Date
            </span>
            {editing ? (
              <input
                type="date"
                value={editData.date || ""}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="text-sm text-gray-800 font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#15803d]"
              />
            ) : (
              <p className="text-sm text-gray-800 font-medium">{formatDate(workshop.date)}</p>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide mb-1">
              Duration
            </span>
            {editing ? (
              <input
                type="text"
                value={editData.duration || ""}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="text-sm text-gray-800 font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#15803d]"
                placeholder="e.g., 2 hours"
              />
            ) : (
              <p className="text-sm text-gray-800 font-medium break-words">{workshop.duration}</p>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide mb-1">
              Attendees
            </span>
            {editing ? (
              <input
                type="number"
                value={editData.attendees || 0}
                onChange={(e) => handleNumberChange("attendees", e.target.value)}
                className="text-sm text-gray-800 font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#15803d]"
              />
            ) : (
              <p className="text-sm text-gray-800 font-medium">{workshop.attendees}</p>
            )}
          </div>
        </div>

        {/* Location, Team, Status Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 pb-5 border-b border-gray-200">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide mb-1">
              Location
            </span>
            {editing ? (
              <input
                type="text"
                value={editData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="text-sm text-gray-800 font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#15803d]"
              />
            ) : (
              <p className="text-sm text-gray-800 font-medium break-words">{workshop.location}</p>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide mb-1">
              Team
            </span>
            {editing ? (
              <input
                type="text"
                value={editData.team || ""}
                onChange={(e) => handleInputChange("team", e.target.value)}
                className="text-sm text-gray-800 font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#15803d]"
              />
            ) : (
              <p className="text-sm text-gray-800 font-medium break-words">{workshop.team}</p>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide mb-1">
              Status
            </span>
            {editing ? (
              <select
                value={editData.status || ""}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="text-sm text-gray-800 font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#15803d]"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : (
              <span
                className={`inline-block px-3 py-1 rounded-md text-xs font-bold w-fit ${getStatusColor(workshop.status)}`}
              >
                {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
              </span>
            )}
          </div>
        </div>

        {/* Fee Section */}
        {(workshop.fee && workshop.fee > 0) || editing ? (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide">
                Registration Fee
              </span>
              {editing ? (
                <input
                  type="number"
                  value={editData.fee || 0}
                  onChange={(e) => handleNumberChange("fee", e.target.value)}
                  className="w-32 text-sm text-gray-800 font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#15803d]"
                  placeholder="Fee amount"
                />
              ) : (
                <span className="text-lg font-bold text-[#15803d]">
                  ${workshop.fee?.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col sm:flex-row">
          {editing ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold transition-colors"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-2 border-gray-500 text-gray-600 hover:bg-gray-500 hover:text-white font-semibold transition-colors"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 border-2 border-[#12498b] text-[#12498b] hover:bg-[#12498b] hover:text-white font-semibold transition-colors"
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white font-semibold transition-colors"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}