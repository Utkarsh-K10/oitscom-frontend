import { Typography } from "@mui/material";
import { useCategory } from "../context/category/CategoryProvider";

const SubCategory = () => {
  const { subCategories }: any = useCategory();
  console.log({ subCategories });
  return (
    <div>
      <Typography variant="h4">Sub Category</Typography>
    </div>
  );
};

export default SubCategory;
