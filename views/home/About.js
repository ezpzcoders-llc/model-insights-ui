import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_ABOUT_PAGE } from '../../graphql/queries/about'
import { CmsContext } from '../../context/cms'
import BookNowButton from '../../components/BookNowButton'
import { ScrollContext, ABOUT } from '../../context/smooth-scroll'
import styles from './Home.module.scss'

const About = () => {
    const { about } = useContext(CmsContext)
    const { about: scrollAbout, setActive } = useContext(ScrollContext)
    const { description, bulletPoints, setAbout } = about

    useQuery(FETCH_ABOUT_PAGE, {
        onCompleted(data) {
            if (data?.getAbout?.length > 0) {
                const { description: newDesc, bulletPoints: newBullets } =
                    data.getAbout[0]
                setAbout({ description: newDesc, bulletPoints: newBullets })
            }
        },
        onError(error) {
            console.log(error)
        }
    })

    return (
        <section
            id="about"
            ref={scrollAbout.ref}
            onMouseEnter={() => setActive(ABOUT)}
            className={`${styles.About} leftPaddedItem`}>
            <h3>
                About Us<span className="accent">:</span>
            </h3>
            <div className={styles.content}>
                <div className={styles.description}>
                    {description
                        ? description.map((paragraph, key) => (
                              <p key={key}>{paragraph}</p>
                          ))
                        : null}
                </div>
                {bulletPoints?.length ? (
                    <div className={styles.bulletPoints}>
                        <ul>
                            {bulletPoints.map((bullet, key) => (
                                <li key={key}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
            <BookNowButton />
        </section>
    )
}

export default About
