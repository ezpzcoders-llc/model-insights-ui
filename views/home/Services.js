/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Paper } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { WatchLater, Person, People, AddLocation } from '@mui/icons-material'

import BookNowButton from '/components/BookNowButton'
import {
    FETCH_CALENDLY_EVENTS,
    FETCH_PRICING_DESCRIPTION
} from '../../graphql/queries/services'
import { FETCH_PRICE_CAROUSEL_IMAGES } from '../../graphql/queries/priceCarousel'
import { CmsContext } from '../../context/cms'
import { ScrollContext, PRICING } from '../../context/smooth-scroll'
import styles from './Home.module.scss'

const CarouselItem = ({ item }) => {
    return <img className={styles.carouselItem} src={item.url} alt="img" />
}

const Services = () => {
    const { pricing } = useContext(CmsContext)
    const { pricing: scrollPricing, setActive } = useContext(ScrollContext)
    const {
        setServices,
        services,
        setCarousel,
        carousel,
        description,
        setDescription
    } = pricing

    useQuery(FETCH_PRICING_DESCRIPTION, {
        onCompleted({ getPriceDescription }) {
            setDescription(getPriceDescription[0]?.description)
        },
        onError(error) {
            console.log(error)
        }
    })

    useQuery(FETCH_CALENDLY_EVENTS, {
        onCompleted({ getEvents }) {
            setServices(getEvents)
        },
        onError(error) {
            console.log(error)
        }
    })

    useQuery(FETCH_PRICE_CAROUSEL_IMAGES, {
        onCompleted({ getPriceCarouselImages: data }) {
            setCarousel(data)
        },
        onError(error) {
            console.log(error)
        }
    })

    return (
        <section
            id="pricing"
            ref={scrollPricing.ref}
            onMouseEnter={() => setActive(PRICING)}
            className={`${styles.Pricing} leftPaddedItem`}>
            <div className={styles.pricingInfo}>
                <h2>
                    Packages<span className="accent">:</span>
                </h2>
                <p className={styles.explanation}>{description}</p>
                <div className={styles.prices}>
                    {services.map((service, index) => {
                        return (
                            <Paper
                                elevation={0}
                                key={index}
                                className={styles.priceBlock}>
                                <h3 key={service.name}>{service.name}</h3>
                                <div className={styles.details}>
                                    <p key={service.duration}>
                                        <WatchLater />
                                        {service.duration}
                                    </p>
                                    <p key={service.kind}>
                                        {service.kind === 'solo' ? (
                                            <Person />
                                        ) : (
                                            <People />
                                        )}{' '}
                                        {service.kind}
                                    </p>
                                    <p key={`zoom${index}`}>
                                        <AddLocation /> Zoom
                                    </p>
                                </div>
                            </Paper>
                        )
                    })}
                </div>
                <div className={styles.bookNow}>
                    <BookNowButton />
                </div>
            </div>
            <Carousel
                className={styles.pricingCarousel}
                autoPlay
                indicators={false}
                interval={3500}
                duration={1000}
                navButtonsAlwaysInvisible={true}>
                {carousel.map((item, index) => {
                    return <CarouselItem key={index} item={item} />
                })}
            </Carousel>
        </section>
    )
}

export default Services
