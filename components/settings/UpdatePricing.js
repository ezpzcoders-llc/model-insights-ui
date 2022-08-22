import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    useRef
} from 'react'
import axios from 'axios'
import { useMutation } from '@apollo/client'
import { TextField, Button } from '@mui/material'

import Banner from '../Banner'
import {
    ADD_PRICE_CAROUSEL_IMAGE,
    DELETE_PRICE_CAROUSEL_IMAGE,
    SET_PRICE_DESCRIPTION
} from '../../graphql/mutations/priceCarousel'
import { CmsContext } from '../../context/cms'
import { useBanner } from './useBanner'
import UploadImage from './components/UploadImage'
import { convertFileToBase64 } from '../../utils/helpers'
import styles from './Settings.module.scss'

const UpdatePricing = () => {
    const { pricing } = useContext(CmsContext)
    const { setCarousel, carousel, description, setDescription } = pricing

    const { banner, setBanner } = useBanner()

    const [images, setImages] = useState([])
    const [imageLoading, setImageLoading] = useState(false)
    const [uploadingCount, setUploadingCount] = useState(0)
    const [pricingDescription, setPricingDesc] = useState(null)
    const [pricingLoading, setPricingLoading] = useState(false)
    const [wasPricingTouched, setWasPricingTouched] = useState(false)
    const uploadRef = useRef(null)

    const [addPriceCarouselImages] = useMutation(ADD_PRICE_CAROUSEL_IMAGE, {
        onCompleted(data) {
            setBanner.show({
                message: 'Pricing images uploaded successfully',
                type: 'success'
            })
            setImageLoading(false)
            setUploadingCount(0)
            const updatedCarousel = [
                ...carousel,
                ...data.addPriceCarouselImages
            ]
            uploadRef.current.value = null
            setCarousel(updatedCarousel)
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
    })

    const submitUploadedImages = useCallback(async () => {
        addPriceCarouselImages({ variables: { urls: images } })
    }, [images, addPriceCarouselImages])

    useEffect(() => {
        if (uploadingCount === images.length && uploadingCount > 0) {
            submitUploadedImages()
        }
    }, [uploadingCount, images, submitUploadedImages])

    const uploadImgToCloud = async data => {
        const url =
            'https://api.cloudinary.com/v1_1/ezpzcoding-cloudinary/image/upload'
        const form = new FormData()
        form.append('file', data)
        form.append(
            'filename_override',
            `mi_pricing_${new Date().toISOString()}`
        )
        form.append('upload_preset', 'pricing_images')

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

    const [deletePriceCarouselImage] = useMutation(
        DELETE_PRICE_CAROUSEL_IMAGE,
        {
            onCompleted({ deletePriceCarouselImage }) {
                setBanner.show({
                    message: 'Image deleted successfully',
                    type: 'success'
                })
                setCarousel(deletePriceCarouselImage)
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
        deletePriceCarouselImage({ variables: { id } })
    }

    const handleCloseSnackbar = () => {
        setBanner.hide()
    }

    const handlePricingDescriptionUpdate = ({ target: { value } }) => {
        setWasPricingTouched(true)
        setPricingDesc(value)
    }

    const [setPricingDescription] = useMutation(SET_PRICE_DESCRIPTION, {
        onCompleted({ setPricingDescription }) {
            setBanner.show({
                message: 'Pricing description updated successfully',
                type: 'success'
            })

            setDescription(setPricingDescription.description)
            setPricingLoading(false)
        },
        onError(err) {
            setBanner.show({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue updating the pricing description. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
            setPricingLoading(false)
        }
    })

    const onPriceDescriptionSubmit = () => {
        setPricingLoading(true)
        setPricingDescription({
            variables: { description: pricingDescription }
        })
    }

    return (
        <section className={styles.UpdatePricing}>
            <div className={styles.pricingDescription}>
                <p>Update your packages & services description here.</p>
                <TextField
                    multiline
                    maxRows={6}
                    name="priceDescription"
                    value={wasPricingTouched ? pricingDescription : description}
                    onChange={handlePricingDescriptionUpdate}
                />
                <Button
                    variant="contained"
                    onClick={onPriceDescriptionSubmit}
                    loading={pricingLoading}>
                    SUBMIT
                </Button>
            </div>
            <div className={styles.pricingInfo}>
                <p>
                    To edit, delete, or create new packages/events,{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://calendly.com/event_types/user/me">
                        click to visit your Calendly page
                    </a>
                    .
                </p>
            </div>
            <UploadImage
                ref={uploadRef}
                onImageChange={handleImageChange}
                carousel={carousel}
                loading={imageLoading}
                onImageDelete={handleImageDelete}
                multiple
                origin="pricing"
            />
            <Banner banner={banner} handleCloseSnackbar={handleCloseSnackbar} />
        </section>
    )
}

export default UpdatePricing
