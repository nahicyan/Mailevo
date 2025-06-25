// apps/web/app/api/landivo/sync/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { LandivoIntegration } from '@/lib/landivo/integration'
import clientPromise from '@/lib/database/mongodb'

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db('email-marketing')
    
    // Initialize Landivo integration
    const landivo = new LandivoIntegration(
      process.env.LANDIVO_API_KEY!,
      process.env.LANDIVO_BASE_URL || 'http://localhost:5000'
    )
    
    // Fetch properties from Landivo
    const properties = await landivo.getProperties()
    const buyers = await landivo.getBuyers()
    
    // Store or update properties in email marketing database
    const propertyOps = properties.map(property => ({
      updateOne: {
        filter: { landivo_id: property.id },
        update: {
          $set: {
            ...property,
            landivo_id: property.id,
            synced_at: new Date()
          }
        },
        upsert: true
      }
    }))
    
    if (propertyOps.length > 0) {
      await db.collection('landivo_properties').bulkWrite(propertyOps)
    }
    
    // Sync buyers to contacts
    const contactOps = buyers.map(buyer => ({
      updateOne: {
        filter: { email: buyer.email },
        update: {
          $set: {
            email: buyer.email,
            profile: {
              first_name: buyer.name.split(' ')[0],
              last_name: buyer.name.split(' ').slice(1).join(' ')
            },
            landivo_data: {
              buyer_id: buyer.id,
              lead_score: buyer.lead_score,
              preferences: buyer.preferences
            },
            updated_at: new Date()
          },
          $setOnInsert: {
            preferences: {
              subscribed: true,
              categories: ['new_listings', 'price_drops']
            },
            tracking: {
              total_opens: 0,
              total_clicks: 0,
              engagement_score: 0
            },
            created_at: new Date()
          }
        },
        upsert: true
      }
    }))
    
    if (contactOps.length > 0) {
      await db.collection('contacts').bulkWrite(contactOps)
    }
    
    return NextResponse.json({
      success: true,
      data: {
        properties_synced: properties.length,
        buyers_synced: buyers.length,
        sync_time: new Date()
      },
      message: 'Landivo data synced successfully'
    })
  } catch (error) {
    console.error('Error syncing Landivo data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sync Landivo data' },
      { status: 500 }
    )
  }
}
