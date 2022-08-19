import gql from 'graphql-tag'

export const ADD_NEWSLETTER_PARTICIPANT = gql`
    mutation addNewEmailToNewsLetter($email: String!) {
        addNewEmailToNewsLetter(email: $email) {
            id
        }
    }
`

export const UNSUBSCRIBE_USER = gql`
    mutation unsubscribeUser($email: String!) {
        unsubscribeUser(email: $email) {
            id
        }
    }
`

export const SEND_NEWSLETTER = gql`
    mutation sendNewsLetter($emailBody: [String!], $subjectLine: String!) {
        sendNewsLetter(emailBody: $emailBody, subjectLine: $subjectLine) {
            id
        }
    }
`
