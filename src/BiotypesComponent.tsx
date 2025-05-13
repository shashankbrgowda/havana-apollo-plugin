/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
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

import { AbstractSessionModel } from '@jbrowse/core/util'
import { getSnapshot } from 'mobx-state-tree'

import ObjectID from 'bson-objectid'

import { Biotype, biotypes, BiotypeSubtype } from './Biotypes'

export interface TranscriptPartLocation {
  min: number
  max: number
}

export interface TranscriptPartNonCoding extends TranscriptPartLocation {
  type: 'fivePrimeUTR' | 'threePrimeUTR' | 'intron' | 'exon'
}

export interface TranscriptPartCoding extends TranscriptPartLocation {
  type: 'CDS'
  phase: 0 | 1 | 2
}

export type TranscriptPart = TranscriptPartCoding | TranscriptPartNonCoding

type TranscriptParts = TranscriptPart[]

export const BiotypesComponent = observer(function BiotypesComponent(props: {
  feature: any
  session: any
  assembly: string
  TypeChange: any
  DeleteFeatureChange: any
  AddFeatureChange: any
  FeatureAttributeChange: any
}) {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null)
  const [submenuAnchor, setSubmenuAnchor] = useState<null | HTMLElement>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const {
    feature,
    session,
    TypeChange,
    DeleteFeatureChange,
    AddFeatureChange,
    FeatureAttributeChange,
  } = props

  useEffect(() => {
    setSelectedItem(null)
    setOpenSubmenuIndex(null)
    setSubmenuAnchor(null)
    setAnchorEl(null)
  }, [feature])

  const { notify } = session as unknown as AbstractSessionModel
  const { changeManager } = session.apolloDataStore

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
      void handleBiotypeChange(item.display_name, item.so_term)
    }
  }

  const handleSubmenuItemClick = (item: BiotypeSubtype) => {
    setSelectedItem(item.display_name)
    setOpenSubmenuIndex(null)
    handleMainMenuClose()
    void handleBiotypeChange(item.display_name, item.so_term)
  }

  let biotype: string | undefined
  if (feature?.attributes?.get('biotype')) {
    biotype = feature.attributes?.get('biotype')[0]
  }

  const handleBiotypeChange = async (
    new_biotype: string,
    so_term: string | undefined,
  ) => {
    if (!so_term) {
      return
    }

    if (biotype === new_biotype) {
      return
    }

    const {
      _id: featureId,
      assemblyId,
      type,
      transcriptExonParts,
      attributes,
      cdsLocations,
    } = feature

    const exonParts = (transcriptExonParts as TranscriptParts)
      .filter(part => part.type === 'exon')
      .sort(({ min: a }, { min: b }) => a - b)

    const exonMin: number = exonParts[0]?.min
    const exonMax: number = exonParts[exonParts.length - 1]?.max

    if (!exonMin || !exonMax) {
      return
    }

    // Update the biotype in attributes
    let serializedAttributes: Record<string, string[]>
    const attrs = getSnapshot(attributes)
    if (attrs) {
      serializedAttributes = { ...attrs }
    } else {
      serializedAttributes = {}
    }
    serializedAttributes.biotype = [new_biotype]
    delete serializedAttributes._id

    const featureAttributeChange = new FeatureAttributeChange({
      changedIds: [feature._id],
      typeName: 'FeatureAttributeChange',
      assembly: assemblyId,
      featureId: feature._id,
      attributes: serializedAttributes,
    })
    await changeManager.submit(featureAttributeChange)

    // First update the feature type
    const typeChange = new TypeChange({
      typeName: 'TypeChange',
      changedIds: [featureId],
      featureId,
      oldType: type,
      newType: so_term,
      assembly: assemblyId,
    })
    await changeManager.submit(typeChange)

    // If the feature type is transcript then delete the CDS
    if (so_term === 'transcript') {
      for (const [, child] of feature.children ?? []) {
        if (child.type === 'CDS') {
          const change = new DeleteFeatureChange({
            changedIds: [child._id],
            typeName: 'DeleteFeatureChange',
            assembly: assemblyId,
            deletedFeature: getSnapshot(child),
            parentFeatureId: child.parent._id,
          })
          await changeManager.submit(change)
        }
      }
    }

    // If the feature type is mRNA then create the CDS using exon boundaries
    if (so_term === 'mRNA') {
      // If CDS already exists, do not create a new one when the biotype is changed to mRNA type
      if (cdsLocations?.[0]?.length > 0) {
        return
      }
      const change = new AddFeatureChange({
        changedIds: [feature._id],
        typeName: 'AddFeatureChange',
        assembly: assemblyId,
        addedFeature: {
          _id: new ObjectID().toHexString(),
          refSeq: feature.refSeq,
          min: Number(exonMin),
          max: Number(exonMax),
          type: 'CDS',
          strand: feature.strand,
        },
        parentFeatureId: feature._id,
      })
      await changeManager.submit(change)
    }

    notify('Feature biotype updated successfully', 'success')
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
              disabled={!item.active}
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
                    disabled={!item.active}
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
