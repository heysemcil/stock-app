import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AuthImage from '../images/auth.svg';
import { Field, Form, Formik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../store/auth';

export default function Register() {
  const [showPassord, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  };
  const handleSubmit = (values, actions) => {
    // Prevent form submission
    actions.setSubmitting(false);
    // Dispatch a registeration
    console.log(values);
    const userInfo = { ...values, password2: values.password };
    dispatch(register(userInfo, navigate));
    // Reset Form
    actions.resetForm();
  };

  const registerSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Please provide a valid email')
      .required('Email is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    password: Yup.string()
      .min(8, 'Password minimum 8 characters')
      .max(12)
      .matches(/\d+/, 'Password should include at least 1 number')
      .matches(
        /[a-z]+/,
        'Password should include at least 1 lowercase character'
      )
      .matches(
        /[A-Z]+/,
        'Password should include at least 1 UPPERcase character'
      )
      .matches(
        /[!@{}<>%+-.]+/,
        'Password should includes at least 1 special character'
      )
      .required('Password is required'),
  });

  return (
    <Box sx={{ width: '100%', height: '100vh', bgcolor: '#052159' }}>
      <Typography variant="h2" color="white" component="h1" align="center">
        Stock Management App
      </Typography>
      <Grid container p={5} alignItems="center" justifyContent="center">
        <Grid item md={6} xl={8} display={{ xs: 'none', sm: 'block' }}>
          <img src={AuthImage} alt="register" style={{ maxHeight: '80vh' }} />
        </Grid>
        <Grid item xl={4} xs={12} md={6}>
          <Card sx={{ maxWidth: '100%', padding: '2rem' }}>
            <CardContent>
              <Typography variant="h3" align="center" mb={3}>
                Register
              </Typography>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={registerSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      as={TextField}
                      type="text"
                      name="username"
                      fullWidth
                      label="Username"
                      required
                      margin="dense"
                      error={
                        Boolean(errors.username) && Boolean(touched.username)
                      }
                      helperText={
                        Boolean(touched.username) ? errors.username : ''
                      }
                    />
                    <Field
                      as={TextField}
                      type="email"
                      name="email"
                      fullWidth
                      label="Email"
                      required
                      margin="dense"
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={Boolean(touched.email) ? errors.email : ''}
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="first_name"
                      fullWidth
                      label="First Name"
                      required
                      margin="dense"
                      error={
                        Boolean(errors.first_name) &&
                        Boolean(touched.first_name)
                      }
                      helperText={
                        Boolean(touched.first_name) ? errors.first_name : ''
                      }
                    />
                    <Field
                      as={TextField}
                      type="text"
                      name="last_name"
                      fullWidth
                      label="Last Name"
                      required
                      margin="dense"
                      error={
                        Boolean(errors.last_name) && Boolean(touched.last_name)
                      }
                      helperText={
                        Boolean(touched.last_name) ? errors.last_name : ''
                      }
                    />
                    <Field
                      as={TextField}
                      type={showPassord ? 'text' : 'password'}
                      name="password"
                      fullWidth
                      label="Password"
                      required
                      margin="dense"
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                      helperText={
                        Boolean(touched.password) ? errors.password : ''
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ pr: 2 }}>
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword(!showPassord)}
                            >
                              {showPassord ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Stack justifyContent="center" alignItems="center" mt={2}>
                      <Button variant="contained" type="submit" size="large">
                        Register
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
              <Typography
                variant="subtitle2"
                align="center"
                component="div"
                sx={{ cursor: 'pointer', mt: 1, color: 'goldenrod' }}
                onClick={() => navigate('/')}
              >
                Have an account?
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
