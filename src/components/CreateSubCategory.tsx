import { Category } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormHelperText,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useCategory } from "../context/category/CategoryProvider";
import { useUser } from "../context/user/UserProvider";
import { MESSAGES } from "../utils/messages";

const CreateSubCategory = ({ closeDialog, detail }: any) => {
  const { handleCreateSubCategory, handleUpdateSubCategory }: any =
    useCategory();
  const { categories, dispatchSnackBar }: any = useUser();
  const initialValues = {
    name: detail?.subCategory?.name || "",
    category: detail?.subCategory?.category?.id || "",
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.category) {
      errors.category = "Required";
    }
    return errors;
  };

  const submit = async (values: any, setSubmitting: boolean | any) => {
    try {
      if (detail?.subCategory?.id) {
        handleUpdateSubCategory(detail?.subCategory?.id, values);
        dispatchSnackBar(MESSAGES("Subcategory").updated);
      } else {
        handleCreateSubCategory(values);
        dispatchSnackBar(MESSAGES("Subcategory").success);
      }
      setSubmitting(false);
      return closeDialog();
    } catch (error) {
      console.log({ error });
      dispatchSnackBar(MESSAGES("SubCategory").error);
    }
  };

  return (
    <div>
      <Dialog open={true} fullWidth maxWidth="sm">
        <DialogTitle>
          {detail?.subCategory?.id
            ? "Enhance SubCategory"
            : "Create SubCategory"}
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
                          label="Sub Category"
                          required
                          id="name"
                        />
                      </FormControl>
                      {errors && touched && (
                        <FormHelperText style={{ color: "red" }}>
                          <ErrorMessage name="name" component="div" />
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Category
                        </InputLabel>
                        <Field
                          as={Select}
                          name="category"
                          variant="standard"
                          id="category"
                          required
                        >
                          {categories?.map((category: any) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                      {errors && touched && (
                        <FormHelperText style={{ color: "red" }}>
                          <ErrorMessage name="category" component="div" />
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button disabled={isSubmitting} onClick={submitForm}>
                  {detail?.subCategory?.id ? "Enhance " : "Create "}
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CreateSubCategory;
