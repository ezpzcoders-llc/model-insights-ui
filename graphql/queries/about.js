import gql from 'graphql-tag'

export const FETCH_ABOUT_PAGE = gql`
    query getAboutPage {
        getAbout {
            description
            bulletPoints
        }
    }
`
