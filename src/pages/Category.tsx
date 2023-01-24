import { Button, Box, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import TableComponent from "../components/TableComponent";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CreateCategory from "../components/CreateCategory";
import { downloadCSV } from "../utils/utilService";
import { useUser } from "../context/user/UserProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useCategory } from "../context/category/CategoryProvider";
import { MESSAGES } from "../utils/messages";
import Breadcrum from "../components/Breadcrum";

const useStyles: any = makeStyles({
  buttons: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const Category = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const { categories, handleDeleteCategory }: any = useUser();
  const [showConfirmation, setShowConfirmation]: any = useState(false);
  const [selectedData, setSelectedData]: any = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const classes = useStyles();
  const { dispatchSnackBar }: any = useUser();

  const CATEGORY_TABLE_HEAD = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Category name",
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

  const categoryList = () => {
    return categories?.map((category: any) => {
      return {
        name: category.name,
        edit: (
          <Box
            sx={{ color: "text.secondary" }}
            onClick={() => {
              setShowCategoryForm(true);
              setSelectedData(category);
              setIsEdit(true);
            }}
          >
            <EditIcon className={classes.buttons} />
          </Box>
        ),
        delete: (
          <Box
            sx={{ color: "text.secondary" }}
            onClick={() => {
              setShowConfirmation(true);
              setSelectedData(category);
            }}
          >
            <DeleteIcon className={classes.buttons} />
          </Box>
        ),
      };
    });
  };

  const handleDownloadCSV = () => {
    const exportData = categories?.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
    downloadCSV(exportData, "categories.csv");
    dispatchSnackBar(MESSAGES("File").downlaod);
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
        <Breadcrum page="Category" />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ mr: 2 }}>
            <Button
              variant="outlined"
              startIcon={<CloudDownloadIcon />}
              onClick={handleDownloadCSV}
            >
              Download
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              setShowCategoryForm(true), setIsEdit(false);
            }}
          >
            Create Category
          </Button>
        </Box>
        <TableComponent
          title="Category Table For Product"
          headcells={CATEGORY_TABLE_HEAD}
          rows={categoryList()}
        />
      </div>
      {showCategoryForm && (
        <CreateCategory
          closeDialog={() => setShowCategoryForm(false)}
          detail={isEdit ? selectedData : {}}
        />
      )}
      {showConfirmation && (
        <ConfirmationDialog
          closeDialog={() => setShowConfirmation(false)}
          detail={selectedData}
          dialogtext={`Are you sure you want to delete ${selectedData.name}`}
          confirmtext="Yes"
          denytext="No"
          onClose={handleDeleteCategory}
        />
      )}
    </>
  );
};

export default Category;
