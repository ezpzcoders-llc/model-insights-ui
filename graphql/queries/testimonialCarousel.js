import gql from 'graphql-tag'

export const FETCH_TESTIMONIAL_CAROUSEL = gql`
    query getTestimonialCarouselImages {
        getTestimonialCarouselImages {
            id
            url
        }
    }
`
