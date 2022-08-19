import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { useMutation } from '@apollo/client'

import Banner from '../../Banner'
import {
    CREATE_NEW_SERVICE,
    EDIT_SERVICE,
    DELETE_SERVICE
} from '../../../graphql/mutations/services'
import AddIconButton from './AddIconButton'
import RemoveIconButton from './RemoveIconButton'
import { useBanner } from '../useBanner'
import { ButtonsRow } from './FormButtons'
import styles from './SettingsComponents.module.scss'

const NEW_SERVICE = { title: '', price: '', description: '', summary: '' }

const PricingInputRender = ({ services, savedServiceCount, setServices }) => {
    const { banner, setBanner } = useBanner()

    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(null)
    const [editingService, setEditingService] = useState(NEW_SERVICE)
    const [newService, setNewService] = useState(null)

    const handleEditClick = (index, service) => {
        if (isEditing === null) {
            setIsEditing(index)
            setEditingService(service)
        } else {
            setIsEditing(null)
        }
    }

    const handlenNewServiceChange = ({ target: { name, value } }) => {
        setNewService({
            ...newService,
            [name]: value
        })
    }

    const handleEditServiceChange = ({ target: { name, value } }) => {
        // revisit to finish currency formatting
        setEditingService({
            ...editingService,
            [name]: value
            // [name]: name === 'price' ? currencyFormatter(value) : value
        })
    }

    const onAddMoreClick = e => {
        e.preventDefault()
        if (newService === null) {
            setNewService(NEW_SERVICE)
        }
    }
    const onRemoveLastClick = e => {
        e.preventDefault()
        setNewService(null)
    }

    const handleSubmittedService = data => {
        setServices(data)
        setLoading(false)
        setIsEditing(null)
        setNewService(null)
    }

    const [createService] = useMutation(CREATE_NEW_SERVICE, {
        onCompleted(data) {
            setBanner.show({
                message: 'New Service uploaded successfully',
                type: 'success'
            })
            handleSubmittedService(data.createService)
        },
        onError(err) {
            setBanner.show({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue uploading your service. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
        }
    })

    const handleSubmitNew = () => {
        setLoading(true)
        createService({ variables: newService })
    }

    const [editService] = useMutation(EDIT_SERVICE, {
        onCompleted(data) {
            setBanner.show({
                message: 'Service uploaded successfully',
                type: 'success'
            })
            handleSubmittedService(data.editService)
        },
        onError(err) {
            setBanner.show({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue uploading your service. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
        }
    })

    const handleSubmitEdit = () => {
        setLoading(true)
        editService({ variables: editingService })
    }

    const [deleteService] = useMutation(DELETE_SERVICE, {
        onCompleted(data) {
            setBanner.show({
                message: 'Service deleted successfully',
                type: 'success'
            })
            handleSubmittedService(data.deleteService)
        },
        onError(err) {
            setBanner.show({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue deleting your service. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
        }
    })

    const onDeleteClick = service => {
        setLoading(true)
        deleteService({ variables: { id: service.id } })
    }

    const handleCloseSnackbar = () => {
        setBanner.hide()
    }

    return (
        <div className={styles.PriceInputRender}>
            <section className={styles.priceInputs}>
                {services.map((service, index) => {
                    const titleName = `title-${index}`
                    const descriptionName = `description-${index}`
                    const priceName = `price-${index}`
                    const summaryName = `summary-${index}`
                    const isDisabled = isEditing !== index

                    const valuesToUse = isDisabled ? service : editingService

                    return (
                        <section
                            className={styles.serviceFormSection}
                            key={`fragment${index}`}>
                            <div className={styles.serviceSectionHeader}>
                                <p>Service #{index + 1} </p>
                                <div>
                                    <Edit
                                        className={styles.edit}
                                        disabled={isEditing === index}
                                        onClick={() =>
                                            handleEditClick(index, service)
                                        }
                                    />
                                    <Delete
                                        className={styles.delete}
                                        onClick={() => onDeleteClick(service)}
                                    />
                                </div>
                            </div>
                            <div className={styles.priceFieldBlock} key={index}>
                                <TextField
                                    disabled={isDisabled}
                                    size="small"
                                    name="title"
                                    key={titleName}
                                    label="Title"
                                    variant="outlined"
                                    value={valuesToUse.title}
                                    onChange={handleEditServiceChange}
                                />
                                <TextField
                                    type="number"
                                    disabled={isDisabled}
                                    size="small"
                                    name="price"
                                    key={priceName}
                                    label="Price"
                                    variant="outlined"
                                    value={valuesToUse.price}
                                    onChange={handleEditServiceChange}
                                />
                                <TextField
                                    disabled={isDisabled}
                                    size="small"
                                    name="summary"
                                    key={summaryName}
                                    label="Summary"
                                    variant="outlined"
                                    value={valuesToUse.summary}
                                    onChange={handleEditServiceChange}
                                />
                                <TextField
                                    disabled={isDisabled}
                                    multiline
                                    maxRows={6}
                                    name="description"
                                    key={descriptionName}
                                    value={valuesToUse.description}
                                    label="Description"
                                    onChange={handleEditServiceChange}
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
                {newService !== null ? (
                    <section className={styles.serviceFormSection}>
                        <div className={styles.serviceSectionHeader}>
                            <p>Service #{savedServiceCount + 1}</p>
                        </div>
                        <div className={styles.priceFieldBlock}>
                            <TextField
                                size="small"
                                name="title"
                                label="Title"
                                variant="outlined"
                                value={newService.title}
                                onChange={handlenNewServiceChange}
                            />
                            <TextField
                                size="small"
                                name="price"
                                label="Price"
                                variant="outlined"
                                value={newService.price}
                                onChange={handlenNewServiceChange}
                            />
                            <TextField
                                size="small"
                                name="summary"
                                label="Summary"
                                variant="outlined"
                                value={newService.summary}
                                onChange={handlenNewServiceChange}
                            />
                            <TextField
                                multiline
                                maxRows={6}
                                name="description"
                                value={newService.description}
                                label="Description"
                                onChange={handlenNewServiceChange}
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
                    disabled={newService !== null}
                    handleIncrease={onAddMoreClick}
                />
                <RemoveIconButton
                    disabled={newService === null}
                    handleDecrease={onRemoveLastClick}
                />
            </div>
            <Banner handleCloseSnackbar={handleCloseSnackbar} banner={banner} />
        </div>
    )
}

export default PricingInputRender
