import gql from 'graphql-tag'

export const FETCH_PRICE_CAROUSEL_IMAGES = gql`
    query getPriceCarouselImages {
        getPriceCarouselImages {
            id
            url
        }
    }
`
