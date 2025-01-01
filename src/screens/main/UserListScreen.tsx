import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Grid2, IconButton, TextField } from "@mui/material";
import GenericDialog from "../../components/Popup/GenericDialog";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RowRadioButtonsGroup from "../../components/RadioButton/RowRadioButtonsGroup";
import MultipleSelect from "../../components/Select/AppSelect";

interface Column {
  id: "name" | "className" | "gender" | "role" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "الاسم", minWidth: 170 },
  { id: "className", label: "الصف", minWidth: 100 },
  {
    id: "gender",
    label: "الجنس",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "role",
    label: "النوع",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "الحاله",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  className: string;
  gender: string;
  role: string;
  status: string;
}

function createData(
  name: string,
  className: string,
  gender: string,
  role: string,
  status: string
): Data {
  return { name, className, gender, role, status };
}

const rows = [
  createData("عبد الملك الشجاع", "مدرس", "ذكر", "مدرس", "نشط"),
  createData("فاطمة الهادئة", "مدرس", "أنثى", "مدرس", "نشط"),
  createData("محمد القوي", "مشرف", "ذكر", "مشرف", "نشط"),
  createData("سارة الذكية", "مشرف", "أنثى", "مشرف", "غير نشط"),
  createData("يوسف الحكيم", "مدرس", "ذكر", "مدرس", "نشط"),
  createData("ليلى العطوفة", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("علي المتفاني", "مدرس", "ذكر", "مدرس", "غير نشط"),
  createData("هدى المجتهدة", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("رامي الشجاع", "مدرس", "ذكر", "مدرس", "نشط"),
  createData("نور الهادئة", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("عمر القوي", "مدرس", "ذكر", "مدرس", "غير نشط"),
  createData("منى الذكية", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("أحمد الحكيم", "مدرس", "ذكر", "مدرس", "نشط"),
  createData("خلود العطوفة", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("باسم المتفاني", "مدرس", "ذكر", "مدرس", "غير نشط"),
  createData("ريم المجتهدة", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("زين الشجاع", "مدرس", "ذكر", "مدرس", "نشط"),
  createData("هبة الهادئة", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("سامر القوي", "مدرس", "ذكر", "مدرس", "غير نشط"),
  createData("نهى الذكية", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("عبد الملك الشجاع", "مدرس", "ذكر", "مدرس", "نشط"),
  createData("فاطمة الهادئة", "مدرس", "أنثى", "مدرس", "نشط"),
  createData("محمد القوي", "مشرف", "ذكر", "مشرف", "نشط"),
  createData("سارة الذكية", "مشرف", "أنثى", "مشرف", "غير نشط"),
  createData("يوسف الحكيم", "مدرس", "ذكر", "مدرس", "نشط"),
  createData("ليلى العطوفة", "مشرف", "أنثى", "مشرف", "نشط"),
  createData("علي المتفاني", "مدرس", "ذكر", "مدرس", "غير نشط"),
  createData("هدى المجتهدة", "مشرف", "أنثى", "مشرف", "نشط"),
];

export default function UserListScreen() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const renderAddUserButton = () => (
    <Grid2 container justifyContent="flex-start" sx={{ padding: 2 }}>
      <Grid2>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          اضافه مستخدم
        </Button>
      </Grid2>
    </Grid2>
  );

  const renderGenderSelection = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <RowRadioButtonsGroup title="نوع المستخدم">
          <FormControlLabel value="Student" control={<Radio />} label="طالب" />
          <FormControlLabel value="Teacher" control={<Radio />} label="معلم" />
        </RowRadioButtonsGroup>

        <RowRadioButtonsGroup title="الجنس">
          <FormControlLabel value="m" control={<Radio />} label="ذكر" />
          <FormControlLabel value="f" control={<Radio />} label="انثي" />
        </RowRadioButtonsGroup>
      </Box>
    );
  };
  const renderSelection = (lable?: string, multiple?: boolean) => {
    return <MultipleSelect label={lable} multiple={multiple} />;
  };

  const renderOpenDialog = () => {
    return (
      <GenericDialog
        openDialog={openDialog}
        title=" اضافة مستخدم جديد"
        componentType={"form"}
      >
        <Grid2
          sx={{
            minWidth: "400px", // Set minimum width
            flexGrow: 1, // Allow
          }}
        >
          <TextField
            id="name"
            label="الاسم كامل "
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="className"
            label="الصف"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          {renderGenderSelection()}
          {renderSelection()}
          {renderSelection("المواد الدراسية", true)}
        </Grid2>
        <Grid2>
          <Button
            sx={{
              width: "100%",
              marginBottom: 2,
              marginTop: 2,
            }}
            variant="contained"
            onClick={() => setOpenDialog(false)}
          >
            اضافه
          </Button>
        </Grid2>
      </GenericDialog>
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {renderOpenDialog()}
      <TableContainer sx={{ maxHeight: 600 }}>
        {renderAddUserButton()}
        <Table size="medium" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        dir="rtl"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
