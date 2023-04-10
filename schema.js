const { gql } = require('apollo-server-express');

module.exports = gql`
type Employee {
  id: ID!
  first_name: String!
  last_name: String!
  email: String!
}

type User {
  id: ID!
  username: String!
  password: String!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type Query {
  employees: [Employee]
  employee(id: ID!): Employee
}

type Mutation {
  addEmployee(first_name: String!, last_name: String!, email: String!): Employee
  updateEmployee(id: ID!, first_name: String, last_name: String, email: String): Employee
  deleteEmployee(id: ID!): ID
  login(username: String!, password: String!): AuthData
  addUser(username: String!, password: String!): User
}
`;


