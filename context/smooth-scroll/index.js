import React, { createContext, useRef, useState } from 'react'

export const LANDING = 'landing'
export const ABOUT = 'about'
export const PRICING = 'pricing'
export const TESTIMONIALS = 'testimonials'
export const CONTACT = 'contact'

export const ScrollContext = createContext(null)

const ScrollContextWrapper = ({ children }) => {
    const landingRef = useRef(null)
    const aboutRef = useRef(null)
    const pricingRef = useRef(null)
    const testimonialsRef = useRef(null)
    const contactRef = useRef(null)

    const [active, setActive] = useState(LANDING)

    let isMobile = false
    if (typeof window !== 'undefined') {
        isMobile = window?.innerWidth < 768
    }

    const scrollToLanding = () => {
        landingRef.current.scrollIntoView(
            isMobile ? true : { behavior: 'smooth' }
        )
        setActive(LANDING)
    }

    const scrollToAbout = () => {
        aboutRef.current.scrollIntoView(
            isMobile ? true : { behavior: 'smooth' }
        )
        setActive(ABOUT)
    }

    const scrollToPricing = () => {
        pricingRef.current.scrollIntoView(
            isMobile ? true : { behavior: 'smooth' }
        )
        setActive(PRICING)
    }

    const scrollToTestimonials = () => {
        testimonialsRef.current.scrollIntoView(
            isMobile ? true : { behavior: 'smooth' }
        )
        setActive(TESTIMONIALS)
    }

    const scrollToContact = () => {
        contactRef.current.scrollIntoView(
            isMobile ? true : { behavior: 'smooth' }
        )
        setActive(CONTACT)
    }

    const values = {
        active,
        setActive,
        landing: {
            ref: landingRef,
            scrollTo: scrollToLanding
        },
        about: {
            ref: aboutRef,
            scrollTo: scrollToAbout
        },
        pricing: {
            ref: pricingRef,
            scrollTo: scrollToPricing
        },
        testimonials: {
            ref: testimonialsRef,
            scrollTo: scrollToTestimonials
        },
        contact: {
            ref: contactRef,
            scrollTo: scrollToContact
        }
    }

    return (
        <ScrollContext.Provider value={values}>
            {children}
        </ScrollContext.Provider>
    )
}
export default ScrollContextWrapper
