import gql from 'graphql-tag'

export const EDIT_LANDING_IMG = gql`
    mutation editLandingImage($publicId: String!) {
        editLandingImage(publicId: $publicId) {
            id
            publicId
        }
    }
`

export const EDIT_LANDING_DESCRIPTION = gql`
    mutation editLandingDescription($description: String!) {
        editLandingDescription(description: $description) {
            id
            description
        }
    }
`
