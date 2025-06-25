// apps/web/app/api/campaigns/route.ts
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/database/mongodb'
import { Campaign } from '@/lib/database/models'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('email-marketing')
    
    // Get user_id from session/auth (simplified for demo)
    const user_id = new ObjectId('64f123456789abcdef123456') // Replace with actual auth
    
    const campaigns = await db
      .collection('campaigns')
      .find({ user_id })
      .sort({ created_at: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: campaigns,
      count: campaigns.length
    })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch campaigns' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db('email-marketing')
    
    // Get user_id from session/auth (simplified for demo)
    const user_id = new ObjectId('64f123456789abcdef123456') // Replace with actual auth
    
    const campaign: Campaign = {
      user_id,
      name: body.name,
      type: body.type || 'broadcast',
      status: 'draft',
      targeting: {
        segments: body.segments || [],
        total_recipients: 0
      },
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0
      },
      created_at: new Date(),
      updated_at: new Date()
    }

    const result = await db.collection('campaigns').insertOne(campaign)
    
    return NextResponse.json({
      success: true,
      data: { ...campaign, _id: result.insertedId },
      message: 'Campaign created successfully'
    })
  } catch (error) {
    console.error('Error creating campaign:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create campaign' },
      { status: 500 }
    )
  }
}
