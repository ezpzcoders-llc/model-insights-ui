import React from 'react'

import styles from './Page.module.scss'

const Page = ({ children }) => {
    return (
        <section className={styles.PageLayout}>
            <main>{children}</main>
        </section>
    )
}

export default Page
