/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { KeyboardArrowDown } from '@mui/icons-material'

import { FETCH_LANDING_IMG } from '../../graphql/queries/landing'
import { CmsContext } from '../../context/cms'
import { ScrollContext, LANDING } from '../../context/smooth-scroll'
import styles from './Home.module.scss'
import BookNowButton from '../../components/BookNowButton'

const Landing = () => {
    const {
        landing: { setLanding, data }
    } = useContext(CmsContext)
    const {
        landing: scrollLanding,
        setActive,
        about
    } = useContext(ScrollContext)

    useQuery(FETCH_LANDING_IMG, {
        onCompleted(data) {
            setLanding({
                image: `https://res.cloudinary.com/parfuso-llc/${data.getLanding[0]?.publicId}`,
                description: data.getLanding[0]?.description
            })
        },
        onError(error) {
            console.log(error)
        }
    })

    const fallback =
        'https://res.cloudinary.com/parfuso-llc/model_insights/landing_page/mi_landing_img_2021-12-30T01_14_10_fp9qgg'

    let imgSrc = fallback
    if (data?.image) {
        imgSrc = data.image
    } else {
        imgSrc = fallback
    }

    return (
        <section
            onMouseEnter={() => setActive(LANDING)}
            id="landing"
            ref={scrollLanding.ref}
            className={styles.Landing}>
            <div
                className={styles.landingImageContainer}
                style={{
                    backgroundImage: `url('${imgSrc}')`
                }}
            />
            <div className={styles.landingContent}>
                <div className={styles.description}>
                    <h1>
                        MODEL
                        <br />
                        INSIGHT
                    </h1>
                    <h4>{data.description}</h4>
                    <BookNowButton />
                </div>
                <div
                    onClick={about.scrollTo}
                    className={styles.scrollIndicator}>
                    Scroll
                    <KeyboardArrowDown />
                </div>
            </div>
        </section>
    )
}

export default Landing
