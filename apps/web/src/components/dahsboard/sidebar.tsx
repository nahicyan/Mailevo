// apps/web/components/dashboard/sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  BarChart3, 
  Mail, 
  Users, 
  Workflow, 
  TrendingUp, 
  Building, 
  Settings,
  Home
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { 
    name: 'Campaigns', 
    href: '/campaigns', 
    icon: Mail,
    submenu: [
      { name: 'All Campaigns', href: '/campaigns' },
      { name: 'Create Campaign', href: '/campaigns/create' },
      { name: 'Templates', href: '/templates' },
      { name: 'A/B Tests', href: '/campaigns/ab-tests' }
    ]
  },
  { 
    name: 'Contacts', 
    href: '/contacts', 
    icon: Users,
    submenu: [
      { name: 'All Contacts', href: '/contacts' },
      { name: 'Segments', href: '/contacts/segments' },
      { name: 'Import Contacts', href: '/contacts/import' },
      { name: 'Suppression List', href: '/contacts/suppression' }
    ]
  },
  { name: 'Automations', href: '/automations', icon: Workflow },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Landivo', href: '/landivo', icon: Building },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:block">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-gray-900">Email Platform</h1>
      </div>
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-md'
                )}
              >
                <item.icon
                  className={cn(
                    pathname === item.href
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-5 w-5'
                  )}
                />
                {item.name}
              </Link>
              
              {item.submenu && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        pathname === subItem.href
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-500 hover:text-gray-700',
                        'block px-3 py-1 text-sm rounded-md'
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}
