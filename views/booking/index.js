import React from 'react'

import { InlineWidget, CalendlyEventListener } from 'react-calendly'
import SideNavLogoOnly from '/components/SideNavLogoOnly'

import styles from './Booking.module.scss'

const Calendar = () => {
    const onEventScheduled = e => {
        console.log(e)
        debugger
    }

    return (
        <section id="bookings" className={styles.Bookings}>
            <SideNavLogoOnly />
            <div className={styles.BookingsContainer}>
                <CalendlyEventListener onEventScheduled={onEventScheduled}>
                    <InlineWidget
                        styles={{ height: '100vh' }}
                        url="https://calendly.com/parfuso-llc"
                    />
                </CalendlyEventListener>
            </div>
        </section>
    )
}

export default Calendar
