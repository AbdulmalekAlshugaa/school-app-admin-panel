import * as React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import {
  AppBar,
  Avatar,
  Button,
  Card,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import UserProfileTap from "../../components/UserProfile/UserProfileTap";
import ResultTableCrudGrid from "../../components/Table/Results/ResultTable";
import useGettingUserResult from "../../hooks/useGettingUserData";
import DropDownList from "../../components/DropDownList/DropDownList";
import useUpdateUserResultStatus from "../../hooks/useUpdateUserResultStatus";

export default function UserDetailsScreen() {
  const { user, isSuccess, isLoading } = useGettingUserResult(
    "6776bc0881fe8d4fa889f672"
  );
  const { mutate } = useUpdateUserResultStatus();
  const [studyYear, setStudyYear] = React.useState("");
  const [studentId, setStudentId] = React.useState("6776bc0881fe8d4fa889f672");
  const [status, setStatus] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleDescriptionChange = (event) => {
    const newValue = event.target.value;
    setDescription(newValue);
  };

  const handleUpdateResultsStatus = () => {
    const data = {
      studentId,
      status,
      description,
      year: "2024-2025",
    };
    mutate(data, {
      onSuccess: () => {
        setDescription("");
        setStatus("");
      },
      onError: (error) => {
        console.error("Error adding result:", error);
        // Handle error state if needed
      },
    });
  };

  const initialRows =
    isSuccess &&
    user.results
      .filter((item) => item.year === "2024-2025")
      .flatMap((result) => {
        return result.subjects.map((subject, index) => {
          const firstTerm =
            subject.marks.find((mark) => mark.term === 1)?.score || 0;
          const secondTerm =
            subject.marks.find((mark) => mark.term === 2)?.score || 0;
          const finalMarks = firstTerm + secondTerm;
          const subjectId = subject.subject._id;
          return {
            id: subjectId,
            name: subject.subject.name, // اسم المادة الدراسية
            firstTerm: firstTerm > 0 ? firstTerm : "غير متوفر",
            secondTerm: secondTerm > 0 ? secondTerm : "غير متوفر",
            finalMarks: finalMarks > 0 ? finalMarks : "غير متوفر",
            status: finalMarks > 50 ? "ناجح" : "راسب", // ناجح if > 50
            userId: result._id,
            year: "2024-2025",
          };
        });
      });

  const subjects =
    isSuccess &&
    user.results.flatMap((result) =>
      result.subjects.map((subject) => subject.subject)
    );

  return (
    <>
      {isLoading ? (
        <TextField>Loading.... </TextField>
      ) : (
        <Paper
          elevation={0}
          sx={{ p: 0, width: "100%", height: "100%", overflow: "auto" }}
        >
          <AppBar
            sx={{
              backgroundColor: "white",
              color: "black",
              marginTop: 3,
              justifyContent: "center",
              alignContent: "center",
              boxShadow: "inset 0 -1px 0 #d9d9d9",
            }}
            position="static"
          >
            <Toolbar variant="dense">
              <Typography
                sx={{
                  alignSelf: "center",
                }}
                variant="h6"
                color="inherit"
                component="div"
              >
                تفاصيل المستخدم
              </Typography>
            </Toolbar>
          </AppBar>
          <PageContainer
            slot="content"
            spellCheck={false}
            title={user.name}
            sx={{
              padding: 0,
              height: "100%",
              overflow: "auto",
              minWidth: "100%",
            }}
          >
            <Grid container spacing={3}>
              <Grid size={4}>
                <Card sx={{ p: 1 }}>
                  <Avatar
                    alt={user.name}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 100, height: 100 }}
                  />
                  <Typography variant="h6">المعلومات الشخصية</Typography>
                  <Typography>الاسم: {user.name}</Typography>
                  <Typography> الصف: {user.className}</Typography>

                  <Typography>الجنس: {user.gender}</Typography>
                  <Typography>الوظيفة: {user.role}</Typography>
                  <Typography>
                    الحالة: {user.active ? "نشط" : "غير نشط"}
                  </Typography>
                </Card>
              </Grid>

              <Grid size={8}>
                <UserProfileTap
                  index={0}
                  setIndex={(index) => {
                    console.log(index);
                  }}
                >
                  <Grid2
                    sx={{
                      marginLeft: -3,
                    }}
                    size={12.6}
                  >
                    <div
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          اختار السنة الدراسية{" "}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={studyYear}
                          label="2024-2025"
                          onChange={(e) => setStudyYear(e.target.value)}
                        >
                          <MenuItem value={"2024-2025"}>2024-2025</MenuItem>
                          <MenuItem value={"2025-2026"}> 2025-2026</MenuItem>
                          <MenuItem value={"2026-2027"}> 2026-2027</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <ResultTableCrudGrid
                      rows={initialRows}
                      subjects={subjects}
                    />
                  </Grid2>
                </UserProfileTap>
                <Grid2
                  container
                  rowGap={1}
                  sx={{
                    flexDirection: "row", // Ensure horizontal arrangement،
                    justifyContent: "space-between",
                  }}
                >
                  <Grid2
                    marginBottom={2}
                    sx={{
                      minWidth: "300",
                      width: "300",
                      marginRight: 1,
                      flexGrow: 0.1,
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        الحالة النهايه
                      </InputLabel>
                      <DropDownList
                        setValue={(value) => {
                          setStatus(value);
                        }}
                        label="الحالة النهايه "
                        value={studyYear}
                      >
                        <MenuItem value={"pass"}>ناجح</MenuItem>
                        <MenuItem value={"fall"}>راسب</MenuItem>
                      </DropDownList>
                    </FormControl>
                  </Grid2>

                  <Grid2
                    marginBottom={2}
                    sx={{
                      flexGrow: 1, // Allow growth
                    }}
                  >
                    <TextField
                      variant="outlined"
                      required
                      id="description"
                      label="ملاحظة "
                      name="ناجح ومنقول...."
                      fullWidth
                      onChange={handleDescriptionChange}
                    />
                  </Grid2>

                  <Grid2
                    marginBottom={2}
                    sx={{
                      minWidth: "300",
                      width: "300",
                      height: 55,
                      marginRight: 1,
                      flexGrow: 0.1,
                      marginLeft: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Button
                      onClick={handleUpdateResultsStatus}
                      variant="contained"
                      sx={{ height: "100%", width: "100%" }}
                    >
                      تحديث
                    </Button>
                  </Grid2>
                </Grid2>
              </Grid>
            </Grid>
          </PageContainer>
        </Paper>
      )}
    </>
  );
}
