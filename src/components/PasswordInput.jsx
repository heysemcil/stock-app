import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Field } from 'formik'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function PasswordInput({label,name, errors, touched }) {


    const [showPassword, setShowPassword] = useState(false) 
  return (
    <Field
    as={TextField}
    variant="outlined"
    label={label}
    type={showPassword?"text":"password"}
    fullWidth
    name={name}
    margin="dense"
    error={
      Boolean(errors[name]) &&
      Boolean(touched[name])
    }
    helperText={
      Boolean(touched[name])
        ? errors[name]
        : ""
    }

    InputProps={{
        endAdornment:(
            <InputAdornment>
            <IconButton edge="end" onClick={()=> setShowPassword(!showPassword)}>
                {showPassword? <VisibilityOffIcon/>:<VisibilityIcon/>}
            </IconButton>
            </InputAdornment>
        )
    }}
  />
  )
}
