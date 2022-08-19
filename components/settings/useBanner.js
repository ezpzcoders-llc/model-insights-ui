import { useState } from 'react'

export const useBanner = () => {
    const INITIAL_STATE = { message: null, type: null, visible: false }
    const [banner, setBannerState] = useState(INITIAL_STATE)

    const showBanner = data => setBannerState({ ...data, visible: true })
    const hideBanner = () => {
        setBannerState(INITIAL_STATE)
    }

    const handlers = {
        on: data => setBannerState({ visible: true, ...data }),
        off: data => setBannerState(INITIAL_STATE),
        toggle: data => setBannerState(prev => ({ visible: !prev, ...data })),
        reset: () => setBannerState(INITIAL_STATE)
    }

    const methods = {
        show: data => setBannerState({ ...data, visible: true }),
        hide: () => setBannerState(INITIAL_STATE)
    }

    return {
        banner,
        bannerHandlers: handlers,
        setBanner: methods,
        showBanner,
        hideBanner
    }
}
