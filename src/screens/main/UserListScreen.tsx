import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GenericDialog from "../../components/Popup/GenericDialog";
import RowRadioButtonsGroup from "../../components/RadioButton/RowRadioButtonsGroup";
import MultipleSelect from "../../components/Select/AppSelect";
import useGettingAllUser from "../../hooks/useGettingAllUser";
import { useNavigate } from "react-router-dom";
import useGettingSubjectsResult from "../../hooks/useGettingSubjects";
import DropDownList from "../../components/DropDownList/DropDownList";
import useGettingClasses from "../../hooks/useGettingClasses";

const UserListScreen = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [studyYear, setStudyYear] = useState("");
  const [className, setClassName] = useState("");
  const navigate = useNavigate();
  const subjectResponse = useGettingSubjectsResult();
  const { users, isError, isLoading, isSuccess } = useGettingAllUser();
  const res = useGettingClasses();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChangePage = (event: unknown, newPage: number) =>
    setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const mappedUsers =
    users?.map((user) => ({
      _id:user._id,
      id: user.username,
      name: user.name,
      className:
        user.role === "Student"
          ? user.classes[0].name
          : user.classes.map((c) => c.name).join(", "),
      gender: user.gender === "m" ? "ذكر" : "أنثى",
      role: user.role === "Student" ? "طالب" : "معلم",
      status: user.active ? "نشط" : "غير نشط",
      results: user.results,
    })) || [];

  const goToUserDetails = (user) => {
    navigate(`/userDetails`, {
      state: user,
    });
  };

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      {isLoading && <Typography>Loading...</Typography>}
      {isError && <Typography>Error occurred while fetching data</Typography>}
      {/* Add User Button */}
      <Grid2
        container
        spacing={2}
        sx={{ marginBottom: 2, justifySelf: "flex-start" }}
      >
        <Grid2 size={12}>
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            اضافة مستخدم
          </Button>
        </Grid2>
      </Grid2>

      {/* Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: isMobile ? 400 : 600 }}>
          <Table stickyHeader style={{ tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",

                    backgroundColor: "#f0f0f0",
                  }}
                >
                  معرف المستخدم
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",

                    backgroundColor: "#f0f0f0",
                  }}
                >
                  الاسم
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",

                    backgroundColor: "#f0f0f0",
                  }}
                >
                  الصف
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",

                    backgroundColor: "#f0f0f0",
                  }}
                >
                  الجنس
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  النوع
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",

                    backgroundColor: "#f0f0f0",
                  }}
                >
                  الحاله
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mappedUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    onClick={() => goToUserDetails(user)}
                    key={user._id}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell
                      style={{
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.className}
                    </TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.role}</TableCell>

                    <TableCell>{user.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={mappedUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Dialog */}
      <GenericDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="اضافة طالب جديد"
        componentType="form"
      >
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              اختار السنة الدراسية{" "}
            </InputLabel>
            <DropDownList
              setValue={(value) => {
                setStudyYear(value);
              }}
              label="اختار السنة الدراسية"
              value={studyYear}
            >
              <MenuItem value={"2024-2025"}>2024-2025</MenuItem>
              <MenuItem value={"2025-2026"}> 2025-2026</MenuItem>
              <MenuItem value={"2026-2027"}> 2026-2027</MenuItem>
            </DropDownList>
          </FormControl>
          <Grid item xs={12}>
            <TextField fullWidth label="الاسم" variant="outlined" />
          </Grid>
          <FormControl sx={{ marginTop: 3 }} fullWidth>
            <InputLabel id="subject-select-label">
              اختار الفصل الدراسي
            </InputLabel>
            <DropDownList
              setValue={(value) => {
                setClassName(value);
              }}
              label="اختار الصف"
              value={className}
            >
              {res.isSuccess &&
                res.classes.map((clss: any) => (
                  <MenuItem value={clss._id}>{clss.name}</MenuItem>
                ))}
            </DropDownList>
          </FormControl>
          <FormControl sx={{ marginTop: 3 }} fullWidth>
            <InputLabel id="subject-select-label">
              اختار المواد الدراسية
            </InputLabel>
            {subjectResponse.isSuccess ? (
              <MultipleSelect
                label=""
                multiple
                names={subjectResponse.subjects}
              />
            ) : null}
          </FormControl>

          <Grid2 size={12}>
            <RowRadioButtonsGroup title="الجنس">
              <FormControlLabel value="m" control={<Radio />} label="ذكر" />
              <FormControlLabel value="f" control={<Radio />} label="أنثى" />
            </RowRadioButtonsGroup>
          </Grid2>
          <Grid2
            sx={{
              justifyContent: "space-between",
              gap: 2,
              flex: 1,
            }}
            size={12}
          >
            <RowRadioButtonsGroup title="النوع">
              <FormControlLabel
                value="Student"
                control={<Radio />}
                label="طالب"
              />
              <FormControlLabel
                value="Teacher"
                control={<Radio />}
                label="معلم"
              />
            </RowRadioButtonsGroup>
          </Grid2>
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => setOpenDialog(false)}
        >
          اضافة
        </Button>
      </GenericDialog>
    </Box>
  );
};

export default UserListScreen;
