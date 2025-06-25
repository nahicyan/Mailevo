// README.md - Quick Start Guide
# Email Marketing Platform - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- SendGrid account (optional, SMTP works too)
- Your existing Landivo repository

### 1. Initial Setup
```bash
# Run the setup script
chmod +x setup.sh
./setup.sh

# Navigate to the web app
cd apps/web

# Copy environment file
cp .env.example .env.local
```

### 2. Environment Configuration
Edit `.env.local` with your values:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/email-marketing

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Email Services (choose one or both)
SENDGRID_API_KEY=SG.your-sendgrid-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Landivo Integration
LANDIVO_API_KEY=your-landivo-api-key
LANDIVO_BASE_URL=http://localhost:5000
LANDIVO_WEBHOOK_SECRET=your-webhook-secret

# App Settings
FROM_EMAIL=noreply@yourdomain.com
NODE_ENV=development
```

### 3. Database Setup
```bash
# Start MongoDB (if local)
mongod

# The app will automatically create collections on first run
```

### 4. Start Development
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to see your email marketing platform!

### 5. Landivo Integration Setup

In your existing Landivo repository, add webhook endpoints to notify the email platform:

```javascript
// Add to your Landivo app
const WEBHOOK_URL = 'http://localhost:3000/api/landivo/webhooks'

// When a new property is added
async function notifyEmailPlatform(property) {
  await fetch(`${WEBHOOK_URL}/property-added`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ property, event: 'property_added' })
  })
}
```

### 6. Next Steps
1. **Create your first campaign**: Visit `/campaigns/create`
2. **Import contacts**: Visit `/contacts/import` 
3. **Set up Landivo sync**: Visit `/landivo` and click "Sync Now"
4. **Configure email templates**: Visit `/templates`
5. **Monitor analytics**: Visit `/analytics`