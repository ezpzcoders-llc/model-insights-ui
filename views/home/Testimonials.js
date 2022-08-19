/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Paper } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

import { CmsContext } from '../../context/cms'
import { FETCH_TESTIMONIALS } from '../../graphql/queries/testimonials'
import { FETCH_TESTIMONIAL_CAROUSEL } from '../../graphql/queries/testimonialCarousel'
import { ScrollContext, TESTIMONIALS } from '../../context/smooth-scroll'
import styles from './Home.module.scss'

const CarouselItem = ({ item }) => {
    return <img className={styles.carouselItem} src={item.url} alt="img" />
}

const Testimonials = () => {
    const {
        posts: { setTestimonials, testimonials, setCarousel, carousel }
    } = useContext(CmsContext)
    const { testimonials: scrollTestimonials, setActive } =
        useContext(ScrollContext)

    useQuery(FETCH_TESTIMONIALS, {
        onCompleted({ getTestimonials }) {
            setTestimonials(getTestimonials)
        },
        onError(error) {
            console.log(error)
        }
    })

    useQuery(FETCH_TESTIMONIAL_CAROUSEL, {
        onCompleted({ getTestimonialCarouselImages }) {
            setCarousel(getTestimonialCarouselImages)
        },
        onError(error) {
            console.log(error)
        }
    })

    return (
        <section
            id="testimonials"
            ref={scrollTestimonials.ref}
            onMouseEnter={() => setActive(TESTIMONIALS)}
            className={`${styles.Testimonials} leftPaddedItem`}>
            <Carousel
                className={styles.testimonialCarousel}
                autoPlay
                indicators={false}
                interval={4000}
                duration={1000}
                navButtonsAlwaysInvisible={true}>
                {carousel.map((item, index) => {
                    return <CarouselItem key={index} item={item} />
                })}
            </Carousel>
            <div className={styles.testimonialInfo}>
                <h2>
                    Testimonials<span className="accent">:</span>
                </h2>
                <div className={styles.testimonialsDisplay}>
                    {testimonials.map((item, index) => {
                        return (
                            <Paper
                                elevation={0}
                                key={index}
                                className={styles.testimonialBlock}>
                                <p key={item.description}>
                                    {'"'}
                                    {item.quote}
                                    {'"'}
                                </p>
                                <span>
                                    - {item.author}, {item.profession}
                                </span>
                            </Paper>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
