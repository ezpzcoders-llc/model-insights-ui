import React, { useState } from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Switch,
    IconButton
} from '@mui/material'
import { ExpandMore, Cancel } from '@mui/icons-material'

import UpdateLanding from './UpdateLanding'
import UpdateAbout from './UpdateAbout'
import UpdatePricing from './UpdatePricing'
import UpdateTestimonials from './UpdateTestimonials'
import UpdateNewsLetter from './UpdateNewsLetter'
import styles from './Settings.module.scss'

const Settings = ({ onClose }) => {
    const [expanded, setExpanded] = useState('landing')
    const [expandAll, setExpandAll] = useState(false)
    const handleExpandedChange = panel => (event, newExpanded) =>
        setExpanded(newExpanded ? panel : false)

    const handleExpandAll = event => setExpandAll(event.target.checked)

    return (
        <section className={styles.Settings}>
            <div className={styles.header}>
                <h2>
                    SETTINGS{' '}
                    <Switch
                        checked={expandAll}
                        onChange={handleExpandAll}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />{' '}
                    Expand All
                </h2>
                <IconButton onClick={onClose}>
                    <Cancel />
                </IconButton>
            </div>
            <div className={styles.settingsBody}>
                <Accordion
                    disableGutters
                    square
                    expanded={expandAll ? expandAll : expanded === 'landing'}
                    onChange={handleExpandedChange('landing')}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="landing">
                        <h2>Landing Page</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateLanding />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    disableGutters
                    square
                    expanded={expandAll ? expandAll : expanded === 'about'}
                    onChange={handleExpandedChange('about')}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="about">
                        <h2>About Us</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateAbout />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    disableGutters
                    square
                    expanded={expandAll ? expandAll : expanded === 'services'}
                    onChange={handleExpandedChange('services')}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="services">
                        <h2>Packages</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdatePricing />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    disableGutters
                    square
                    expanded={
                        expandAll ? expandAll : expanded === 'testimonials'
                    }
                    onChange={handleExpandedChange('testimonials')}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="testimonials">
                        <h2>Testimonials</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateTestimonials />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    disableGutters
                    square
                    expanded={expandAll ? expandAll : expanded === 'newsletter'}
                    onChange={handleExpandedChange('newsletter')}>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1bh-content"
                        id="newsletter">
                        <h2>Newsletter</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateNewsLetter />
                    </AccordionDetails>
                </Accordion>
            </div>
        </section>
    )
}

export default Settings
