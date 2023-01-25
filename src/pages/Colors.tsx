import { Box, Button, Typography } from "@mui/material";
import TableComponent from "../components/TableComponent";
import { useCategory } from "../context/category/CategoryProvider";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import { downloadCSV } from "../utils/utilService";
import { useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";
import SimpleSnackbar from "../components/Snackbar";
import { MESSAGES } from "../utils/messages";
import { useUser } from "../context/user/UserProvider";
import Breadcrum from "../components/Breadcrum";
import CreateColor from "../components/CreateColor";

const useStyles: any = makeStyles({
  buttons: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const Colors = () => {
  const { colors, handleDeleteColor }: any = useCategory();
  const classes = useStyles();
  const [showColor, setShowColor] = useState(false);
  const [selectedData, setSelectedData]: any = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [showConfirmation, setShowConfirmation]: any = useState(false);
  const { dispatchSnackBar }: any = useUser();

  console.log({ colors });

  const COLOR_TABLE_HEAD = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Color Name",
    },
    {
      id: "edit",
      numeric: false,
      disablePadding: false,
      label: "Enhance",
    },
    {
      id: "delete",
      numeric: false,
      disablePadding: false,
      label: "Remove",
    },
  ];

  const getColors = () => {
    return colors?.map((color: any) => {
      return {
        name: color?.name,
        edit: (
          <Box
            sx={{ color: "text.secondary" }}
            onClick={(e: any) => {
              e.stopPropagation();
              setShowColor(true);
              setIsSelected(true);
              setSelectedData({ color });
            }}
          >
            <EditIcon className={classes.buttons} />
          </Box>
        ),
        delete: (
          <Box
            sx={{ color: "text.secondary" }}
            onClick={(e: any) => {
              e.stopPropagation();
              setSelectedData(color);
              setShowConfirmation(true);
            }}
          >
            <DeleteIcon className={classes.buttons} />
          </Box>
        ),
      };
    });
  };

  const handleDownload = () => {
    console.log("Hello");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          margin: "3%",
        }}
      >
        <Breadcrum page="Subcategory" />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ mr: 2 }}>
            <Button
              variant="outlined"
              startIcon={<CloudDownloadIcon />}
              onClick={handleDownload}
            >
              Download
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              setShowColor(true);
              setIsSelected(false);
            }}
          >
            Create Color
          </Button>
        </Box>
        <TableComponent
          title="Colors Table"
          headcells={COLOR_TABLE_HEAD}
          rows={getColors()}
        />
      </div>
      {showColor && (
        <CreateColor
          closeDialog={() => setShowColor(false)}
          detail={isSelected ? selectedData : {}}
        />
      )}
      {showConfirmation && (
        <ConfirmationDialog
          closeDialog={() => setShowConfirmation(false)}
          detail={selectedData}
          dialogtext={`Are you sure you want to delete ${selectedData?.name}`}
          confirmtext="Yes"
          denytext="No"
          onClose={handleDeleteColor}
        />
      )}
    </>
  );
};

export default Colors;
