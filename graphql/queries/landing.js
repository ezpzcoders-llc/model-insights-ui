import gql from 'graphql-tag'

export const FETCH_LANDING_IMG = gql`
    query getLanding {
        getLanding {
            publicId
            description
        }
    }
`
