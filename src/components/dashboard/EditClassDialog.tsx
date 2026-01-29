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
// import { EditClassForm } from "../forms/EditClassForm"

// interface EditClassDialogProps {
//   classSchedule: any
// }

// export function EditClassDialog({ classSchedule }: EditClassDialogProps) {
//   const [open, setOpen] = useState(false)

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button variant="secondary" size="sm" className="flex-1 bg-white text-[#b12222] hover:bg-gray-100">
//           <Edit2 className="w-4 h-4 mr-1" />
//           Edit
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Edit Class Schedule</DialogTitle>
//           <DialogDescription>Update the class schedule details below</DialogDescription>
//         </DialogHeader>
//         <EditClassForm classSchedule={classSchedule} onSuccess={() => setOpen(false)} />
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
import { EditClassForm } from "../forms/EditClassForm"

interface ClassSchedule {
  id: string
  project: string
  department: string
  date: string
  time: string
  faculty: string
  location: string
  day: string
}

interface EditClassDialogProps {
  classSchedule: ClassSchedule
}

export function EditClassDialog({ classSchedule }: EditClassDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="flex-1 bg-white text-[#b12222] hover:bg-gray-100">
          <Edit2 className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Class Schedule</DialogTitle>
          <DialogDescription className="text-gray-700">Update the class schedule details below</DialogDescription>
        </DialogHeader>
        <EditClassForm classSchedule={classSchedule} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}