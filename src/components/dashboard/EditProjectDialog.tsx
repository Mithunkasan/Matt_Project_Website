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
// import { EditProjectForm } from "@/components/forms/EditProjectForm"

// interface EditProjectDialogProps {
//   project: any
// }

// export function EditProjectDialog({ project }: EditProjectDialogProps) {
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
//           <DialogTitle>Edit Project</DialogTitle>
//           <DialogDescription>Update the project details below</DialogDescription>
//         </DialogHeader>
//         <EditProjectForm project={project} onSuccess={() => setOpen(false)} />
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
import { EditProjectForm } from "@/components/forms/EditProjectForm"

interface Project {
  id: string
  name: string
  college: string
  department: string
  team: string
  date: string
  amountPaid: number
  finalAmount: number
  paymentProgress: number
  status: string
}

interface EditProjectDialogProps {
  project: Project
}

export function EditProjectDialog({ project }: EditProjectDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="flex-1 bg-white text-[#12498b] hover:bg-gray-100">
          <Edit2 className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Project</DialogTitle>
          <DialogDescription className="text-gray-700">Update the project details below</DialogDescription>
        </DialogHeader>
        <EditProjectForm project={project} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}