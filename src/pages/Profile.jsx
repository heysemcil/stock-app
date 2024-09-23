import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import PasswordInput from "../components/PasswordInput";
import { changePassword } from "../store/auth";

export default function Profile() {
  const currentUser = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const first_name = sessionStorage.getItem("first_name");
  const last_name = sessionStorage.getItem("last_name");
  const dispatch = useDispatch()

  const initialValues = {
    old_password: "",
    new_password1: "",
    new_password2: "",
  };

  const handleSubmit = (values, actions) => {
    
    actions.setSubmitting(false);
    
    const {new_password1, new_password2} = values
    const newUser = {new_password1, new_password2}


    dispatch(changePassword(newUser))
    actions.resetForm();

  }
  ;

  const profileSchema = Yup.object().shape({
    old_password: Yup.string().required(),
    new_password1: Yup.string()
      .min(8, "Password minimum 8 characters")
      .max(12)
      .matches(/\d+/, "Password should include at least 1 number")
      .matches(
        /[a-z]+/,
        "Password should include at least 1 lowercase character",
      )
      .matches(
        /[A-Z]+/,
        "Password should include at least 1 uppercase character",
      )
      .matches(
        /[!,?{}<>#$%-.@]+/,
        "Password should include at least 1 special character",
      )
      .required("Password is required"),
    new_password2: Yup.string()
      .min(8, "Password minimum 8 characters")
      .max(12)
      .matches(/\d+/, "Password should include at least 1 number")
      .matches(
        /[a-z]+/,
        "Password should include at least 1 lowercase character",
      )
      .matches(
        /[A-Z]+/,
        "Password should include at least 1 uppercase character",
      )
      .matches(
        /[!,?{}<>#$%-.@]+/,
        "Password should include at least 1 special character",
      )
      .required("Password is required")
      .test("Password must match", function (value) {
        return this.parent.new_password1 === value;
      }),
  });
  return (
    <Box p={5}>
      <Typography variant="h5" component="h1" color="inherit" noWrap>
        Profile
      </Typography>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Avatar
                    src="/borken-image.jpg"
                    alt={currentUser.toUpperCase()}
                    variant="square"
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: 50,
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Username
                          </Typography>
                          <Typography variant="subtitle1">
                            {currentUser}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Email
                          </Typography>
                          <Typography variant="subtitle1">{email}</Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            First Name
                          </Typography>
                          <Typography variant="subtitle1">
                            {first_name}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" color="gray">
                            Last Name
                          </Typography>
                          <Typography variant="subtitle1">
                            {last_name}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Change Password</Typography>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={profileSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <PasswordInput
                        label="Old Password"
                        errors={errors}
                        touched={touched}
                        name="old_password"
                      />
                      <PasswordInput
                        label="New Password"
                        errors={errors}
                        touched={touched}
                        name="new_password1"
                      />
                      <PasswordInput
                        label="Confirm Password"
                        errors={errors}
                        touched={touched}
                        name="new_password2"
                      />

                      <Button
                        sx={{ mt: 2, width: "100%" }}
                        type="submit"
                        variant="contained"
                      >
                        {" "}
                        Change Password
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box m={3} mt={5}>
                  <Typography variant="body2" gutterBottom>
                    Password minimum 8 characters
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password should include at least 1 number
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password should include at least 1 lowercase character
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password should include at least 1 uppercase character
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Password should include at least 1 special character
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
