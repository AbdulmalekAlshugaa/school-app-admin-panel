import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Grid2,
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

const TeachersScreen = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [gender, setGender] = React.useState("m");
  const [userType, setUserType] = React.useState("Student");
  const [subjects, setSubjects] = React.useState([]);
  const { users, isError, isLoading, isSuccess } = useGettingAllUser();

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
    (isSuccess &&
      users
        .filter((user) => user.role === "Teacher")
        .map((user) => ({
          id: user.username,
          name: user.name,
          className:
            user.role === "Student"
              ? user.classes[0].name
              : user.classes.map((c) => c.name).join(", "),
          gender: user.gender === "m" ? "ذكر" : "أنثى",
          role: user.role === "Student" ? "طالب" : "معلم",
          status: user.active ? "نشط" : "غير نشط",
        }))) ||
    [];
  const goToUserDetails = (user) => {
    console.log(user);
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
            اضافه مستخدم
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
                  <TableRow onClick={() => goToUserDetails(user)} key={user.id}>
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
        title="اضافة معلم  جديد"
        componentType="form"
      >
        <Grid2
          size={12}
          sx={{ justifyContent: "space-between", flexDirection: "row" }}
        >
          <RowRadioButtonsGroup
            setSelectedValue={(val) => {
              setGender(val);
            }}
            selectedValue={gender}
            title="الجنس"
          >
            <FormControlLabel value="m" control={<Radio />} label="ذكر" />
            <FormControlLabel value="f" control={<Radio />} label="أنثى" />
          </RowRadioButtonsGroup>
          <RowRadioButtonsGroup
            setSelectedValue={(val) => {
              setUserType(val);
            }}
            selectedValue={userType}
            title="النوع"
          >
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
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid item xs={12}>
            <TextField fullWidth label="الاسم" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="الصف" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <MultipleSelect label="المواد الدراسية" multiple />
          </Grid>
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

export default TeachersScreen;
