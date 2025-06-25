// apps/web/lib/email/email-service.ts
import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

// SMTP transporter for backup/custom sending
const smtpTransporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}

export class EmailService {
  static async sendEmail(options: EmailOptions, useSMTP = false) {
    try {
      if (useSMTP || !process.env.SENDGRID_API_KEY) {
        // Use SMTP as fallback
        return await this.sendViaSMTP(options)
      } else {
        // Use SendGrid as primary
        return await this.sendViaSendGrid(options)
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      throw error
    }
  }

  private static async sendViaSendGrid(options: EmailOptions) {
    const msg = {
      to: options.to,
      from: options.from || process.env.FROM_EMAIL || 'noreply@yourdomain.com',
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    }

    const result = await sgMail.send(msg)
    return result
  }

  private static async sendViaSMTP(options: EmailOptions) {
    const mailOptions = {
      from: options.from || process.env.FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    }

    const result = await smtpTransporter.sendMail(mailOptions)
    return result
  }
}