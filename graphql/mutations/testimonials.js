import gql from 'graphql-tag'

export const CREATE_NEW_TESTIMONIAL = gql`
    mutation createTestimonial(
        $author: String!
        $quote: String!
        $profession: String!
    ) {
        createTestimonial(
            author: $author
            quote: $quote
            profession: $profession
        ) {
            id
            author
            profession
            quote
        }
    }
`
export const EDIT_TESTIMONIAL = gql`
    mutation editTestimonial(
        $id: String!
        $author: String!
        $quote: String!
        $profession: String!
    ) {
        editTestimonial(
            id: $id
            author: $author
            quote: $quote
            profession: $profession
        ) {
            id
            author
            profession
            quote
        }
    }
`

export const DELETE_TESTIMONIAL = gql`
    mutation deleteTestimonial($id: String!) {
        deleteTestimonial(id: $id) {
            id
            author
            profession
            quote
        }
    }
`
