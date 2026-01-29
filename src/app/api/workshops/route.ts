// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { prisma } from '@/lib/prisma'

// export async function GET(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)
    
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const workshops = await prisma.workshop.findMany({
//       orderBy: { date: 'desc' }
//     })
    
//     return NextResponse.json(workshops)
//   } catch (error) {
//     console.error('Failed to fetch workshops:', error)
//     return NextResponse.json(
//       { error: 'Failed to fetch workshops' },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)
    
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const data = await request.json()
    
//     // Validate required fields
//     const requiredFields = ['title', 'college', 'department', 'organizer', 'team', 'date', 'duration', 'location', 'attendees']
//     const missingFields = requiredFields.filter(field => !data[field])
    
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         { error: `Missing required fields: ${missingFields.join(', ')}` },
//         { status: 400 }
//       )
//     }

//     // Parse date
//     let workshopDate: Date;
//     try {
//       workshopDate = new Date(data.date);
//       if (isNaN(workshopDate.getTime())) {
//         throw new Error('Invalid date');
//       }
//     } catch (error) {
//       return NextResponse.json(
//         { error: 'Invalid date format' },
//         { status: 400 }
//       )
//     }

//     const workshop = await prisma.workshop.create({
//       data: {
//         title: data.title,
//         description: data.description || '',
//         college: data.college,
//         department: data.department,
//         organizer: data.organizer,
//         team: data.team,
//         date: workshopDate,
//         duration: data.duration,
//         location: data.location,
//         attendees: Number(data.attendees) || 0,
//         status: data.status || 'upcoming',
//         fee: data.fee ? Number(data.fee) : null
//       }
//     })
    
//     return NextResponse.json(workshop)
    
//   } catch (error: any) {
//     console.error('Failed to create workshop:', error)
    
//     return NextResponse.json(
//       { 
//         error: 'Failed to create workshop',
//         details: error.message,
//         code: error.code
//       },
//       { status: 500 }
//     )
//   }
// }








import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const workshops = await prisma.workshop.findMany({
      orderBy: { date: 'desc' }
    })
    
    return NextResponse.json(workshops)
  } catch (error) {
    console.error('Failed to fetch workshops:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'college', 'department', 'organizer', 'team', 'date', 'duration', 'location', 'attendees']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Parse date
    let workshopDate: Date;
    try {
      workshopDate = new Date(data.date);
      if (isNaN(workshopDate.getTime())) {
        throw new Error('Invalid date');
      }
    } catch {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      )
    }

    const workshop = await prisma.workshop.create({
      data: {
        title: data.title,
        description: data.description || '',
        college: data.college,
        department: data.department,
        organizer: data.organizer,
        team: data.team,
        date: workshopDate,
        duration: data.duration,
        location: data.location,
        attendees: Number(data.attendees) || 0,
        status: data.status || 'upcoming',
        fee: data.fee ? Number(data.fee) : null
      }
    })
    
    return NextResponse.json(workshop)
    
  } catch (error: unknown) {
    console.error('Failed to create workshop:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorCode = (error as { code?: string }).code;
    
    return NextResponse.json(
      { 
        error: 'Failed to create workshop',
        details: errorMessage,
        code: errorCode
      },
      { status: 500 }
    )
  }
}