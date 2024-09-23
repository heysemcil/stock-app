import { Box, Button, Modal, Stack, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style'
import { Field, Form, Formik } from 'formik'
import { uiActions } from '../../store/ui'

import { createFirm, editFirm } from '../../store/firms'

export default function FirmModal({open, closeModal, edit}) {

    const dispatch = useDispatch()
    const modalData = useSelector(state=> state.ui.modalData)
    const initialValues = edit? modalData:({name:"", image:"", address:"", phone:""})


    const handleSubmit = (values, actions)=>{
        actions.setSubmitting(false)
        if(edit) dispatch(editFirm(values))
        else dispatch(createFirm(values))
        actions.resetForm();
        closeModal()
    }

    const handleClose = ()=>{
        dispatch(uiActions.setModalData({}))
        closeModal()
    }


  return (

    <Modal open={open} >
        <Box sx={style}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <Field 
                    as={TextField}
                    type="text"
                    name="name"
                    variant="outlined"
                    label="Firm Name"
                    required
                    fullWidth
                    sx={{mb:2}}
                    />
                    <Field 
                    as={TextField}
                    type="text"
                    name="image"
                    variant="outlined"
                    label="Firm Image"
                    required
                    fullWidth
                    sx={{mb:2}}
                    />
                    <Field 
                    as={TextField}
                    type="text"
                    name="phone"
                    variant="outlined"
                    label="Phone Number"
                    required
                    fullWidth
                    sx={{mb:2}}
                    />
                    <Field 
                    as={TextField}
                    type="text"
                    name="address"
                    variant="outlined"
                    label="Firm Address"
                    required
                    fullWidth
                    sx={{mb:2}}
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button type='submit' variant="contained" size='large'>
                            {edit? "Update Firm":"Add new Firm"}
                        </Button>
                        <Button variant="contained" size='large' color="error" onClick={handleClose}> Cancel</Button>
                    </Stack>
                </Form>
            </Formik>

        </Box>
    </Modal>
  )
}

