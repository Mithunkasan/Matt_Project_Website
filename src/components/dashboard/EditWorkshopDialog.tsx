// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Edit2 } from "lucide-react"
// import { EditWorkshopForm } from "@/components/forms/EditWorkshopForm"

// interface EditWorkshopDialogProps {
//   workshop: any
// }

// export function EditWorkshopDialog({ workshop }: EditWorkshopDialogProps) {
//   const [open, setOpen] = useState(false)

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="secondary" size="sm" className="flex-1 bg-white text-[#12498b] hover:bg-gray-100">
//           <Edit2 className="w-4 h-4 mr-1" />
//           Edit
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Edit Workshop</DialogTitle>
//           <DialogDescription>Update the workshop details below</DialogDescription>
//         </DialogHeader>
//         <EditWorkshopForm workshop={workshop} onSuccess={() => setOpen(false)} />
//       </DialogContent>
//     </Dialog>
//   )
// }






"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit2 } from "lucide-react"
import { EditWorkshopForm } from "@/components/forms/EditWorkshopForm"

interface Workshop {
  id: string
  title: string
  college: string
  department: string
  date: string
  duration: string
  location: string
  attendees: number
  fee?: number
  organizer: string
  status: string
}

interface EditWorkshopDialogProps {
  workshop: Workshop
}

export function EditWorkshopDialog({ workshop }: EditWorkshopDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="flex-1 bg-white text-[#12498b] hover:bg-gray-100">
          <Edit2 className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Workshop</DialogTitle>
          <DialogDescription>Update the workshop details below</DialogDescription>
        </DialogHeader>
        <EditWorkshopForm workshop={workshop} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}