import { useState, useEffect } from 'react'
import { Workshop } from '../types'

export function useWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Calculate workshop stats
  const totalWorkshops = workshops.length
  const upcomingWorkshops = workshops.filter(w => w.status.toLowerCase().includes('upcoming')).length
  const ongoingWorkshops = workshops.filter(w => w.status.toLowerCase().includes('ongoing')).length
  const completedWorkshops = workshops.filter(w => w.status.toLowerCase().includes('completed')).length

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true)
        // Replace with your actual API call
        const res = await fetch('/api/public/workshops')
        if (!res.ok) throw new Error('Failed to fetch workshops')
        const data = await res.json()
        setWorkshops(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  return {
    workshops,
    loading,
    error,
    stats: {
      total: totalWorkshops,
      upcoming: upcomingWorkshops,
      ongoing: ongoingWorkshops,
      completed: completedWorkshops
    }
  }
}