import React from 'react'
import { TextField } from '@mui/material'
import { BulletInputs } from './SettingsComponents.module.scss'

const BulletInputRender = ({
    savedBullets,
    newBullets,
    showNewBullets,
    handleChange
}) => {
    return (
        <div className={BulletInputs}>
            {savedBullets?.length
                ? savedBullets.map((bullet, idx) => {
                      return (
                          <TextField
                              key={`bullet-${idx}`}
                              value={bullet}
                              onChange={e => handleChange(e, 'old')}
                              name={`bullet-${idx}`}
                              size="small"
                              variant="outlined"
                          />
                      )
                  })
                : null}
            {showNewBullets ? (
                <TextField
                    value={newBullets}
                    onChange={e => handleChange(e, 'new')}
                    name="bullet"
                    size="small"
                    variant="outlined"
                />
            ) : null}
        </div>
    )
}

export default BulletInputRender
