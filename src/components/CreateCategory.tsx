import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormHelperText,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useUser } from "../context/user/UserProvider";

const CreateCategory = ({ closeDialog, detail }: any) => {
  const { handleCreateCategory, handleUpdateCategory }: any = useUser();
  const initialValues = { name: detail.name || "" };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  const submit = async (values: any, setSubmitting: boolean | any) => {
    if (detail.id) {
      handleUpdateCategory(detail.id, values);
    } else {
      handleCreateCategory(values);
    }
    setSubmitting(false);
    return closeDialog();
  };

  return (
    <div>
      <Dialog open={true}>
        <DialogTitle>
          {detail.id ? "Edit Category" : " Create Category"}
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
                  <Field
                    type="text"
                    name="name"
                    as={TextField}
                    variant="standard"
                    label="Category"
                    required
                    id="name"
                  />
                  {errors && touched && (
                    <FormHelperText style={{ color: "red" }}>
                      <ErrorMessage name="name" component="div" />
                    </FormHelperText>
                  )}
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button disabled={isSubmitting} onClick={submitForm}>
                  {detail.id ? "Enhance" : "Create"}
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
