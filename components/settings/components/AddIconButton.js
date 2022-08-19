import React from 'react'
import { IconButton } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

import styles from './SettingsComponents.module.scss'

const AddIconButton = ({ handleIncrease, disabled }) => {
    return (
        <IconButton
            disabled={disabled}
            className={styles.plus}
            onClick={handleIncrease}>
            <AddCircle />
        </IconButton>
    )
}

export default AddIconButton
