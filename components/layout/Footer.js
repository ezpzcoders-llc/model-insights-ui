import React, { useState, useContext } from 'react'
import {
    Instagram,
    EmailOutlined,
    Close,
    AlternateEmail
} from '@mui/icons-material'
import {
    TextField,
    InputAdornment,
    IconButton,
    Snackbar,
    Button
} from '@mui/material'
import { useMutation } from '@apollo/client'

import { CONFIG } from '../../config'
const { CONTACT_EMAIL } = CONFIG
import { ADD_NEWSLETTER_PARTICIPANT } from '../../graphql/mutations/newsletter'
import Logo from '../Logo'
import { ScrollContext, CONTACT } from '../../context/smooth-scroll'
import styles from './Page.module.scss'

const DEFAULT_BANNER = { type: '', message: '' }
const Footer = () => {
    const [email, setEmail] = useState('')
    const [banner, setBanner] = useState(DEFAULT_BANNER)

    const { contact, setActive } = useContext(ScrollContext)

    const [addNewEmailToNewsLetter] = useMutation(ADD_NEWSLETTER_PARTICIPANT, {
        onCompleted() {
            setBanner({
                type: 'success',
                message: "You'v been added to the mailing list!"
            })

            setTimeout(() => {
                setBanner(DEFAULT_BANNER)
            }, 6000)

            setEmail('')
        },
        onError(err) {
            setBanner({
                message:
                    err.graphQLErrors[0]?.message ??
                    `There was an issue trying toadd you to the mailing list. Please try again or reach out to ${CONTACT_EMAIL} for help.`,
                type: 'error'
            })
        }
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setBanner(DEFAULT_BANNER)
    }

    const SnackbarAction = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}>
            <Close fontSize="small" />
        </IconButton>
    )

    return (
        <footer
            ref={contact.ref}
            id="footer"
            className={styles.Footer}
            onMouseEnter={() => setActive(CONTACT)}>
            <div className={styles.layout}>
                <div className={styles.footerLeft}>
                    <Logo origin="footer" />
                </div>
                <div className={styles.footerRight}>
                    <div className={styles.contact}>
                        <h2>Contact</h2>
                        <span className={styles.contactItem}>
                            <a href={`mailto:${CONTACT_EMAIL}`}>
                                <AlternateEmail />
                                {CONTACT_EMAIL}
                            </a>
                        </span>
                        <span className={styles.contactItem}>
                            <a
                                href="https://www.instagram.com/diptisharma511/"
                                target="_blank"
                                rel="noreferrer">
                                <Instagram />
                                @diptisharma511
                            </a>
                        </span>
                    </div>
                    <div className={styles.newsletter}>
                        <h2>Newsletter</h2>
                        <span>
                            <EmailOutlined /> Submit your email for fashion
                            updates, discounts, raffles
                        </span>
                        <TextField
                            size="small"
                            label="Email"
                            name="email"
                            value={email}
                            onChange={({ target: { value } }) =>
                                setEmail(value)
                            }
                            id="outlined-start-adornment"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        className={styles.searchContainer}>
                                        <Button
                                            className={styles.subscribeBtn}
                                            variant="contained"
                                            onClick={() => {
                                                addNewEmailToNewsLetter({
                                                    variables: { email }
                                                })
                                            }}>
                                            Subscribe
                                        </Button>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            open={!!banner.message}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message={banner.message}
                            action={SnackbarAction}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
