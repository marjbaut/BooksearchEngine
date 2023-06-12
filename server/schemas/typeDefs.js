const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
  }
type Query{
    user(userId:ID):User
}
type Auth {
  token: ID!
  user: User
}
type Mutation{
  createUser(username:String!, email:String!, password:String!):User
  login(email:String!, password:String!): Auth
}
`;
// addBook(title:String!, description: String!):Book
module.exports = typeDefs;