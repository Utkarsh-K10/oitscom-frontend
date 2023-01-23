import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const TableComponent = ({
  headcells = [] as any,
  rows = [] as any,
  title = "",
  withPagination = true,
  defaultRowPerPage = 10,
}) => {
  const headers: any = rows.length > 0 && Object.keys(rows[0]);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowPerPage);
  const [filterRow, setFilterRow] = useState([]);
  const [page, setPage] = React.useState(0);
  if (filterRow.length) {
    rows = filterRow;
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box sx={{ width: 1, m: 2 }}>
      <Paper sx={{ width: 1 }}>
        <Box sx={{ p: 1 }}>
          {title && (
            <Typography
              sx={{
                m: "15px",
                color: "text.secondary",
                textDecoration: "underline",
                lineHeight: "25px",
                letterSpacing: "0.18px",
              }}
              variant="h6"
            >
              {title}
            </Typography>
          )}
        </Box>
        <Box sx={{ m: 2 }}>
          <form action="">
            <TextField
              id="filled-search"
              label="Search"
              type="search"
              variant="standard"
              onChange={(e: any) => {
                const { value } = e.target;
                if (value.length) {
                  const output = rows.filter((item: any) =>
                    item.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                  setFilterRow(output);
                } else {
                  setFilterRow([]);
                }
              }}
            />
          </form>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead sx={{ background: "#2980b9" }}>
              <TableRow>
                {headcells?.map((headcell: any) => (
                  <TableCell
                    key={headcell.id}
                    component="th"
                    align={headcell.numeric ? "right" : "left"}
                    padding={headcell.disablePadding ? "none" : "normal"}
                  >
                    <Typography sx={{ color: "#fff" }}>
                      {headcell.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                ?.slice(
                  page * rowsPerPage,
                  withPagination
                    ? page * rowsPerPage + rowsPerPage
                    : rows.length
                )
                .map((row: any) => (
                  <TableRow key={row.id}>
                    {headers?.map((headcell: any, index: number) => (
                      <TableCell key={index}>{row[headcell]}</TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "flex-end  " }}>
          {withPagination && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          )}
        </div>
      </Paper>
    </Box>
  );
};

export default TableComponent;
