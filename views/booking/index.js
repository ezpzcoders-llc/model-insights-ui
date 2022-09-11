import { useMutation } from '@apollo/client'
import { InlineWidget, useCalendlyEventListener } from 'react-calendly'

import { ADD_SUBSCRIBER_TO_NEWSLETTER } from '../../graphql/mutations/newsletter'
import SideNavLogoOnly from '/components/SideNavLogoOnly'
import styles from './Booking.module.scss'

const Calendar = () => {
    const [addSubscriberToNewsLetter] = useMutation(
        ADD_SUBSCRIBER_TO_NEWSLETTER,
        {
            onCompleted(data) {},
            onError(err) {
                console.log(err)
            }
        }
    )

    const onEventScheduled = e =>
        addSubscriberToNewsLetter({
            variables: {
                inviteeUri: e.data.payload.invitee.uri
            }
        })

    useCalendlyEventListener({
        onEventScheduled: onEventScheduled
    })

    return (
        <section id="bookings" className={styles.Bookings}>
            <SideNavLogoOnly />
            <div className={styles.BookingsContainer}>
                <InlineWidget
                    styles={{ height: '100vh' }}
                    url="https://calendly.com/parfuso-llc"
                />
            </div>
        </section>
    )
}

export default Calendar
