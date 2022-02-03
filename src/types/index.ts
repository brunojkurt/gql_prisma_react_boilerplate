import { PrismaClient } from '@prisma/client'

// Schemas
export * from 'schemas/user/types'

// Context
export interface IContext {
  prisma: PrismaClient
}
