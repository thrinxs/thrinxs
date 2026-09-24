import { Card, CardHeader, CardTitle, CardContent } from '@thrinxs/ui'

const stats = [
  { label: 'Projects',    value: '0', icon: '📁' },
  { label: 'Collections', value: '0', icon: '🗂️'  },
  { label: 'Entries',     value: '0', icon: '📝' },
  { label: 'Media Files', value: '0', icon: '🖼️'  },
]

export default function OverviewPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back to Thrinxs CMS</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Getting Started</CardTitle></CardHeader>
        <CardContent>
          <ol className="space-y-3 text-gray-600 list-decimal list-inside">
            <li>Create your first <strong>Project</strong></li>
            <li>Define a <strong>Collection</strong> (e.g. Blog Posts, Services)</li>
            <li>Add <strong>Entries</strong> to your collection</li>
            <li>Fetch your content via the <strong>API</strong> or SDK</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
