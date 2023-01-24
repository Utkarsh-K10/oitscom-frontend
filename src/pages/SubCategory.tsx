import { Box, Button, Typography } from "@mui/material";
import TableComponent from "../components/TableComponent";
import { useCategory } from "../context/category/CategoryProvider";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import { downloadCSV } from "../utils/utilService";
import CreateSubCategory from "../components/CreateSubCategory";
import { useState } from "react";
import ConfirmationDialog from "../components/ConfirmationDialog";
import SimpleSnackbar from "../components/Snackbar";
import { MESSAGES } from "../utils/messages";
import { useUser } from "../context/user/UserProvider";
import Breadcrum from "../components/Breadcrum";

const useStyles: any = makeStyles({
  buttons: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

const SubCategory = () => {
  const { subCategories, handleDeleteSubCategory }: any = useCategory();
  const classes = useStyles();
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [selectedData, setSelectedData]: any = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [showConfirmation, setShowConfirmation]: any = useState(false);
  const { dispatchSnackBar }: any = useUser();

  const SUB_CATEGORY_TABLE_HEAD = [
    {
      id: "sname",
      numeric: false,
      disablePadding: false,
      label: "SubCategory",
    },
    {
      id: "cname",
      numeric: false,
      disablePadding: false,
      label: "Category",
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

  const getSubCategories = () =>
    subCategories.map((subCategory: any) => {
      return {
        name: subCategory?.name,
        cname: subCategory?.category.name,
        edit: (
          <Box
            sx={{ color: "text.secondary" }}
            onClick={() => {
              setShowSubCategory(true);
              setIsSelected(true);
              setSelectedData({ subCategory });
            }}
          >
            <EditIcon className={classes.buttons} />
          </Box>
        ),
        delete: (
          <Box
            sx={{ color: "text.secondary" }}
            onClick={() => {
              setSelectedData(subCategory);
              setShowConfirmation(true);
            }}
          >
            <DeleteIcon className={classes.buttons} />
          </Box>
        ),
      };
    });

  const handleDownload = () => {
    const exportData = subCategories.map((subCategory: any) => {
      return {
        id: subCategory?.id,
        s_name: subCategory?.name,
        c_name: subCategory?.category?.name,
      };
    });
    downloadCSV(exportData, "SubCategory.csv");
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
              setShowSubCategory(true);
              setIsSelected(false);
            }}
          >
            Create Sub Category
          </Button>
        </Box>
        <TableComponent
          title="Sub Category Table For Category"
          headcells={SUB_CATEGORY_TABLE_HEAD}
          rows={getSubCategories()}
        />
      </div>
      {showSubCategory && (
        <CreateSubCategory
          closeDialog={() => setShowSubCategory(false)}
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
          onClose={handleDeleteSubCategory}
        />
      )}
    </>
  );
};

export default SubCategory;
