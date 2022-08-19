/* eslint-disable @next/next/no-img-element */
import React from 'react'
// import logo from '../public/logos/simple.png'
import footerLogo from '../public/logos/complex.png'
import mobileHeaderLogo from '../public/logos/medium.png'

const Logo = ({ origin }) => {
    let logoSrc = mobileHeaderLogo.src

    if (origin === 'footer') logoSrc = footerLogo.src
    // if (origin === 'mobileHeader') logoSrc = mobileHeaderLogo.src

    return (
        <div className="logo">
            <img src={logoSrc} alt="logo" />
        </div>
    )
}

export default Logo
