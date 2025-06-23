import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    myname: String
    users: [User]
    posts: [Post]
    user(id: ID!): User
    post(id: ID!): Post
  }

  type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    phone: String!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
    author: String!
    createdAt: String!
  }

  type Mutation {
    register(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
      phone: String!
    ): User

    createPost(
      id: ID
      title: String!
      body: String!
      author: String
      createdAt: String
    ): Post

    updatePost(
      id: ID!
      title: String
      body: String
    ): Post

    deletePost(id: ID!): Post
  }
`;

