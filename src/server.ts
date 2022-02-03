import { PrismaClient } from '@prisma/client'
import  express  from 'express'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { IContext } from 'types'

const prisma = new PrismaClient()

const typeDefs = `
  type User {
    email: String!
    name: String
  }
  type Query {
    allUsers: [User!]!
  }
`

const resolvers = {
  Query: {
    users: () => prisma.user.findMany()
  },
  Mutation: {
    createUser: (_: any, params, ctx)=> ctx.prisma.user.create(params)
  }
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  context: <IContext> {
    prisma
  }
}))

app.listen(parseInt(process.env.API_PORT) || 5000, '0.0.0.0', () => {
  console.log('\x1b[36m%s\x1b[0m', 'SERVERINIT: 👍 GraphQL API ready! 👍')
  console.log('\x1b[37m%s\x1b[0m', 'SERVERINIT: 🚀 Subscriptions ready! 🚀')
})
