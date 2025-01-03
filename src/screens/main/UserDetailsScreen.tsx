import * as React from "react";
import { styled } from "@mui/material/styles";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Card,
  FormControlLabel,
  Grid2,
  Radio,
  Toolbar,
  Typography,
} from "@mui/material";
import UserProfileTap from "../../components/UserProfile/UserProfileTap";
import { RadioButtonChecked } from "@mui/icons-material";
import RowRadioButtonsGroup from "../../components/RadioButton/RowRadioButtonsGroup";
import ResultTableCrudGrid from "../../components/Table/ResultTable";

const Skeleton = styled("div")<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function UserDetailsScreen() {
  const location = useLocation();
  const user = location.state.user;

  return (
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
        sx={{ padding: 0, height: "100%", overflow: "auto", minWidth: "100%" }}
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
              <Typography>الحالة: {user.active ? "نشط" : "غير نشط"}</Typography>
            </Card>
          </Grid>

          <Grid sx={{}} size={8}>
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
                <ResultTableCrudGrid />
              </Grid2>
            </UserProfileTap>
          </Grid>
        </Grid>
      </PageContainer>
    </Paper>
  );
}
