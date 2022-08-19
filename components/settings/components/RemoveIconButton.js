import React from 'react'
import { IconButton } from '@mui/material'
import { RemoveCircle } from '@mui/icons-material'

import styles from './SettingsComponents.module.scss'

const RemoveIconButton = ({ handleDecrease, disabled }) => {
    return (
        <IconButton
            disabled={disabled}
            className={styles.minus}
            onClick={handleDecrease}>
            <RemoveCircle />
        </IconButton>
    )
}

export default RemoveIconButton
