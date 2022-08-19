/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react'
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import { Delete } from '@mui/icons-material'

import SkeletonWrapper from '../../skeleton'
import styles from './SettingsComponents.module.scss'

const ImageDisplayBlock = ({ images, onRemove }) => {
    const ref = useRef(null)
    if (!images || images.length === 0) {
        return <SkeletonWrapper />
    }

    return (
        <ImageList
            cols={3}
            className={styles.ImageDisplayBlock}
            style={{ height: ref?.current?.getBoundingClientRect().height }}>
            {images.map((image, index) => {
                return (
                    <ImageListItem
                        ref={index === 0 ? ref : null}
                        className={styles.imageListItem}
                        key={index}>
                        <img src={image.url} alt="img" />
                        <ImageListItemBar
                            actionIcon={
                                <Delete
                                    className={styles.delete}
                                    onClick={() => onRemove(image.id)}
                                />
                            }
                        />
                    </ImageListItem>
                )
            })}
        </ImageList>
    )
}

export default ImageDisplayBlock
