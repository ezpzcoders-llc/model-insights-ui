import { ApolloProvider } from '@apollo/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { client } from '../context/apollo.provider'
import { StylesProvider } from '@mui/styles'
import Script from 'next/script'
import Head from 'next/head'
import AuthContextWrapper from '../context/auth'
import ScrollContextWrapper from '../context/smooth-scroll'
import * as gtag from '../lib/gtag'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = url => {
            ga.pageview(url)
        }
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
                }}
            />
            <ApolloProvider client={client}>
                <AuthContextWrapper>
                    <ScrollContextWrapper>
                        <StylesProvider injectFirst={true}>
                            <Head>
                                <link
                                    rel="icon"
                                    type="image/png"
                                    sizes="16x16"
                                    href="/logos/icon.png"
                                />
                                <title>Model Insights</title>
                            </Head>
                            <Component {...pageProps} />
                        </StylesProvider>
                    </ScrollContextWrapper>
                </AuthContextWrapper>
            </ApolloProvider>
        </>
    )
}

export default MyApp
