import { db } from '../src/client'

async function main() {
  console.log('Seeding...')
  const admin = await db.user.upsert({
    where:  { email: 'admin@thrinxs.com.ng' },
    update: {},
    create: { email: 'admin@thrinxs.com.ng', name: 'Thrinxs Admin', platformRole: 'THRINXS_ADMIN', plan: 'ENTERPRISE' },
  })
  console.log('Admin created:', admin.email)
}

main().catch(console.error).finally(() => db.$disconnect())
