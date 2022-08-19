import React from 'react'
import { TextField } from '@mui/material'
import { DescriptionInputs } from './SettingsComponents.module.scss'

const DescriptionInputRender = ({
    savedDescriptions,
    newDescription,
    handleChange,
    showNewDescription
}) => {
    return (
        <div className={DescriptionInputs}>
            {savedDescriptions?.length
                ? savedDescriptions.map((item, idx) => {
                      return (
                          <TextField
                              multiline
                              maxRows={6}
                              name={`description-${idx}`}
                              key={idx}
                              value={item}
                              onChange={e => handleChange(e, 'old')}
                          />
                      )
                  })
                : null}
            {showNewDescription ? (
                <TextField
                    multiline
                    maxRows={6}
                    name="description"
                    value={newDescription}
                    onChange={e => handleChange(e, 'new')}
                />
            ) : null}
        </div>
    )
}

export default DescriptionInputRender
