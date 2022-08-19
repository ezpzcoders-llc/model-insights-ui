import React from 'react'

import { CmsContextWrapper } from '../context/cms'
import Page from '../components/layout/Page'
import Home from '../views/home'

const App = () => {
    return (
        <CmsContextWrapper>
            <Page>
                <Home />
            </Page>
        </CmsContextWrapper>
    )
}

export default App
