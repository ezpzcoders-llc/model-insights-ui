import gql from 'graphql-tag'

export const FETCH_CALENDLY_EVENTS = gql`
    query getEvents {
        getEvents {
            description
            name
            duration
            kind
        }
    }
`

export const FETCH_PRICING_DESCRIPTION = gql`
    query getPriceDescription {
        getPriceDescription {
            description
        }
    }
`
