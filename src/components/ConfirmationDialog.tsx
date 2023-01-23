import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useUser } from "../context/user/UserProvider";

const ConfirmationDialog = ({ closeDialog, category }: any) => {
  const { handleDeleteCategory }: any = useUser();
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Please Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {
            <>
              Are you sure you want to Delete{" "}
              <span style={{ fontWeight: "bold" }}>{category.name}</span>{" "}
            </>
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>No</Button>
        <Button
          onClick={() => {
            handleDeleteCategory(category.id);
            closeDialog();
          }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
