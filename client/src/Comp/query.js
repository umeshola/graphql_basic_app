import { gql } from "@apollo/client";

export const ME_QUERY = gql `
query Me{
    me{
      userName
      email
      password
      todos{
        _id
        name
      }
    }
  }
`
export const TRUE_TODO = gql `
query TrueTodo{
    todotrue{
      _id
      name
      by
    }
  }
`
export const SIGNUP_USER = gql `
mutation signUp($data:UserInput!){
    signup(userNew:$data){
      token
    }
  }
`
export const CREATE_TODO = gql `
mutation createTodo($data:String!){
    newtodo:makeTodo(name:$data)
   }
`
export const UPDATE_TODO = gql `
mutation mark($data:String!){
    marked:markTrue(Id:$data)
  }
`

;