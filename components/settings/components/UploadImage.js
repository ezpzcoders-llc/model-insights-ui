import React, { forwardRef } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { FileUpload } from '@mui/icons-material'

import ImageDisplayBlock from './ImageDisplayBlock'
import styles from './SettingsComponents.module.scss'

const UploadImage = forwardRef(
    (
        { loading, onImageChange, carousel, multiple, onImageDelete, origin },
        ref
    ) => {
        const id = `${origin}-carousel-upload`
        return (
            <div className={styles.carouselUpload}>
                <ImageDisplayBlock images={carousel} onRemove={onImageDelete} />
                <input
                    ref={ref}
                    accept="image/*"
                    id={id}
                    multiple={multiple}
                    type="file"
                    onChange={onImageChange}
                />
                <label htmlFor={id}>
                    <Button
                        variant="contained"
                        startIcon={<FileUpload />}
                        loading={loading}
                        component="span">
                        UPLOAD
                    </Button>
                    {loading ? <CircularProgress size={24} /> : null}
                </label>
            </div>
        )
    }
)

UploadImage.displayName = 'UploadImage'
export default UploadImage
