import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfimationDialogProps {
  closeDialog: () => {};
  detail: string | any;
  dialogtext: string;
  confirmtext: string;
  denytext: string;
  onClose: (id: number) => {};
}

const ConfirmationDialog = ({
  closeDialog,
  detail,
  dialogtext,
  confirmtext,
  denytext,
  onClose,
}: ConfimationDialogProps) => {
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
