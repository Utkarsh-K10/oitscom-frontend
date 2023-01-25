import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormHelperText,
  FormControl,
  Grid,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useCategory } from "../context/category/CategoryProvider";
import { useUser } from "../context/user/UserProvider";
import { MESSAGES } from "../utils/messages";

const CreateColor = ({ detail, closeDialog }: any) => {
  const { handleCreateColor, handleUpdateColor }: any = useCategory();
  const initialValues = { name: detail?.color?.name || "" };
  const { dispatchSnackBar }: any = useUser();
  console.log(detail);
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  const submit = async (values: any, setSubmitting: boolean | any) => {
    if (detail?.color?.id) {
      handleUpdateColor(detail?.color?.id, values);
      dispatchSnackBar(MESSAGES("Color").updated);
    } else {
      handleCreateColor(values);
      dispatchSnackBar(MESSAGES("Color").success);
    }
    setSubmitting(false);
    return closeDialog();
  };
  return (
    <div>
      <Dialog open={true} fullWidth maxWidth="sm">
        <DialogTitle>
          {detail?.color?.id ? "Edit Color" : " Create Color"}
        </DialogTitle>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values, { setSubmitting }) =>
            submit({ ...values }, setSubmitting)
          }
        >
          {({ submitForm, isSubmitting, errors, touched }) => (
            <>
              <DialogContent>
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <Field
                          type="text"
                          name="name"
                          as={TextField}
                          variant="standard"
                          label="Color"
                          required
                          id="name"
                        />
                      </FormControl>
                      {errors && touched && (
                        <FormHelperText style={{ color: "red" }}>
                          <ErrorMessage name="name" />
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button disabled={isSubmitting} onClick={submitForm}>
                  {detail?.color?.id ? "Enhance" : "Create"}
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CreateColor;
