import { useState, useEffect } from 'react'

import Logo from '../../components/Logo'
import Landing from './Landing'
import About from './About'
import Services from './Services'
import Testimonials from './Testimonials'
import Footer from '../../components/layout/Footer'
import { NavBar, MobileNavBar } from '../../components/layout/nav'
import styles from './Home.module.scss'

const Home = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        function handleResize() {
            const mobileBreakpoint = 750
            setIsMobile(window.innerWidth <= mobileBreakpoint)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <section className={styles.Home}>
            <div className={styles.logoWrapper}>
                {isMobile ? null : <Logo />}
            </div>
            <Landing />
            <section className={styles.bodyWithNav}>
                {isMobile ? <MobileNavBar /> : <NavBar />}
                <div>
                    <About />
                    <Services />
                    <Testimonials />
                </div>
            </section>
            <Footer />
        </section>
    )
}

export default Home
