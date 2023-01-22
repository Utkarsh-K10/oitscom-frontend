import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import React from "react";
import TableComponent from "../components/TableComponent";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const Category = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ width: "100%", margin: "2%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ mr: 2 }}>
          <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
            Download
          </Button>
        </Box>
        <Button variant="contained" onClick={handleClickOpen}>
          Create Category
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <TableComponent />
    </div>
  );
};

export default Category;
