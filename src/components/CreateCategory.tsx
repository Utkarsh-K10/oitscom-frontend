import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useUser } from "../context/user/UserProvider";

const CreateCategory = ({ closeDialog }: any) => {
  const { handleCreateCategory }: any = useUser();
  const initialValues = { name: "" };

  const validate = (values: any) => {
    const errors = {} as any;
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  };

  const submit = async (values: any, setSubmitting: boolean | any) => {
    console.log({ values });
    handleCreateCategory(values);
    setSubmitting(false);
    return closeDialog();
  };
  return (
    <div>
      <Dialog open={true}>
        <DialogTitle>Create Category</DialogTitle>
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
                      {errors?.name}
                    </FormHelperText>
                  )}
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button disabled={isSubmitting} onClick={submitForm}>
                  Create
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
