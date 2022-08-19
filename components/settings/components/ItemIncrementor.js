import React from 'react'

import AddIconButton from './AddIconButton'
import RemoveIconButton from './RemoveIconButton'
import styles from './SettingsComponents.module.scss'

const ItemIncrementor = ({
    value,
    handleIncrease,
    handleDecrease,
    disableDecrease,
    disableIncrease
}) => {
    return (
        <div className={styles.ItemIncrementor}>
            <AddIconButton
                disabled={disableIncrease}
                handleIncrease={handleIncrease}
            />
            {value}
            <RemoveIconButton
                handleDecrease={handleDecrease}
                disabled={disableDecrease}
            />
        </div>
    )
}

export default ItemIncrementor
