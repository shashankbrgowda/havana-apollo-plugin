/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import { observer } from 'mobx-react'
import {
  ListItemText,
  List,
  ListItem,
  Typography,
  IconButton,
  TextField,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Button,
} from '@mui/material'

import { makeStyles } from 'tss-react/mui'

import AddBoxIcon from '@mui/icons-material/AddBox'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import InfoIcon from '@mui/icons-material/Info'

import {
  ControlledAttribute,
  geneControlledAttributes,
  transcriptControlledAttributes,
} from './ControlledAttributes'
import { getSnapshot } from 'mobx-state-tree'
import { AbstractSessionModel } from '@jbrowse/core/util'

const useStyles = makeStyles()(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      borderRadius: 4,
    },
  },
  textarea: {
    resize: 'vertical',
  },
}))

export function getFeatureName(feature: any) {
  const keys = ['name', 'gene_name', 'gff_name']
  for (const key of keys) {
    const value = feature?.attributes?.get(key)
    if (value?.[0]) return value[0]
  }
  return ''
}

export function getFeatureId(feature: any) {
  const keys = ['id', 'gff_id', 'gene_id', 'stable_id', 'gene_stable_id']
  for (const key of keys) {
    const value = feature?.attributes?.get(key)
    if (value?.[0]) return value[0]
  }
  return ''
}

export const HavanaAttributesComponent = observer(
  function HavanaAttributesComponent(props: {
    feature: any
    session: any
    assembly: string
    FeatureAttributeChange: any
  }) {
    const transcriptButtonRef = useRef<HTMLButtonElement | null>(null)
    const [transcriptAnchorEl, setTranscriptAnchorEl] =
      useState<null | HTMLElement>(null)
    const [transcriptOpenSubmenuIndex, setTranscriptOpenSubmenuIndex] =
      useState<number | null>(null)
    const [transcriptSubmenuAnchor, setTranscriptSubmenuAnchor] =
      useState<null | HTMLElement>(null)
    const [
      transcriptControlledRemarkState,
      setTranscriptControlledRemarkState,
    ] = useState<string[]>([])
    const [transcriptRemarkState, setTranscriptRemarkState] =
      useState<string>('')

    const geneButtonRef = useRef<HTMLButtonElement | null>(null)
    const [geneAnchorEl, setGeneAnchorEl] = useState<null | HTMLElement>(null)
    const [geneOpenSubmenuIndex, setGeneOpenSubmenuIndex] = useState<
      number | null
    >(null)
    const [geneSubmenuAnchor, setGeneSubmenuAnchor] =
      useState<null | HTMLElement>(null)
    const [geneControlledRemarkState, setGeneControlledRemarkState] = useState<
      string[]
    >([])
    const [geneRemarkState, setGeneRemarkState] = useState<string>('')

    const { feature, session, FeatureAttributeChange } = props
    const { notify } = session as unknown as AbstractSessionModel
    const { changeManager } = session.apolloDataStore
    const { parent } = feature

    useEffect(() => {
      let transcriptControlledRemarks: string[]
      let transcriptRemark: string

      if (feature?.attributes?.get('controlled_remarks')) {
        transcriptControlledRemarks =
          feature.attributes?.get('controlled_remarks')
      } else {
        transcriptControlledRemarks = []
      }

      if (feature?.attributes?.get('remark')) {
        transcriptRemark = feature.attributes?.get('remark')[0]
      } else {
        transcriptRemark = ''
      }

      setTranscriptRemarkState(transcriptRemark)
      setTranscriptControlledRemarkState(transcriptControlledRemarks)

      let geneControlledRemarks: string[]
      let geneRemark: string

      if (parent?.attributes?.get('controlled_remarks')) {
        geneControlledRemarks = parent.attributes?.get('controlled_remarks')
      } else {
        geneControlledRemarks = []
      }
      if (parent?.attributes?.get('remark')) {
        geneRemark = parent.attributes?.get('remark')[0]
      } else {
        geneRemark = ''
      }
      setGeneRemarkState(geneRemark)
      setGeneControlledRemarkState(geneControlledRemarks)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feature])

    const handleTranscriptMainMenuClick = () => {
      setTranscriptAnchorEl(transcriptButtonRef.current)
    }

    const handleGeneMainMenuClick = () => {
      setGeneAnchorEl(geneButtonRef.current)
    }

    const saveControlledRemark = (controlledRemark: string[], feature: any) => {
      const { assemblyId, attributes } = feature
      let serializedAttributes: Record<string, string[]>
      const attrs = getSnapshot(attributes)
      if (attrs) {
        serializedAttributes = { ...attrs }
      } else {
        serializedAttributes = {}
      }
      const oldControlledRemark = serializedAttributes.controlled_remarks
      serializedAttributes.controlled_remarks = controlledRemark
      const featureAttributeChange = new FeatureAttributeChange({
        changedIds: [feature._id],
        typeName: 'FeatureAttributeChange',
        assembly: assemblyId,
        featureId: feature._id,
        attributes: serializedAttributes,
        attributeEdited: {
          old: {
            controlled_remarks: oldControlledRemark,
          },
          new: {
            controlled_remarks: controlledRemark,
          },
        },
      })
      changeManager
        .submit(featureAttributeChange)
        .then(() => {
          notify(
            `Controlled remark changes applied for ${feature.type}`,
            'success',
          )
        })
        .catch(() => {
          notify(
            `Error updating controlled remark for ${feature.type}`,
            'error',
          )
        })
    }

    const saveUserRemark = (remark: string, feature: any) => {
      const { assemblyId, attributes } = feature
      let serializedAttributes: Record<string, string[]>
      const attrs = getSnapshot(attributes)
      if (attrs) {
        serializedAttributes = { ...attrs }
      } else {
        serializedAttributes = {}
      }
      const oldRemark = serializedAttributes.remark
      serializedAttributes.remark = [remark]
      const featureAttributeChange = new FeatureAttributeChange({
        changedIds: [feature._id],
        typeName: 'FeatureAttributeChange',
        assembly: assemblyId,
        featureId: feature._id,
        attributes: serializedAttributes,
        attributeEdited: {
          old: {
            remark: oldRemark,
          },
          new: {
            remark: [remark],
          },
        },
      })
      changeManager
        .submit(featureAttributeChange)
        .then(() => {
          notify(`User remark changes applied for ${feature.type}`, 'success')
        })
        .catch(() => {
          notify(`Error updating user remark for ${feature.type}`, 'error')
        })
    }

    const updateTranscriptControlledRemark = (controlledRemark: string[]) => {
      setTranscriptControlledRemarkState(controlledRemark)
      saveControlledRemark(controlledRemark, feature)
    }

    const removeTranscriptControlledRemark = (remark: string) => {
      const newRemarks = transcriptControlledRemarkState.filter(
        (r: string) => r !== remark,
      )
      setTranscriptControlledRemarkState(newRemarks)
      saveControlledRemark(newRemarks, feature)
    }

    const saveTranscriptRemark = (value: string) => {
      saveUserRemark(value, feature)
    }

    const updateGeneControlledRemark = (controlledRemark: string[]) => {
      setGeneControlledRemarkState(controlledRemark)
      saveControlledRemark(controlledRemark, parent)
    }

    const removeGeneControlledRemark = (remark: string) => {
      const newRemarks = geneControlledRemarkState.filter(
        (r: string) => r !== remark,
      )
      setGeneControlledRemarkState(newRemarks)
      saveControlledRemark(newRemarks, parent)
    }

    const saveGeneRemark = (value: string) => {
      saveUserRemark(value, parent)
    }

    return (
      <div>
        <List style={{ padding: 0 }}>
          {/* TRANSCRIPT CONTROLLED REMARKS */}
          <ControlledRemarkComponent
            controlledRemark={transcriptControlledRemarkState}
            removeControlledRemark={removeTranscriptControlledRemark}
            handleMainMenuClick={handleTranscriptMainMenuClick}
            buttonRef={transcriptButtonRef}
          />
          {/* TRANSCRIPT REMARK */}
          <RemarkComponent
            remark={transcriptRemarkState}
            updateRemarkState={setTranscriptRemarkState}
            saveRemark={saveTranscriptRemark}
          />
        </List>

        <Box display="flex" flexDirection="column" gap={1} marginTop={2}>
          <Paper variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
            <Typography style={{ fontWeight: 'bold' }} variant="body1">
              Gene
            </Typography>
            {/* GENE BASIC INFO */}
            <TableContainer component={Box} style={{ marginTop: 4 }}>
              <Table
                size="small"
                sx={{
                  '& .MuiTableCell-root': { padding: '2px' },
                }}
              >
                <TableBody>
                  {getFeatureName(parent) !== '' && (
                    <TableRow style={{ borderTop: '1px solid #e0e0e0' }}>
                      <TableCell>
                        <small style={{ fontWeight: 'bold' }}>Name</small>
                      </TableCell>
                      <TableCell>
                        <small>{getFeatureName(parent)}</small>
                      </TableCell>
                    </TableRow>
                  )}
                  {getFeatureId(parent) !== '' && (
                    <TableRow>
                      <TableCell>
                        <small style={{ fontWeight: 'bold' }}>ID</small>
                      </TableCell>
                      <TableCell>
                        <small>{getFeatureId(parent)}</small>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <List style={{ padding: 0 }}>
              {/* GENE CONTROLLED REMARKS */}
              <ControlledRemarkComponent
                controlledRemark={geneControlledRemarkState}
                removeControlledRemark={removeGeneControlledRemark}
                handleMainMenuClick={handleGeneMainMenuClick}
                buttonRef={geneButtonRef}
              />
              {/* GENE REMARK */}
              <RemarkComponent
                remark={geneRemarkState}
                updateRemarkState={setGeneRemarkState}
                saveRemark={saveGeneRemark}
              />
            </List>
          </Paper>
        </Box>

        <ControlledAttributesMenuComponent
          controlledAttributes={transcriptControlledAttributes}
          anchorEl={transcriptAnchorEl}
          submenuAnchor={transcriptSubmenuAnchor}
          openSubmenuIndex={transcriptOpenSubmenuIndex}
          updateAnchorEl={setTranscriptAnchorEl}
          updateOpenSubmenuIndex={setTranscriptOpenSubmenuIndex}
          updateSubmenuAnchor={setTranscriptSubmenuAnchor}
          controlledRemark={transcriptControlledRemarkState}
          updateControlledRemark={updateTranscriptControlledRemark}
        />

        <ControlledAttributesMenuComponent
          controlledAttributes={geneControlledAttributes}
          anchorEl={geneAnchorEl}
          submenuAnchor={geneSubmenuAnchor}
          openSubmenuIndex={geneOpenSubmenuIndex}
          updateAnchorEl={setGeneAnchorEl}
          updateOpenSubmenuIndex={setGeneOpenSubmenuIndex}
          updateSubmenuAnchor={setGeneSubmenuAnchor}
          controlledRemark={geneControlledRemarkState}
          updateControlledRemark={updateGeneControlledRemark}
        />
      </div>
    )
  },
)

const RemarkComponent = observer(function RemarkComponent(props: {
  remark: string
  updateRemarkState: (value: string) => void
  saveRemark: (value: string) => void
}) {
  const { remark, updateRemarkState, saveRemark } = props
  const { classes } = useStyles()

  return (
    <ListItem
      alignItems="flex-start"
      style={{ backgroundColor: 'rgb(0 0 0 / 12%)', marginTop: 5 }}
    >
      <ListItemText
        primary={
          <Box display="flex" alignItems="center">
            <Typography style={{ fontWeight: 'bold' }} variant="body2">
              Remark
            </Typography>
            <Tooltip title="Not exported to GFF3 file (Internal use only)">
              <InfoIcon sx={{ ml: 1, fontSize: 15 }} />
            </Tooltip>
          </Box>
        }
        secondary={
          <div className={classes.root}>
            <TextField
              id="outlined-textarea"
              placeholder="Enter annotation remark"
              multiline
              variant="outlined"
              inputProps={{ className: classes.textarea }}
              style={{ backgroundColor: 'white' }}
              value={remark}
              onChange={event => updateRemarkState(event.target.value)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => saveRemark(remark)}
              style={{ marginTop: 5, float: 'right' }}
              size="small"
            >
              Update
            </Button>
          </div>
        }
      />
    </ListItem>
  )
})

const ControlledRemarkComponent = observer(
  function ControlledRemarkComponent(props: {
    controlledRemark: string[]
    removeControlledRemark: (remark: string) => void
    handleMainMenuClick: () => void
    buttonRef: React.RefObject<HTMLButtonElement>
  }) {
    const {
      controlledRemark,
      removeControlledRemark,
      buttonRef,
      handleMainMenuClick,
    } = props

    return (
      <ListItem
        alignItems="flex-start"
        style={{ backgroundColor: 'rgb(0 0 0 / 12%)', marginTop: 5 }}
        secondaryAction={
          <IconButton ref={buttonRef} onClick={handleMainMenuClick}>
            <AddBoxIcon color="primary" />
          </IconButton>
        }
      >
        <ListItemText
          primary={
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: 'bold' }} variant="body2">
                Controlled Remark
              </Typography>
              <Tooltip title="Exported to GFF3 file">
                <InfoIcon sx={{ ml: 1, fontSize: 15 }} />
              </Tooltip>
            </Box>
          }
          secondary={
            <div>
              {controlledRemark?.map((remark: string, index: number) => (
                <Box
                  key={`${index}.${remark}`}
                  display="flex"
                  alignItems="center"
                  mb={0.5}
                >
                  <Typography variant="body2" color="textSecondary">
                    {remark}
                  </Typography>
                  <IconButton
                    onClick={() => removeControlledRemark(remark)}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <RemoveCircleOutlineIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              ))}
            </div>
          }
        />
      </ListItem>
    )
  },
)

const ControlledAttributesMenuComponent = observer(
  function ControlledAttributesMenuComponent(props: {
    anchorEl: HTMLElement | null
    submenuAnchor: HTMLElement | null
    openSubmenuIndex: number | null
    updateAnchorEl: (anchorEl: HTMLElement | null) => void
    updateOpenSubmenuIndex: (index: number | null) => void
    updateSubmenuAnchor: (anchorEl: HTMLElement | null) => void
    controlledAttributes: ControlledAttribute[]
    updateControlledRemark: (state: string[]) => void
    controlledRemark: string[]
  }) {
    const {
      anchorEl,
      submenuAnchor,
      openSubmenuIndex,
      updateAnchorEl,
      updateOpenSubmenuIndex,
      updateSubmenuAnchor,
      controlledAttributes,
      updateControlledRemark,
      controlledRemark,
    } = props

    const handleMainMenuClose = () => {
      updateAnchorEl(null)
      updateOpenSubmenuIndex(null)
      updateSubmenuAnchor(null)
    }

    const handleSubmenuItemClick = (item: string) => {
      for (const remark of controlledRemark) {
        if (remark === item) {
          return
        }
      }
      updateControlledRemark([...controlledRemark, item])
      updateSubmenuAnchor(null)
      handleMainMenuClose()
    }

    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLElement>,
      item: ControlledAttribute,
      index: number,
    ) => {
      if (item.children.length > 0) {
        updateOpenSubmenuIndex(index)
        updateSubmenuAnchor(event.currentTarget)
      } else {
        for (const remark of controlledRemark) {
          if (remark === item.label) {
            return
          }
        }
        updateControlledRemark([...controlledRemark, item.label])
        handleMainMenuClose()
      }
    }

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMainMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {controlledAttributes.map((item, index) => (
          <div key={index}>
            <MenuItem
              onClick={event => handleMenuItemClick(event, item, index)}
            >
              <ListItemText>{item.label}</ListItemText>
              {item.children.length > 0 && (
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
              )}
            </MenuItem>

            {item.children && openSubmenuIndex === index && (
              <Menu
                anchorEl={submenuAnchor}
                open={true}
                onClose={() => updateOpenSubmenuIndex(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {item.children.map((child, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => handleSubmenuItemClick(child.label)}
                  >
                    {child.label}
                  </MenuItem>
                ))}
              </Menu>
            )}
          </div>
        ))}
      </Menu>
    )
  },
)
