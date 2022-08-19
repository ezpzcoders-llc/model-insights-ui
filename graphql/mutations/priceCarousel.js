import gql from 'graphql-tag'

export const ADD_PRICE_CAROUSEL_IMAGE = gql`
    mutation addPriceCarouselImages($urls: [String!]) {
        addPriceCarouselImages(urls: $urls) {
            id
            url
        }
    }
`

export const DELETE_PRICE_CAROUSEL_IMAGE = gql`
    mutation deletePriceCarouselImage($id: String!) {
        deletePriceCarouselImage(id: $id) {
            id
            url
        }
    }
`

export const SET_PRICE_DESCRIPTION = gql`
    mutation setPricingDescription($description: String!) {
        setPricingDescription(description: $description) {
            id
            description
        }
    }
`
