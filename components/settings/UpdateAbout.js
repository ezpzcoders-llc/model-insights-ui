import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'

import Banner from '../../components/Banner'
import { EDIT_ABOUT_PAGE } from '../../graphql/mutations/about'
import { CmsContext } from '../../context/cms'
import { useBanner } from './useBanner'
import ItemIncrementor from './components/ItemIncrementor'
import BulletInputRender from './components/BulletInputRender'
import DescriptionInputRender from './components/DescriptionInputRender'
import { FormButtons } from './components/FormButtons'
import styles from './Settings.module.scss'

const UpdateAbout = () => {
    const {
        about: { setAbout, bulletPoints, description }
    } = useContext(CmsContext)
    const { banner, setBanner } = useBanner()

    const [newDescription, setNewDescription] = useState('')
    const [showNewDescription, setShowNewDescription] = useState(false)
    const [newBullets, setBullets] = useState('')
    const [showNewBullets, setShowNewBullets] = useState(false)
    const [loading, setLoading] = useState(false)

    const resetForm = () => {
        setNewDescription(false)
        setShowNewBullets(false)
    }

    const [updateAboutPage] = useMutation(EDIT_ABOUT_PAGE, {
        onCompleted(data) {
            setBanner.show({
                message: 'About details updated successfully',
                type: 'success'
            })
            setLoading(false)
            setAbout({
                description: data.editAbout.description,
                bulletPoints: data.editAbout.bulletPoints
            })
            setShowNewDescription(false)
            setNewDescription('')
            setShowNewBullets(false)
            setBullets('')
        },
        onError(err) {
            setBanner.show({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue trying to update the new About Page info. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
            setLoading(false)
        }
    })

    const handleDescriptionChange = ({ target: { name, value } }, type) => {
        if (type === 'old') {
            const currentIndex = name.split('-')[1]
            const updatedDescription = [...description]
            updatedDescription[currentIndex] = value
            setAbout({ description: updatedDescription, bulletPoints })
        } else {
            setNewDescription(value)
        }
    }

    const handleBulletInputChange = ({ target: { name, value } }, type) => {
        if (type === 'old') {
            const currentIndex = name.split('-')[1]
            const updatedBullets = [...bulletPoints]
            updatedBullets[currentIndex] = value
            setAbout({ description, bulletPoints: updatedBullets })
        } else {
            setBullets(value)
        }
    }

    const handleBulletCountChange = direction => {
        if (direction === 'up') {
            setShowNewBullets(true)
        } else {
            if (showNewBullets) {
                setShowNewBullets(false)
            }
        }
    }

    const handleDescriptionCountChange = direction => {
        if (direction === 'up') {
            setShowNewDescription(true)
        } else {
            if (showNewDescription) {
                setShowNewDescription(false)
            }
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        try {
            let descriptionToSubmit = description
            if (showNewDescription) {
                descriptionToSubmit = [...description, newDescription]
            }

            let bulletPointsToSubmit = bulletPoints
            if (showNewBullets) {
                bulletPointsToSubmit = [...bulletPoints, newBullets]
            }
            updateAboutPage({
                variables: {
                    description: descriptionToSubmit,
                    bulletPoints: bulletPointsToSubmit
                }
            })
        } catch (error) {
            setBanner.show({
                message:
                    'There was an issue trying to upload your image. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
            setLoading(false)
        }
    }

    return (
        <section className={styles.UpdateAbout}>
            <p>Update the main message and bullet points here, then submit.</p>
            <div>
                <form onSubmit={onSubmit}>
                    <div className={styles.formContent}>
                        <div className={styles.description}>
                            <div>
                                A description to display on the About Us page,
                                can be as short or long as you want. Need to add
                                multiple paragraphs? <br />
                                <span className={styles.incrementWrapper}>
                                    You have{' '}
                                    <ItemIncrementor
                                        value={
                                            showNewDescription
                                                ? description.length + 1
                                                : description.length
                                        }
                                        disableIncrease={showNewDescription}
                                        disableDecrease={
                                            description.length === 0
                                        }
                                        handleIncrease={() =>
                                            handleDescriptionCountChange('up')
                                        }
                                        handleDecrease={() => {
                                            handleDescriptionCountChange('down')
                                        }}
                                    />{' '}
                                    paragraphs.
                                </span>
                            </div>
                            <DescriptionInputRender
                                showNewDescription={showNewDescription}
                                savedDescriptions={description}
                                newDescription={newDescription}
                                handleChange={handleDescriptionChange}
                            />
                        </div>
                        <div className={styles.bullets}>
                            <div>
                                Need to add more bullets? <br />
                                <span className={styles.incrementWrapper}>
                                    You have{' '}
                                    <ItemIncrementor
                                        savedValue={bulletPoints.length}
                                        value={
                                            showNewBullets
                                                ? bulletPoints.length + 1
                                                : bulletPoints.length
                                        }
                                        handleIncrease={() =>
                                            handleBulletCountChange('up')
                                        }
                                        handleDecrease={() =>
                                            handleBulletCountChange('down')
                                        }
                                        disableDecrease={
                                            bulletPoints.length === 0
                                        }
                                    />
                                    bullets.
                                </span>
                            </div>
                            <BulletInputRender
                                showNewBullets={showNewBullets}
                                newBullets={newBullets}
                                savedBullets={bulletPoints}
                                handleChange={handleBulletInputChange}
                            />
                        </div>
                    </div>
                    <FormButtons
                        disabled={loading}
                        loading={loading}
                        onResetClick={resetForm}
                    />
                    <Banner
                        banner={banner}
                        handleCloseSnackbar={() => setBanner.hide()}
                    />
                </form>
            </div>
        </section>
    )
}

export default UpdateAbout
