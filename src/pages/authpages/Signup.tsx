import { useUser } from "../../context/user/UserProvider";
import Grid from "@mui/material/Grid";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button, FormHelperText, TextField, Typography } from "@mui/material";

const Signup = () => {
  const { admin, handleLogin }: any = useUser();
  console.log({ admin });
  const initialValues = { email: "", password: "" };

  const validate = (values: any) => {
    const errors = {} as any;
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const submit = async (values: any, setSubmitting: boolean | any) => {
    handleLogin({ ...values });
    setSubmitting(false);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height={"100vh"}
    >
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }) =>
          submit({ ...values }, setSubmitting)
        }
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Typography variant="h4">Admin Signup </Typography>
            <Grid item xs={4} md={12}>
              <Field
                type="email"
                name="email"
                as={TextField}
                variant="standard"
                label="Email"
                required
                id="email"
              />
              {errors && touched && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <Field
                id="password"
                as={TextField}
                label="Password"
                variant="standard"
                name="password"
                type="password"
                required
              />
              {errors && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} md={12} sx={{ m: 5 }}>
              <Button type="submit" disabled={isSubmitting} variant="contained">
                Signup
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default Signup;
