import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Grid2,
  Paper,
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
import useGettingSubjectsResult from "../../hooks/useGettingSubjects";
import useAddingSubject from "../../hooks/useAddingSubject";
import AlertMessage from "../../components/Toast/AlertMessage";

const SubjectsScreen = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [openDialog, setOpenDialog] = useState(false);
  const [addingLoading, setAddingLoading ]  = useState(false)
  const [subjectName, setSubjectName] = useState("");
  const { subjects, isError, isLoading, isSuccess } =
    useGettingSubjectsResult();
  const { mutate, isPending , isSuccessAdding} = useAddingSubject();
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

  const handleAddingSubject = () => {
    const data = {
      name: subjectName,
    };
    mutate(data, {
      onSuccess: () => {
        setOpenDialog(false);
        setSubjectName("");
        setAddingLoading(true)
      },
      onError: (error) => {
        console.error("Error adding result:", error);
        // Handle error state if needed
      },
    });
  };

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      {isLoading && <Typography>Loading...</Typography>}
      {isError && <Typography>Error occurred while fetching data</Typography>}
      <AlertMessage message="تم اضافه ماده" open={addingLoading} setOpen={(val)=>{
        setAddingLoading(val)
      }} />

      {/* Add User Button */}
      <Grid2
        container
        spacing={2}
        sx={{ marginBottom: 2, justifySelf: "flex-start" }}
      >
        <Grid2 size={12}>
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            اضافه ماده دراسية
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
                  معرف المادة
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",

                    backgroundColor: "#f0f0f0",
                  }}
                >
                  الاسم
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isSuccess &&
                subjects
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subject) => (
                    <TableRow>
                      <TableCell>{subject._id}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={isSuccess && subjects.length}
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
        title="اضافة ماده  "
        componentType="form"
      >
        <Grid2
          size={12}
          sx={{ justifyContent: "space-between", flexDirection: "row" }}
        ></Grid2>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid item xs={12}>
            <TextField
              value={subjectName}
              onChange={(e) => {
                setSubjectName(e.target.value);
              }}
              fullWidth
              label="الاسم"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={() => handleAddingSubject()}
        >
          اضافة
        </Button>
      </GenericDialog>
    </Box>
  );
};

export default SubjectsScreen;
