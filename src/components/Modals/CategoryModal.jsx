import { Box, Button, Modal, Stack, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style'
import { Field, Form, Formik } from 'formik'
import { uiActions } from '../../store/ui'
import { createCategory, editCategry } from '../../store/categories'

export default function CategoryModal({open, closeModal, edit}) {

    const dispatch = useDispatch()
    const modalData = useSelector(state=> state.ui.modalData)
    const initialValues = edit? modalData:({name:""})


    const handleSubmit = (values, actions)=>{
        actions.setSubmitting(false)
        if(edit) dispatch(editCategry(values))
        else dispatch(createCategory(values))
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
                    label="Category Name"
                    required
                    fullWidth
                    sx={{mb:2}}
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Button type='submit' variant="contained" size='large'>
                            {edit? "Update Category":"Add new Category"}
                        </Button>
                        <Button variant="contained" size='large' color="error" onClick={handleClose}> Cancel</Button>
                    </Stack>
                </Form>
            </Formik>

        </Box>
    </Modal>
  )
}

