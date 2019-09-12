const { ApolloServer, gql } = require('apollo-server-express')
const axios = require('axios')
const express = require('express')

const API = 'https://jsonplaceholder.typicode.com'

const app = express()

const sendPost = (params) =>
  axios.post(`${API}/posts`, params).then((response) => response.data)

const getTodos = () =>
  axios.get(`${API}/todos/1`).then((response) => response.data)

const getPosts = () =>
  axios.get(`${API}/posts`).then((response) => response.data)

const foods = [
  {
    name: 'Coconut',
    kind: 'fresh',
    id: 1
  },
  {
    name: 'Banana',
    kind: 'fresh',
    id: 2
  },
  {
    name: 'Sardine',
    kind: 'industrialized',
    id: 3
  }
]

const books = [
  {
    id: '1',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    id: '2',
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    id: ID
    title: String
    author: String
  }

  type Post {
    userId: Int
    id: ID
    title: String
    body: String
  }

  type TodoList {
    userId: Int
    id: Int
    title: String
    completed: Boolean
  }

  type Mutation {
    post(title: String!, body: String!, userId: ID!): Post
  }

  type Food {
    name: String
    kind: String
  }

  type Market {
    productsId: String
    food(kind: String): String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    posts(id: ID): [Post]
    todoList: TodoList
    books(id: ID): [Book]
    market: Market
  }
`

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    posts: async (_, { id }) => {
      const posts = await getPosts()

      if (!id) return posts

      return [posts.find((post) => post.id === Number(id))]
    },
    todoList: () => getTodos(),
    books: (_, { id }) => (id ? [books.find((book) => book.id === id)] : books),
    market: () =>
      foods.reduce(
        (acc, { id, ...rest }) => {
          acc.productsId.push(id)
          acc.foods.push(rest)

          return acc
        },
        { productsId: [], foods: [] }
      )
  },
  Market: {
    productsId: ({ productsId }) => productsId.join(', '),
    food: ({ foods }, { kind }) => {
      if (!kind) return foods.map((food) => food.name).join(', ')

      return foods
        .reduce((acc, curr) => {
          if (curr.kind !== kind) return acc

					acc.push(curr.name)

          return acc
        }, [])
        .join(', ')
    }
  },
  Mutation: {
    post: (_, params) => sendPost(params)
  }
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
