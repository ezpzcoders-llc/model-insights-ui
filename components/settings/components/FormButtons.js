import React from 'react'
import { Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import styles from './SettingsComponents.module.scss'

export const FormButtons = ({ disabled, loading, onResetClick }) => {
    return (
        <div className={styles.FormButtons}>
            <LoadingButton
                disabled={disabled}
                loading={loading}
                type="submit"
                variant="contained"
                className={styles.submit}>
                SUBMIT
            </LoadingButton>
            <Button variant="outlined" color="error" onClick={onResetClick}>
                Reset
            </Button>
        </div>
    )
}

export const ButtonsRow = ({
    disabled = false,
    loading,
    onResetClick,
    onSubmit
}) => {
    return (
        <div className={styles.FormButtons}>
            <LoadingButton
                disabled={disabled}
                loading={loading}
                type="submit"
                variant="contained"
                onClick={onSubmit}
                className={styles.submit}>
                SUBMIT
            </LoadingButton>
            <Button
                disabled={disabled}
                variant="outlined"
                color="error"
                onClick={onResetClick}>
                Reset
            </Button>
        </div>
    )
}
