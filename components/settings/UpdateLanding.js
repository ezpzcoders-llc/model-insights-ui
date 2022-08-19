/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect } from 'react'
import { Input, Button, IconButton, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FileUpload, Delete } from '@mui/icons-material'
import axios from 'axios'
import { useMutation } from '@apollo/client'

import Banner from '../../components/Banner'
import SkeletonWrapper from '../skeleton'
import { CmsContext } from '../../context/cms'
import { useBanner } from './useBanner'
import {
    EDIT_LANDING_IMG,
    EDIT_LANDING_DESCRIPTION
} from '../../graphql/mutations/landing'
import styles from './Settings.module.scss'

const UpdateLanding = () => {
    const {
        landing: { setLanding, data }
    } = useContext(CmsContext)
    const { banner, setBanner } = useBanner()
    const [image, setImage] = useState(null)
    const [newDescription, setNewDescription] = useState(null)
    const [imageTouched, setImageTouched] = useState(false)
    const [descTouched, setDescTouched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [descriptionLoading, setDescriptionLoading] = useState(false)

    useEffect(() => {
        if (!imageTouched) {
            if (!image && data?.image) {
                setImage(data.image)
                setImageTouched(true)
            }
        }
        if (!descTouched) {
            if (!newDescription && data?.description) {
                setNewDescription(data.description)
                setDescTouched(true)
            }
        }
    }, [
        data,
        image,
        newDescription,
        imageTouched,
        setImageTouched,
        descTouched,
        setDescTouched
    ])

    const [editLandingImage] = useMutation(EDIT_LANDING_IMG, {
        onCompleted(updatedLandingImg) {
            setBanner.show({
                message: 'Image uploaded successfully',
                type: 'success'
            })
            setLoading(false)
            const imgFullPath = `https://res.cloudinary.com/parfuso-llc/${updatedLandingImg?.editLandingImage?.publicId}`
            setLanding({ ...data, image: imgFullPath })
        },
        onError(err) {
            setBanner.show({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue trying to upload your image. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
            setLoading(false)
        }
    })

    const convertFileToBase64 = file => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64 = reader.result

            setImage(base64)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmitClick = async () => {
        setLoading(true)
        try {
            const url =
                'https://api.cloudinary.com/v1_1/parfuso-llc/image/upload'
            const form = new FormData()
            form.append('file', image)
            form.append(
                'filename_override',
                `mi_landing_img_${new Date().toISOString()}`
            )
            form.append('upload_preset', 'mi_landing_page')

            const result = await axios.post(url, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            editLandingImage({ variables: { publicId: result.data.public_id } })
        } catch (error) {
            setBanner.show({
                message:
                    'There was an issue trying to upload your image. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
            setLoading(false)
        }
    }

    const handleImageChange = e => {
        convertFileToBase64(e.target.files[0])
    }

    const handleDeleteClick = () => setImage('')

    const [editLandingDescription] = useMutation(EDIT_LANDING_DESCRIPTION, {
        onCompleted(updatedDesciption) {
            setBanner.show({
                message: 'Description updated successfully',
                type: 'success'
            })
            setDescriptionLoading(false)
            setLanding({
                ...data,
                description:
                    updatedDesciption?.editLandingDescription?.description
            })
            setDescriptionLoading(false)
        },
        onError(err) {
            setBanner.show({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue trying to update your description. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
            setLoading(false)
        }
    })

    const handleDescription = e => {
        setNewDescription(e.target.value)

        if (!descTouched) {
            setDescTouched(true)
        }
    }

    const onDescriptionSubmit = () => {
        setDescriptionLoading(true)
        try {
            editLandingDescription({
                variables: { description: newDescription }
            })
        } catch (error) {
            setBanner.show({
                message:
                    error.graphQLErrors[0]?.message ??
                    'There was an issue trying to update your description. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
            setLoading(false)
        }
    }

    return (
        <section className={styles.UpdateLanding}>
            <div className={styles.content}>
                <div>
                    <p>
                        Upload a new image that the user sees when they first
                        land on the page.
                    </p>
                    <div className={styles.uploadRow}>
                        {image ? (
                            <div className={styles.uploadedImage}>
                                <img src={image} alt="uploaded-image" />
                                <div className={styles.deleteOverlay} />
                            </div>
                        ) : (
                            <SkeletonWrapper />
                        )}
                        <div>
                            <label htmlFor="landing-img-upload">
                                <Input
                                    accept="image/*"
                                    id="landing-img-upload"
                                    multiple={false}
                                    type="file"
                                    onChange={handleImageChange}
                                />
                                <Button
                                    variant="contained"
                                    startIcon={<FileUpload />}
                                    disabled={!!image}
                                    component="span">
                                    UPLOAD
                                </Button>
                            </label>
                            <IconButton
                                disabled={!image}
                                onClick={handleDeleteClick}>
                                <Delete />
                            </IconButton>
                        </div>
                        <div className={styles.buttonsRow}>
                            <LoadingButton
                                variant="contained"
                                loading={loading}
                                disabled={!image}
                                onClick={handleSubmitClick}>
                                SUBMIT
                            </LoadingButton>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    <p>Enter/edit your description here.</p>
                    <TextField
                        className={styles.textarea}
                        multiline
                        maxRows={6}
                        name="description"
                        value={newDescription}
                        onChange={handleDescription}
                    />
                    <LoadingButton
                        variant="contained"
                        loading={descriptionLoading}
                        disabled={!newDescription}
                        onClick={onDescriptionSubmit}>
                        SUBMIT DESCRIPTION
                    </LoadingButton>
                </div>
            </div>
            <Banner
                banner={banner}
                handleCloseSnackbar={() => setBanner.hide()}
            />
        </section>
    )
}

export default UpdateLanding
