import React, { useContext, useState } from 'react'
import { Drawer } from '@mui/material'

import { AuthContext } from '../../../context/auth'
import {
    ScrollContext,
    ABOUT,
    PRICING,
    TESTIMONIALS,
    CONTACT
} from '../../../context/smooth-scroll'
import styles from '../Page.module.scss'
import Logo from '../../Logo'
import SettingsWidget from '../../settings'
import AuthButtons from '../../AuthButtons'

const NavBar = () => {
    const { landing, about, pricing, testimonials, contact, active } =
        useContext(ScrollContext)
    const { isLoggedIn } = useContext(AuthContext)

    const [showSettings, setShowSettings] = useState(false)

    const onSettingsClick = () => {
        setShowSettings(!showSettings)
    }

    const onCloseSettings = () => {
        setShowSettings(false)
    }

    return (
        <>
            <nav className={styles.NavBar}>
                <div className={styles.navWrapper}>
                    <ul>
                        <li
                            className={
                                active === ABOUT ? styles.activeLink : ''
                            }
                            onClick={about.scrollTo}>
                            About
                        </li>
                        <li
                            className={
                                active === PRICING ? styles.activeLink : ''
                            }
                            onClick={pricing.scrollTo}>
                            Packages
                        </li>
                        <li
                            className={
                                active === TESTIMONIALS ? styles.activeLink : ''
                            }
                            onClick={testimonials.scrollTo}>
                            Testimonials
                        </li>
                        <li
                            className={
                                active === CONTACT ? styles.activeLink : ''
                            }
                            onClick={contact.scrollTo}>
                            Contact
                        </li>
                    </ul>
                </div>
            </nav>
            {isLoggedIn ? (
                <AuthButtons onSettingsClick={onSettingsClick} />
            ) : null}

            <Drawer
                variant="temporary"
                className={styles.SettingsDrawer}
                anchor="right"
                open={showSettings}
                onClose={onCloseSettings}>
                <SettingsWidget onClose={onCloseSettings} />
            </Drawer>
        </>
    )
}

export default NavBar
