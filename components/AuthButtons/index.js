import { useContext } from 'react'
import { Settings, Logout, Close } from '@mui/icons-material'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'

import { AuthContext } from '../../context/auth'
import styles from './AuthButtons.module.scss'

const AuthButtons = ({ onSettingsClick }) => {
    const { logout } = useContext(AuthContext)
    return (
        <SpeedDial
            className={styles.AuthButtons}
            icon={<SpeedDialIcon openIcon={<Close />} />}
            ariaLabel="SpeedDial basic example">
            <SpeedDialAction
                className={styles.actionItem}
                tooltipTitle="Log Out"
                icon={<Logout />}
                onClick={logout}
            />
            <SpeedDialAction
                className={styles.actionItem}
                tooltipTitle="Settings"
                icon={<Settings />}
                onClick={onSettingsClick}
            />
        </SpeedDial>
    )
}

export default AuthButtons
