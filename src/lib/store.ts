// "use client";

// import { create } from 'zustand'
// import { Project, ClassSchedule, Workshop } from '@/types'

// interface AppState {
//   projects: Project[]
//   classSchedules: ClassSchedule[]
//   workshops: Workshop[]
//   setProjects: (projects: Project[]) => void
//   setClassSchedules: (classes: ClassSchedule[]) => void
//   addProject: (project: Project) => void
//   deleteProject: (id: string) => void
//   addClassSchedule: (classItem: ClassSchedule) => void
//   fetchProjects: () => Promise<void>
//   fetchClassSchedules: () => Promise<void>
//   addWorkshop: (workshop: Workshop) => void
//   deleteWorkshop: (workshopId: string) => void
//   updateWorkshop: (workshopId: string, updates: Partial<Workshop>) => void
//   fetchWorkshops: () => Promise<void>
// }

// export const useAppStore = create<AppState>((set) => ({
//   projects: [],
//   classSchedules: [],
//   workshops: [],
  
//   setProjects: (projects) => set({ projects }),
//   setClassSchedules: (classSchedules) => set({ classSchedules }),
  
//   addProject: (project) => 
//     set((state) => ({ projects: [project, ...state.projects] })),
  
//   addWorkshop: (workshop) => 
//     set((state) => ({ workshops: [workshop, ...state.workshops] })),

//   deleteProject: (id) =>
//     set((state) => ({ 
//       projects: state.projects.filter(project => project.id !== id) 
//     })),
  
//   addClassSchedule: (classItem) =>
//     set((state) => ({ 
//       classSchedules: [classItem, ...state.classSchedules] 
//     })),

//   deleteWorkshop: (workshopId) =>
//     set((state) => ({ 
//       workshops: state.workshops.filter(w => w.id !== workshopId) 
//     })),
  
//   updateWorkshop: (workshopId, updates) =>
//     set((state) => ({
//       workshops: state.workshops.map(w =>
//         w.id === workshopId ? { ...w, ...updates } : w
//       )
//     })),

//   fetchProjects: async () => {
//     try {
//       const response = await fetch('/api/projects')
//       if (response.ok) {
//         const projects = await response.json()
//         set({ projects })
//       }
//     } catch (error) {
//       console.error('Failed to fetch projects:', error)
//     }
//   },
  
//   fetchClassSchedules: async () => {
//     try {
//       const response = await fetch('/api/classes')
//       if (response.ok) {
//         const classSchedules = await response.json()
//         set({ classSchedules })
//       }
//     } catch (error) {
//       console.error('Failed to fetch class schedules:', error)
//     }
//   },

//   fetchWorkshops: async () => {
//     try {
//       const response = await fetch('/api/workshops');
//       if (response.ok) {
//         const workshops = await response.json();
//         set({ workshops });
//       }
//     } catch (error) {
//       console.error('Failed to fetch workshops:', error);
//     }
//   },
// }))







// @/lib/store.ts
"use client";

import { create } from 'zustand'
import { Project, ClassSchedule, Workshop } from '@/types'

interface AppState {
  projects: Project[]
  classSchedules: ClassSchedule[]
  workshops: Workshop[]
  setProjects: (projects: Project[]) => void
  setClassSchedules: (classes: ClassSchedule[]) => void
  addProject: (project: Project) => void
  deleteProject: (id: string) => void
  updateProject: (id: string, updatedData: Partial<Project>) => void // Add this
  addClassSchedule: (classItem: ClassSchedule) => void
  deleteClassSchedule: (id: string) => void // Add this
  updateClassSchedule: (id: string, updatedData: Partial<ClassSchedule>) => void // Add this
  fetchProjects: () => Promise<void>
  fetchClassSchedules: () => Promise<void>
  addWorkshop: (workshop: Workshop) => void
  deleteWorkshop: (workshopId: string) => void
  updateWorkshop: (workshopId: string, updates: Partial<Workshop>) => void
  fetchWorkshops: () => Promise<void>
}

export const useAppStore = create<AppState>((set) => ({
  projects: [],
  classSchedules: [],
  workshops: [],
  
  setProjects: (projects) => set({ projects }),
  setClassSchedules: (classSchedules) => set({ classSchedules }),
  
  addProject: (project) => 
    set((state) => ({ projects: [project, ...state.projects] })),
  
  deleteProject: (id) =>
    set((state) => ({ 
      projects: state.projects.filter(project => project.id !== id) 
    })),
  
  updateProject: (id, updatedData) =>
    set((state) => ({
      projects: state.projects.map(project =>
        project.id === id ? { ...project, ...updatedData } : project
      )
    })),
  
  addClassSchedule: (classItem) =>
    set((state) => ({ 
      classSchedules: [classItem, ...state.classSchedules] 
    })),
  
  deleteClassSchedule: (id) =>
    set((state) => ({ 
      classSchedules: state.classSchedules.filter(classItem => classItem.id !== id) 
    })),
  
  updateClassSchedule: (id, updatedData) =>
    set((state) => ({
      classSchedules: state.classSchedules.map(classItem =>
        classItem.id === id ? { ...classItem, ...updatedData } : classItem
      )
    })),
  
  addWorkshop: (workshop) => 
    set((state) => ({ workshops: [workshop, ...state.workshops] })),

  deleteWorkshop: (workshopId) =>
    set((state) => ({ 
      workshops: state.workshops.filter(w => w.id !== workshopId) 
    })),
  
  updateWorkshop: (workshopId, updates) =>
    set((state) => ({
      workshops: state.workshops.map(w =>
        w.id === workshopId ? { ...w, ...updates } : w
      )
    })),

  fetchProjects: async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const projects = await response.json()
        set({ projects })
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  },
  
  fetchClassSchedules: async () => {
    try {
      const response = await fetch('/api/classes')
      if (response.ok) {
        const classSchedules = await response.json()
        set({ classSchedules })
      }
    } catch (error) {
      console.error('Failed to fetch class schedules:', error)
    }
  },

  fetchWorkshops: async () => {
    try {
      const response = await fetch('/api/workshops');
      if (response.ok) {
        const workshops = await response.json();
        set({ workshops });
      }
    } catch (error) {
      console.error('Failed to fetch workshops:', error);
    }
  },
}))