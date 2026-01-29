// import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { prisma } from '@/lib/prisma'

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const session = await getServerSession(authOptions)
    
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { id } = await params
    
//     if (!id || id.trim() === '') {
//       return NextResponse.json(
//         { error: 'Invalid workshop ID' },
//         { status: 400 }
//       )
//     }

//     await prisma.workshop.delete({
//       where: { id }
//     })
    
//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error('Failed to delete workshop:', error)
    
//     if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
//       return NextResponse.json(
//         { error: 'Workshop not found' },
//         { status: 404 }
//       )
//     }
    
//     return NextResponse.json(
//       { error: 'Failed to delete workshop' },
//       { status: 500 }
//     )
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const session = await getServerSession(authOptions)
    
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const { id } = await params
//     const body = await request.json()

//     if (!id || id.trim() === '') {
//       return NextResponse.json(
//         { error: 'Invalid workshop ID' },
//         { status: 400 }
//       )
//     }

//     const updatedWorkshop = await prisma.workshop.update({
//       where: { id },
//       data: body,
//     });
    
//     return NextResponse.json(updatedWorkshop)
//   } catch (error) {
//     console.error('Failed to update workshop:', error)
//     return NextResponse.json(
//       { error: 'Failed to update workshop' },
//       { status: 500 }
//     )
//   }
// }








import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    if (!id || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid workshop ID' },
        { status: 400 }
      )
    }

    const workshop = await prisma.workshop.findUnique({
      where: { id }
    })

    if (!workshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(workshop)
  } catch (error) {
    console.error('Failed to fetch workshop:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workshop' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    if (!id || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid workshop ID' },
        { status: 400 }
      )
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'No data provided for update' },
        { status: 400 }
      )
    }

    const updatedWorkshop = await prisma.workshop.update({
      where: { id },
      data: body,
    })
    
    return NextResponse.json(updatedWorkshop)
  } catch (error) {
    console.error('Failed to update workshop:', error)
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update workshop' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    
    if (!id || id.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid workshop ID' },
        { status: 400 }
      )
    }

    await prisma.workshop.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete workshop:', error)
    
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to delete workshop' },
      { status: 500 }
    )
  }
}