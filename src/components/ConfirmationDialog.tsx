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

const ConfirmationDialog = ({
  closeDialog,
  detail,
  dialogtext,
  confirmtext,
  denytext,
  onClose,
}: any) => {
  console.log({ detail });
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">Please Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogtext}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>{denytext}</Button>
        <Button
          onClick={() => {
            onClose(detail.id);
            closeDialog();
          }}
          autoFocus
        >
          {confirmtext}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
