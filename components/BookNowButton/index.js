import React from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import Link from 'next/link'

import styles from './BookNow.module.scss'

const BookNowButton = ({ type = '' }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push('/bookings')
    }

    return (
        <Link href="/bookings" passHref>
            <Button
                onClick={handleClick}
                variant="contained"
                className={`${styles.BookNowButton} ${
                    type === 'mobileNav' ? styles.mobileBtn : ''
                }`}>
                Book Now
            </Button>
        </Link>
    )
}

export default BookNowButton
