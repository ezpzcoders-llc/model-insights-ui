import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useMutation } from '@apollo/client'

import Banner from '../../components/Banner'
import { useBanner } from './useBanner'
import { SEND_NEWSLETTER } from '../../graphql/mutations/newsletter'
import DescriptionInputRender from './components/DescriptionInputRender'
import ItemIncrementor from './components/ItemIncrementor'
import { FormButtons } from './components/FormButtons'
import styles from './Settings.module.scss'

const UpdateNewsLetter = () => {
    const { banner, setBanner } = useBanner()

    const [emailBody, setEmailBody] = useState([''])
    const [subjectLine, setSubjectLine] = useState('')
    const [loading, setLoading] = useState(false)

    const resetForm = () => {
        setEmailBody([''])
        setSubjectLine('')
    }

    const [sendNewsLetter] = useMutation(SEND_NEWSLETTER, {
        onCompleted() {
            setBanner.show({
                message: 'Newsletter sent successfully',
                type: 'success'
            })
            setLoading(false)
            resetForm()
        },
        onError(err) {
            setBanner.show({
                message:
                    err.graphQLErrors[0]?.message ??
                    'There was an issue attempting to send your newsletter out. Please try again or reach out to me for more assistance.',
                type: 'error'
            })
            setLoading(false)
        }
    })

    const onSubmitClick = e => {
        e.preventDefault()
        try {
            setLoading(true)
            sendNewsLetter({ variables: { emailBody, subjectLine } })
        } catch (error) {
            console.log(error)
        }
    }

    const handleCountChange = direction => {
        if (direction === 'up') {
            setEmailBody([...emailBody, ''])
        } else {
            if (emailBody.length === 1) return
            setEmailBody(emailBody.slice(0, -1))
        }
    }

    const handleEmailBodyChange = ({ target: { name, value } }) => {
        const currentIndex = name.split('-')[1]
        const updatedEmailBody = [...emailBody]
        updatedEmailBody[currentIndex] = value
        setEmailBody(updatedEmailBody)
    }

    const handleSubjectLineChange = ({ target: { value } }) =>
        setSubjectLine(value)

    let isSubmitDisabled = false
    if (loading || emailBody?.length <= 0 || !emailBody[0] || !subjectLine)
        isSubmitDisabled = true

    return (
        <section className={styles.NewsLetter}>
            <p>Create and send a newsletter to all users subscribed.</p>
            <div>
                <form onSubmit={onSubmitClick}>
                    <div className={styles.subjectLine}>
                        Set your newsletter subject line:
                        <TextField
                            name="subjectLine"
                            label="Summary"
                            size="small"
                            variant="outlined"
                            value={subjectLine}
                            onChange={handleSubjectLineChange}
                        />
                    </div>
                    <div className={styles.emailBody}>
                        Your newsletters description. Add as many paragraphs as{' '}
                        {"you'd"} like, minimum one required.
                        <br />
                        <span className={styles.incrementWrapper}>
                            You have{' '}
                            <ItemIncrementor
                                value={
                                    emailBody?.length <= 0
                                        ? emailBody.length + 1
                                        : emailBody.length
                                }
                                disableIncrease={
                                    emailBody[emailBody.length - 1] === ''
                                }
                                disableDecrease={
                                    emailBody[emailBody.length - 1] !== ''
                                }
                                handleIncrease={() => handleCountChange('up')}
                                handleDecrease={() => {
                                    handleCountChange('down')
                                }}
                            />{' '}
                            paragraphs.
                        </span>
                    </div>
                    <DescriptionInputRender
                        showNewDescription={false}
                        savedDescriptions={emailBody}
                        newDescription={null}
                        handleChange={handleEmailBodyChange}
                    />
                    <FormButtons
                        disabled={isSubmitDisabled}
                        loading={loading}
                        onResetClick={resetForm}
                    />
                </form>
            </div>
            <Banner
                banner={banner}
                handleCloseSnackbar={() => setBanner.hide()}
            />
        </section>
    )
}

export default UpdateNewsLetter
