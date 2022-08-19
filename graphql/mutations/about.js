import gql from 'graphql-tag'

export const EDIT_ABOUT_PAGE = gql`
    mutation editAboutPage($description: [String], $bulletPoints: [String]) {
        editAbout(description: $description, bulletPoints: $bulletPoints) {
            id
            description
            bulletPoints
        }
    }
`
