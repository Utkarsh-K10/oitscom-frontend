import { Button, Box } from "@mui/material";
import { useState } from "react";
import TableComponent from "../components/TableComponent";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CreateCategory from "../components/CreateCategory";
import { downloadCSV } from "../utils/utilService";

const Category = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const handleDownloadCSV = () => {
    const data = [
      {
        id: "sno",
        numeric: false,
        disablePadding: false,
        label: "S no",
      },
      {
        id: "firstName",
        numeric: false,
        disablePadding: false,
        label: "First Name",
      },
      {
        id: "lastName",
        numeric: false,
        disablePadding: false,
        label: "Last Name",
      },
      { id: "age", numeric: false, disablePadding: false, label: "Age" },
    ];
    const exportData = data?.map((item: any) => {
      return {
        id: item.id,
        numeric: item.numeric,
        disablePadding: item.disablePadding,
        label: item.label,
      };
    });
    downloadCSV(exportData, "data.csv");
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
          <Button variant="contained" onClick={() => setShowCategoryForm(true)}>
            Create Category
          </Button>
        </Box>
        <TableComponent
          title="Category Table For Product"
          rows={[]}
          headcells={[]}
        />
      </div>
      {showCategoryForm && (
        <CreateCategory closeDialog={() => setShowCategoryForm(false)} />
      )}
    </>
  );
};

export default Category;
