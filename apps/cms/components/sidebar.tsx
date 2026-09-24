'use client'
import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { cn }          from '@thrinxs/ui'
import {
  LayoutDashboard, FolderOpen, Database, FileText,
  Image, FormInput, Search, Users, Settings, CreditCard, LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/overview',    label: 'Overview',     icon: LayoutDashboard },
  { href: '/projects',    label: 'Projects',     icon: FolderOpen      },
  { href: '/collections', label: 'Collections',  icon: Database        },
  { href: '/entries',     label: 'Entries',      icon: FileText        },
  { href: '/pages',       label: 'Pages',        icon: FileText        },
  { href: '/media',       label: 'Media',        icon: Image           },
  { href: '/forms',       label: 'Forms',        icon: FormInput       },
  { href: '/seo',         label: 'SEO',          icon: Search          },
  { href: '/team',        label: 'Team',         icon: Users           },
  { href: '/settings',    label: 'Settings',     icon: Settings        },
  { href: '/billing',     label: 'Billing',      icon: CreditCard      },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-brand-700">Thrinxs CMS</h1>
        <p className="text-xs text-gray-400 mt-0.5">Content Management</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-brand-50 text-brand-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )}>
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 w-full transition-colors">
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </aside>
  )
}
