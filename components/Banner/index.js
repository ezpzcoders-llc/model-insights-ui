import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const Banner = ({ handleCloseSnackbar, banner }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            open={banner.visible}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}>
            <Alert
                severity={banner?.type ? banner.type : 'success'}
                onClose={handleCloseSnackbar}>
                {banner?.message ?? ''}
            </Alert>
        </Snackbar>
    )
}

export default Banner
