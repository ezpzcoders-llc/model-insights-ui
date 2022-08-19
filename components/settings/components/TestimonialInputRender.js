import React, { useState } from 'react'
import { TextField, Snackbar, Alert } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { useMutation } from '@apollo/client'

import {
    CREATE_NEW_TESTIMONIAL,
    EDIT_TESTIMONIAL,
    DELETE_TESTIMONIAL
} from '../../../graphql/mutations/testimonials'
// import { currencyFormatter } from '../../../utils/helpers'
import AddIconButton from './AddIconButton'
import RemoveIconButton from './RemoveIconButton'
import { useBanner } from '../useBanner'
import { ButtonsRow } from './FormButtons'
import styles from './SettingsComponents.module.scss'

const NEW_TESTIMONIAL = { quote: '', author: '', profession: '' }

const TestimonialInputRender = ({
    testimonials,
    savedTestimonialsCount,
    setTestimonials
}) => {
    const { banner, showBanner, hideBanner } = useBanner()

    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(null)
    const [editingTestimonial, setEditingTestimonial] =
        useState(NEW_TESTIMONIAL)
    const [newTestimonial, setNewTestimonial] = useState(null)

    const handleEditClick = (index, post) => {
        if (isEditing === null) {
            setIsEditing(index)
            setEditingTestimonial(post)
        } else {
            setIsEditing(null)
        }
    }

    const handlenNewTestimonialChange = ({ target: { name, value } }) => {
        setNewTestimonial({
            ...newTestimonial,
            [name]: value
        })
    }

    const handleEditTestimonialChange = ({ target: { name, value } }) => {
        setEditingTestimonial({
            ...editingTestimonial,
            [name]: value
        })
    }

    const onAddMoreClick = e => {
        e.preventDefault()
        if (newTestimonial === null) {
            setNewTestimonial(NEW_TESTIMONIAL)
        }
    }
    const onRemoveLastClick = e => {
        e.preventDefault()
        setNewTestimonial(null)
    }

    const handleSubmittedTestimonial = data => {
        setTestimonials(data)
        setLoading(false)
        setIsEditing(null)
        setNewTestimonial(null)
    }

    const [createTestimonial] = useMutation(CREATE_NEW_TESTIMONIAL, {
        onCompleted(data) {
            showBanner({
                message: 'New Testimonial uploaded successfully',
                type: 'success'
            })
            handleSubmittedTestimonial(data.createTestimonial)
        },
        onError(err) {
            showBanner({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue uploading your testimonial. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
        }
    })

    const handleSubmitNew = () => {
        setLoading(true)
        createTestimonial({ variables: newTestimonial })
    }

    const [editTestimonial] = useMutation(EDIT_TESTIMONIAL, {
        onCompleted(data) {
            showBanner({
                message: 'Testimonial uploaded successfully',
                type: 'success'
            })
            handleSubmittedTestimonial(data.editTestimonial)
        },
        onError(err) {
            showBanner({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue uploading your testimonial. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
        }
    })

    const handleSubmitEdit = () => {
        setLoading(true)
        editTestimonial({ variables: editingTestimonial })
    }

    const [deleteTestimonial] = useMutation(DELETE_TESTIMONIAL, {
        onCompleted(data) {
            showBanner({
                message: 'Testimonial deleted successfully',
                type: 'success'
            })
            handleSubmittedTestimonial(data.deleteTestimonial)
        },
        onError(err) {
            showBanner({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue deleting your testimonial. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
        }
    })

    const onDeleteClick = post => {
        setLoading(true)
        deleteTestimonial({ variables: { id: post.id } })
    }

    const handleCloseSnackbar = () => {
        hideBanner()
    }

    return (
        <div className={styles.TestimonialInputRender}>
            <section className={styles.testimonialInputs}>
                {testimonials.map((post, index) => {
                    const authorName = `author-${index}`
                    const quoteName = `quote-${index}`
                    const professionName = `profession-${index}`
                    const isDisabled = isEditing !== index

                    const valuesToUse = isDisabled ? post : editingTestimonial

                    return (
                        <section
                            className={styles.postFormSection}
                            key={`fragment${index}`}>
                            <div className={styles.postSectionHeader}>
                                <p>Testimonial #{index + 1} </p>
                                <div>
                                    <Edit
                                        className={styles.edit}
                                        disabled={isEditing === index}
                                        onClick={() =>
                                            handleEditClick(index, post)
                                        }
                                    />
                                    <Delete
                                        className={styles.delete}
                                        onClick={() => onDeleteClick(post)}
                                    />
                                </div>
                            </div>
                            <div className={styles.postFieldBlock} key={index}>
                                <TextField
                                    disabled={isDisabled}
                                    size="small"
                                    name="author"
                                    key={authorName}
                                    label="Author"
                                    variant="outlined"
                                    value={valuesToUse.author}
                                    onChange={handleEditTestimonialChange}
                                />
                                <TextField
                                    disabled={isDisabled}
                                    size="small"
                                    name="profession"
                                    key={professionName}
                                    label="Profession"
                                    variant="outlined"
                                    value={valuesToUse.profession}
                                    onChange={handleEditTestimonialChange}
                                />
                                <TextField
                                    disabled={isDisabled}
                                    multiline
                                    maxRows={6}
                                    name="quote"
                                    key={quoteName}
                                    value={valuesToUse.quote}
                                    label="Quote"
                                    onChange={handleEditTestimonialChange}
                                />
                            </div>
                            <ButtonsRow
                                loading={loading}
                                disabled={isDisabled}
                                onResetClick={() => null}
                                onSubmit={handleSubmitEdit}
                            />
                        </section>
                    )
                })}
                {newTestimonial !== null ? (
                    <section className={styles.postFormSection}>
                        <div className={styles.postSectionHeader}>
                            <p>Testimonial #{savedTestimonialsCount + 1}</p>
                        </div>
                        <div className={styles.priceFieldBlock}>
                            <TextField
                                size="small"
                                name="author"
                                label="Author"
                                variant="outlined"
                                value={newTestimonial.author}
                                onChange={handlenNewTestimonialChange}
                            />
                            <TextField
                                size="small"
                                name="profession"
                                label="Profession"
                                variant="outlined"
                                value={newTestimonial.profession}
                                onChange={handlenNewTestimonialChange}
                            />
                            <TextField
                                multiline
                                maxRows={6}
                                name="quote"
                                value={newTestimonial.quote}
                                label="Quote"
                                onChange={handlenNewTestimonialChange}
                            />
                        </div>
                        <ButtonsRow
                            loading={loading}
                            onResetClick={() => null}
                            onSubmit={handleSubmitNew}
                        />
                    </section>
                ) : null}
            </section>
            <div className={styles.controlButtons}>
                <AddIconButton
                    disabled={newTestimonial !== null}
                    handleIncrease={onAddMoreClick}
                />
                <RemoveIconButton
                    disabled={newTestimonial === null}
                    handleDecrease={onRemoveLastClick}
                />
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                open={banner.visible}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                className={styles[`banner-${banner.type}`]}>
                <Alert
                    severity={banner?.type ?? ''}
                    onClose={handleCloseSnackbar}>
                    {banner?.message ?? ''}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default TestimonialInputRender
