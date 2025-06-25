
// apps/web/app/(dashboard)/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Users, TrendingUp, Eye, MousePointer, Send, Building } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      name: 'Total Campaigns',
      value: '12',
      change: '+2 this week',
      icon: Mail,
      color: 'text-blue-600'
    },
    {
      name: 'Total Contacts',
      value: '2,847',
      change: '+127 this week',
      icon: Users,
      color: 'text-green-600'
    },
    {
      name: 'Open Rate',
      value: '24.5%',
      change: '+2.1% vs last month',
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      name: 'Click Rate',
      value: '4.2%',
      change: '+0.3% vs last month',
      icon: MousePointer,
      color: 'text-orange-600'
    },
  ]

  const recentCampaigns = [
    {
      name: 'New Manhattan Listings',
      status: 'Sent',
      sent: '2,450',
      opens: '735',
      clicks: '147',
      date: '2 hours ago'
    },
    {
      name: 'Price Drop Alert - Brooklyn',
      status: 'Sending',
      sent: '1,200',
      opens: '0',
      clicks: '0',
      date: 'Sending now'
    },
    {
      name: 'Weekly Market Update',
      status: 'Scheduled',
      sent: '0',
      opens: '0',
      clicks: '0',
      date: 'Tomorrow 9 AM'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your email campaigns.</p>
        </div>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentCampaigns.map((campaign, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'Sending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.sent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.opens}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.clicks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Landivo Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Landivo Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Connected to your Landivo repository for automated property marketing
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last sync: 15 minutes ago • 23 properties • 156 qualified buyers
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                View Properties
              </Button>
              <Button variant="outline" size="sm">
                Sync Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}