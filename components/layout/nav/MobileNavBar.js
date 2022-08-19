import React, { useState, useContext } from 'react'
import {
    AppBar,
    IconButton,
    Slide,
    useScrollTrigger,
    Drawer,
    Button
} from '@mui/material'
import { Menu, Cancel, Settings, Logout } from '@mui/icons-material'

import BookNowButton from '../../BookNowButton'
import Logo from '../../Logo'
import {
    ScrollContext,
    ABOUT,
    PRICING,
    TESTIMONIALS,
    CONTACT,
    BOOK
} from '../../../context/smooth-scroll'
import styles from '../Page.module.scss'

const HideOnScroll = props => {
    const { children, window } = props
    const trigger = useScrollTrigger({
        target: window ? window() : undefined
    })

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

const MobileNavBar = ({ onSettingsClick, isLoggedIn, logout }) => {
    const { landing, about, pricing, testimonials, contact, active } =
        useContext(ScrollContext)

    const [show, setShow] = useState(false)

    const handleNavItemClick = cb => {
        cb()
        setShow(false)
    }

    const handleIconClick = cb => {
        setShow(false)
        cb()
    }

    return (
        <>
            <HideOnScroll>
                <AppBar className={styles.MobileNavBar}>
                    <Logo origin="mobileHeader" />
                    <IconButton
                        onClick={() => setShow(show ? false : true)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        {show ? <Cancel /> : <Menu />}
                    </IconButton>
                </AppBar>
            </HideOnScroll>
            <Drawer
                variant="temporary"
                className={styles.MobileNavMenuDrawer}
                anchor="right"
                hideBackdrop
                open={show}
                onClose={() => setShow(false)}>
                <section className={styles.MobileNavMenu}>
                    <div className={styles.navWrapper}>
                        <ul>
                            <li
                                className={
                                    active === ABOUT ? styles.activeLink : ''
                                }
                                onClick={() =>
                                    handleNavItemClick(about.scrollTo)
                                }>
                                ABOUT
                            </li>
                            <li
                                className={
                                    active === PRICING ? styles.activeLink : ''
                                }
                                onClick={() =>
                                    handleNavItemClick(pricing.scrollTo)
                                }>
                                PRICES
                            </li>
                            <li
                                className={
                                    active === TESTIMONIALS
                                        ? styles.activeLink
                                        : ''
                                }
                                onClick={() =>
                                    handleNavItemClick(testimonials.scrollTo)
                                }>
                                TESTIMONIALS
                            </li>
                            <li
                                className={
                                    active === CONTACT ? styles.activeLink : ''
                                }
                                onClick={() =>
                                    handleNavItemClick(contact.scrollTo)
                                }>
                                CONTACT
                            </li>
                            <BookNowButton type="mobileNav" />
                        </ul>
                    </div>
                    {isLoggedIn ? (
                        <div className={styles.authButtons}>
                            <Button
                                variant="contained"
                                onClick={() => handleIconClick(onSettingsClick)}
                                startIcon={<Settings />}>
                                Settings
                            </Button>
                            <Button
                                onClick={() => handleIconClick(logout)}
                                variant="contained"
                                startIcon={<Logout />}>
                                Logout
                            </Button>
                        </div>
                    ) : null}
                </section>
            </Drawer>
        </>
    )
}

export default MobileNavBar
