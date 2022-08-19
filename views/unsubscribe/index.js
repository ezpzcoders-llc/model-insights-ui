/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { Cancel, Unsubscribe } from '@mui/icons-material'
import { useMutation } from '@apollo/client'
import { CheckBox } from '@mui/icons-material'

import { CONTACT_EMAIL } from '/config'
import Banner from '../../components/Banner'
import { useBanner } from '../../components/settings/useBanner'
import { UNSUBSCRIBE_USER } from '../../graphql/mutations/newsletter'
import SideNavLogoOnly from '/components/SideNavLogoOnly'
import styles from './Unsubscribe.module.scss'

const UnsubscribePage = () => {
    const router = useRouter()
    const email = router.query.email
    const { banner, setBanner } = useBanner()

    const [showSuccess, setShowSuccess] = useState(false)

    const [unsubscribeUser] = useMutation(UNSUBSCRIBE_USER, {
        onCompleted() {
            setShowSuccess(true)
        },
        onError(err) {
            setBanner({
                message:
                    err.graphQLErrors[0]?.message ??
                    `There was an issue trying to remove you from the mailing list. Please try again or reach out to ${CONTACT_EMAIL} for help.`,
                type: 'error'
            })
        }
    })

    const onUnsubscribeClick = () => {
        unsubscribeUser({
            variables: {
                email
            }
        })
    }

    const onCancelClick = () => {
        router.push('/')
    }

    return (
        <section className={styles.Unsubscribe}>
            <SideNavLogoOnly />
            <div className={styles.unsubBody}>
                {showSuccess ? (
                    <div className={styles.Unsubbed}>
                        <p>
                            <CheckBox /> You have successfully been unsubscribed
                            from our newsletter.
                        </p>
                    </div>
                ) : (
                    <div className={styles.card}>
                        <h1>Unsubscribe from Model Insights Newsletter</h1>
                        <p>
                            We are sad to see you go!
                            <br />
                            <br />
                            Please confirm that {"you'd"} like to stop receiving
                            emails from us.
                            <br />
                            <br />
                            Unsubscribe <em>{email}</em> from mailing list
                        </p>
                        <div className={styles.buttons}>
                            <Button
                                variant="outlined"
                                className={styles.submitButton}
                                startIcon={<Unsubscribe />}
                                onClick={onUnsubscribeClick}>
                                Confirm
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Cancel />}
                                onClick={onCancelClick}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <Banner
                banner={banner}
                handleCloseSnackbar={() => setBanner.hide()}
            />
        </section>
    )
}

export default UnsubscribePage
