// apps/web/app/api/email/send/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { EmailService } from '@/lib/email/email-service'
import clientPromise from '@/lib/database/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { campaign_id, test_mode = false } = body
    
    const client = await clientPromise
    const db = client.db('email-marketing')
    
    // Get campaign details
    const campaign = await db
      .collection('campaigns')
      .findOne({ _id: new ObjectId(campaign_id) })
    
    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campaign not found' },
        { status: 404 }
      )
    }
    
    // Get contacts based on campaign targeting
    const contacts = await db
      .collection('contacts')
      .find({
        user_id: campaign.user_id,
        'preferences.subscribed': true,
        // Add segment filtering logic here
      })
      .toArray()
    
    if (test_mode) {
      // Send test email to campaign creator only
      const user = await db
        .collection('users')
        .findOne({ _id: campaign.user_id })
      
      await EmailService.sendEmail({
        to: user.email,
        subject: `[TEST] ${campaign.name}`,
        html: `<h1>Test Email</h1><p>This is a test of your campaign: ${campaign.name}</p>`,
      })
      
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        test_mode: true
      })
    }
    
    // Send to all contacts (implement batching for large lists)
    let sent_count = 0
    const batch_size = 100
    
    for (let i = 0; i < contacts.length; i += batch_size) {
      const batch = contacts.slice(i, i + batch_size)
      
      const emailPromises = batch.map(async (contact) => {
        try {
          await EmailService.sendEmail({
            to: contact.email,
            subject: campaign.name,
            html: `<h1>Hello ${contact.profile.first_name}!</h1>
                   <p>This is your campaign: ${campaign.name}</p>
                   <!-- Add your email template here -->`,
          })
          sent_count++
        } catch (error) {
          console.error(`Failed to send to ${contact.email}:`, error)
        }
      })
      
      await Promise.allSettled(emailPromises)
    }
    
    // Update campaign metrics
    await db.collection('campaigns').updateOne(
      { _id: campaign._id },
      {
        $set: {
          status: 'sent',
          'metrics.sent': sent_count,
          updated_at: new Date()
        }
      }
    )
    
    return NextResponse.json({
      success: true,
      data: {
        campaign_id,
        total_sent: sent_count,
        total_contacts: contacts.length
      },
      message: 'Campaign sent successfully'
    })
  } catch (error) {
    console.error('Error sending campaign:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send campaign' },
      { status: 500 }
    )
  }
}
