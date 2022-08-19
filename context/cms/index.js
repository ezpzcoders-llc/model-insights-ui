import React, { createContext, useState } from 'react'

export const CmsContext = createContext(null)

export const CmsContextWrapper = ({ children }) => {
    const [landing, setLanding] = useState({
        image: '',
        description: ''
    })
    const [about, setAbout] = useState({ description: '', bulletPoints: [] })
    const [services, setServices] = useState([])
    const [pricingDescription, setPricingDescription] = useState('')
    const [priceImages, setPriceImages] = useState([])
    const [testimonials, setTestimonials] = useState([])
    const [testimonialImages, setTestimonialImages] = useState([])

    const cmsData = {
        landing: { setLanding, data: landing },
        about: { ...about, setAbout },
        pricing: {
            services: [...services],
            setServices,
            carousel: [...priceImages],
            setCarousel: setPriceImages,
            description: pricingDescription,
            setDescription: setPricingDescription
        },
        posts: {
            testimonials: [...testimonials],
            carousel: [...testimonialImages],
            setTestimonials,
            setCarousel: setTestimonialImages
        }
    }

    return (
        <CmsContext.Provider value={{ ...cmsData }}>
            {children}
        </CmsContext.Provider>
    )
}
