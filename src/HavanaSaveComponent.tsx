/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { observer } from 'mobx-react'
import { Fab } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save'

export const HavanaSaveComponent = observer(
  function HavanaSaveComponent(props: { feature: any }) {
    const handleHavanaSave = () => {
      console.log('Saving Havana data...')
    }

    return (
      <Fab
        variant="extended"
        onClick={handleHavanaSave}
        color="primary"
        style={{ width: 150, position: 'fixed', bottom: 20, right: 20 }}
        disabled={true}
      >
        <SaveIcon sx={{ mr: 1 }} />
        Save to Havana
      </Fab>
    )
  },
)
