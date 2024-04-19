import { gql } from "apollo-server"

const typeDefs = gql `
 type Query{
    me:User
    todotrue:[Todo]
 }
 type User{
    _id:ID!
    userName:String!
    email:String!
    password:String!
    todos:[Todo]
 }
 type Todo{
    _id:ID!
    name:String!
    done:Boolean!
    by:ID!
 }
 type Mutation{
    signup(userNew:UserInput!):Token
    makeTodo(name:String!):String
    markTrue(Id:String!):String
    deleteTodo(Id:String!):String
 }
type Token{
    token:String!
}
input UserInput{
   userName:String!
   email:String!
   password:String!
}

`
export default typeDefs