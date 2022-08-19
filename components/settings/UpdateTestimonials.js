import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    useRef
} from 'react'
import axios from 'axios'
import { useMutation } from '@apollo/client'

import {
    ADD_TESTIMONIAL_CAROUSEL_IMAGE,
    DELETE_TESTIMONIAL_CAROUSEL_IMAGE
} from '../../graphql/mutations/testimonialCarousel'
import { CmsContext } from '../../context/cms'
import { useBanner } from './useBanner'
import Banner from '../../components/Banner'
import { convertFileToBase64 } from '../../utils/helpers'
import TestimonialInputRender from './components/TestimonialInputRender'
import UploadImage from './components/UploadImage'
import styles from './Settings.module.scss'

const UpdateTestimonials = () => {
    const {
        posts: { testimonials, setTestimonials, carousel, setCarousel }
    } = useContext(CmsContext)

    const { banner, setBanner } = useBanner()

    const [images, setImages] = useState([])
    const [imageLoading, setImageLoading] = useState(false)
    const [uploadingCount, setUploadingCount] = useState(0)
    const uploadRef = useRef(null)

    const [addTestimonialCarouselImages] = useMutation(
        ADD_TESTIMONIAL_CAROUSEL_IMAGE,
        {
            onCompleted(data) {
                setBanner.show({
                    message: 'Testimonial images uploaded successfully',
                    type: 'success'
                })
                setImageLoading(false)
                setUploadingCount(0)
                uploadRef.current.value = null
                setCarousel(data.addTestimonialCarouselImages)
            },
            onError(err) {
                setBanner.show({
                    message:
                        err.graphQLErrors[0]?.message ??
                        'There was an issue updating the pricing carousel. Please try again or reach out to me for more assistance.',
                    type: 'error'
                })
                setImageLoading(false)
            }
        }
    )

    const submitUploadedImages = useCallback(async () => {
        addTestimonialCarouselImages({ variables: { urls: images } })
    }, [images, addTestimonialCarouselImages])

    useEffect(() => {
        if (uploadingCount === images.length && uploadingCount > 0) {
            submitUploadedImages()
        }
    }, [uploadingCount, images, submitUploadedImages])

    const uploadImgToCloud = async data => {
        const url = 'https://api.cloudinary.com/v1_1/parfuso-llc/image/upload'
        const form = new FormData()
        form.append('file', data)
        form.append(
            'filename_override',
            `mi_pricing_${new Date().toISOString()}`
        )
        form.append('upload_preset', 'testimonial_images')
        try {
            const result = await axios.post(url, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            setImages(prev => [...prev, result.data.secure_url])
        } catch (error) {
            setBanner.show({
                mesage: 'There was an issue uploading the image',
                type: 'error'
            })
        }
    }

    const handleImageChange = e => {
        setImageLoading(true)
        const files = e.target.files
        setUploadingCount(files.length)
        Object.keys(files).forEach(item => {
            convertFileToBase64(files[item], uploadImgToCloud)
        })
    }

    const [deleteTestimonialCarouselImage] = useMutation(
        DELETE_TESTIMONIAL_CAROUSEL_IMAGE,
        {
            onCompleted({ deleteTestimonialCarouselImage }) {
                setBanner.show({
                    message: 'Image deleted successfully',
                    type: 'success'
                })
                setCarousel(deleteTestimonialCarouselImage)
            },
            onError(err) {
                setBanner.show({
                    message:
                        err.graphQLErrors[0]?.message ??
                        'There was an issue updating the pricing carousel. Please try again or reach out to me for more assistance.',
                    type: 'error'
                })
                setImageLoading(false)
            }
        }
    )

    const handleImageDelete = id => {
        deleteTestimonialCarouselImage({ variables: { id } })
    }

    const handleCloseSnackbar = () => {
        setBanner.hide()
    }

    return (
        <section className={styles.UpdateTestimonials}>
            <div className={styles.testimonialsInfo}>
                <p>
                    Edit existing testimonials, or add new ones. Every post
                    needs to have an author, quote, and profession before
                    submitting.
                </p>
                <form>
                    <TestimonialInputRender
                        testimonials={testimonials}
                        savedTestimonialsCount={testimonials.length}
                        setTestimonials={setTestimonials}
                    />
                </form>
            </div>
            <UploadImage
                ref={uploadRef}
                onImageChange={handleImageChange}
                carousel={carousel}
                loading={imageLoading}
                onImageDelete={handleImageDelete}
                multiple
                origin="testimonials"
            />
            <Banner banner={banner} handleCloseSnackbar={handleCloseSnackbar} />
        </section>
    )
}

export default UpdateTestimonials
