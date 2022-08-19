import React from 'react'
import { useRouter } from 'next/router'
import Logo from '/components/Logo'

import { sideNavBar } from './SideNavLogoOnly.module.scss'

const SideNavLogoOnly = () => {
    const router = useRouter()

    const onLogoClick = () => {
        router.push('/')
    }

    return (
        <nav className={sideNavBar}>
            <div onClick={onLogoClick}>
                <Logo origin="mobileHeader" />
            </div>
        </nav>
    )
}

export default SideNavLogoOnly
