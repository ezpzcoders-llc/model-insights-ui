import { setContext } from '@apollo/client/link/context'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { CONFIG } from '../utils/constants'

const uri =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:5001'
        : 'https://model-insights-server.herokuapp.com/' // update to current projects production endpoint
const httpLink = new HttpLink({ uri })

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(CONFIG.JWT)
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})
