import gql from 'graphql-tag'

export const FETCH_TESTIMONIALS = gql`
    query getTestimonials {
        getTestimonials {
            id
            author
            profession
            quote
        }
    }
`
