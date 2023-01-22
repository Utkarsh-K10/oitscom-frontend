import { Button, Box } from "@mui/material";
import { useState } from "react";
import TableComponent from "../components/TableComponent";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CreateCategory from "../components/CreateCategory";

const Category = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);

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
            <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
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
