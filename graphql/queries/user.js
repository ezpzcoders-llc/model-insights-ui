import gql from 'graphql-tag'

export const QUERY_LOGGED_IN_USER = gql`
    query queryUserData($email: String!) {
        getUser(email: $email) {
            id
            token
            email
            createdAt
            firstName
            lastName
            subscription
            dob
        }
    }
`
