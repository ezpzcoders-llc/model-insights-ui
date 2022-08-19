import gql from 'graphql-tag'

export const ADD_TESTIMONIAL_CAROUSEL_IMAGE = gql`
    mutation addTestimonialCarouselImages($urls: [String!]) {
        addTestimonialCarouselImages(urls: $urls) {
            id
            url
        }
    }
`

export const DELETE_TESTIMONIAL_CAROUSEL_IMAGE = gql`
    mutation deleteTestimonialCarouselImage($id: String!) {
        deleteTestimonialCarouselImage(id: $id) {
            id
            url
        }
    }
`
