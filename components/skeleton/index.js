import React from 'react'
import { Skeleton } from '@mui/material'

import { skeleton, topRow } from './skeleton.module.scss'

const SkeletonWrapper = () => {
    return (
        <div className={skeleton}>
            <div className={topRow}>
                <Skeleton variant="text" width="50%" height="3rem" />
                <Skeleton variant="text" width="50%" height="3rem" />
            </div>
            <Skeleton variant="text" height="3rem" />
            <Skeleton variant="rectangular" height="6rem" />
        </div>
    )
}

export default SkeletonWrapper
