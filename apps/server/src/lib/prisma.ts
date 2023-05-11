import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

process.on('SIGTERM', () => {
  console.log('Disconnected from the database')
  void prisma.$disconnect()
})

export default prisma
