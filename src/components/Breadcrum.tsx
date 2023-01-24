import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Breadcrum = ({ page }: any) => {
  return (
    <Typography variant="h6" color={"text.main"}>
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        Dashboard
      </Link>
      /{page}
    </Typography>
  );
};

export default Breadcrum;
