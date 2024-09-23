import { Box, Button, Card, CardContent, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import AuthImage from '../images/auth.svg';
import { Field, Form, Formik } from "formik";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/auth";


export default function Login() {

const [showPassord, setShowPassword] = useState(false)
const navigate = useNavigate()
const dispatch = useDispatch()
  const initialValues = { email:"", password:""}
  const handleSubmit = (values, actions)=>{
    // Prevent form submission 
    actions.setSubmitting(false);
    // Dispatch a registeration
    dispatch(login(values, navigate))
    // Reset Form
    actions.resetForm();
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Please provide a valid email').required('Email is required'),
    password:Yup.string().min(8, 'Password minimum 8 characters').max(12)
    .matches(/\d+/, 'Password should include at least 1 number')
    .matches(/[a-z]+/, 'Password should include at least 1 lowercase character')
    .matches(/[A-Z]+/, 'Password should include at least 1 UPPERcase character')
    .matches(/[!@{}<>%+-.]+/, 'Password should includes at least 1 special character')
    .required('Password is required')
  })

  return (

    <Box sx={{width:'100%', height:'100vh', bgcolor:'#052159'}}>
      <Typography variant="h2" color="white" component="h1" align="center">
        Stock Management App
        </Typography>
        <Grid container p={5} alignItems="center" justifyContent="center">
          <Grid item md={6} xl={8} display={{xs:"none", sm:"block"}}>
            <img src={AuthImage} alt="register" style={{maxHeight:'80vh'}}/>
          </Grid>
          <Grid item xl={4} xs={12} md={6}>
            <Card sx={{maxWidth:'100%', padding:'2rem'}}>
              <CardContent>
                <Typography variant="h3" align="center" mb={3}>
                  Login
                  </Typography>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={loginSchema}
                  >
                    {({errors, touched})=>(
                      <Form>
                       
                        <Field 
                          as={TextField} 
                          type="email" 
                          name="email" 
                          fullWidth
                          label="Email"
                          required
                          margin="dense"
                          error={Boolean(errors.email)&&Boolean(touched.email)}
                          helperText={Boolean(touched.email)?errors.email:""}
                          />
                       
                    
                        <Field 
                          as={TextField} 
                          type={showPassord?"text":"password"} 
                          name="password" 
                          fullWidth
                          label="Password"
                          required
                          margin="dense"
                          error={Boolean(errors.password)&&Boolean(touched.password)}
                          helperText={Boolean(touched.password)?errors.password:""}
                          InputProps= {{
                            endAdornment:
                            <InputAdornment position="end" sx={{pr:2}}>
                              <IconButton edge="end" onClick={()=>setShowPassword(!showPassord)}>
                                {showPassord? <VisibilityOffIcon/> :<VisibilityIcon/>}
                              </IconButton>
                            </InputAdornment>
                          }}
                          />

                          <Stack justifyContent="center" alignItems="center" mt={2}>
                            <Button variant="contained" type="submit" size="large">Login</Button>
                          </Stack>
                      </Form>
                    )}
                  </Formik>
                  <Typography variant="subtitle2" align="center" component="div" sx={{cursor:'pointer' , mt:1, color: 'goldenrod'}}
                  onClick={()=> navigate('/register')}
                  >
                    Don't have an account? 
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </Box>
  )
}
