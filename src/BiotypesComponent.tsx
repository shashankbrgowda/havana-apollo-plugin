/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react'
import { observer } from 'mobx-react'
import {
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

import { Biotype, biotypes, BiotypeSubtype } from './Biotypes'

export const BiotypesComponent = observer(function BiotypesComponent(props: {
  feature: any
}) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null)
  const [submenuAnchor, setSubmenuAnchor] = useState<null | HTMLElement>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handleMainMenuClick = () => {
    setAnchorEl(buttonRef.current)
  }

  const handleMainMenuClose = () => {
    setAnchorEl(null)
    setOpenSubmenuIndex(null)
    setSubmenuAnchor(null)
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    item: Biotype,
    index: number,
  ) => {
    if (item.subtypes.length > 0) {
      setOpenSubmenuIndex(index)
      setSubmenuAnchor(event.currentTarget)
    } else {
      setSelectedItem(item.display_name)
      handleMainMenuClose()
    }
  }

  const handleSubmenuItemClick = (item: BiotypeSubtype) => {
    setSelectedItem(item.display_name)
    setOpenSubmenuIndex(null)
    handleMainMenuClose()
  }

  let biotype
  if (props.feature) {
    biotype = props.feature.attributes?.get('biotype')[0]
  }

  return (
    <div>
      <Table
        size="small"
        sx={{ fontSize: '0.75rem', '& .MuiTableCell-root': { padding: '4px' } }}
        style={{ backgroundColor: 'rgb(0 0 0 / 12%)', marginTop: '10px' }}
      >
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', paddingLeft: '10px' }}>
              Biotype
            </TableCell>
            <TableCell>{selectedItem ? selectedItem : biotype}</TableCell>
            <TableCell style={{ textAlign: 'right' }}>
              <IconButton ref={buttonRef} onClick={handleMainMenuClick}>
                <ModeEditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMainMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {biotypes.map((item, index) => (
          <div key={index}>
            <MenuItem
              onClick={event => handleMenuItemClick(event, item, index)}
            >
              <ListItemText>{item.display_name}</ListItemText>
              {item.subtypes.length > 0 && (
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
              )}
            </MenuItem>

            {item.subtypes && openSubmenuIndex === index && (
              <Menu
                anchorEl={submenuAnchor}
                open={true}
                onClose={() => setOpenSubmenuIndex(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {item.subtypes.map((child: BiotypeSubtype, i: number) => (
                  <MenuItem
                    key={i}
                    onClick={() => handleSubmenuItemClick(child)}
                  >
                    {child.display_name}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </div>
        ))}
      </Menu>
    </div>
  )
})
