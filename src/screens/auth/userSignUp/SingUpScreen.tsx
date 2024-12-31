import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Avatar, Container, Grid2 } from "@mui/material";
import { LockClockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserSignUpScreen = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
      maxWidth="xl"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px", // Limit max width
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockClockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          انشاء حساب جديد
        </Typography>
        <Box
          sx={{
            width: "100%",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <Grid2
            marginBottom={2}
            sx={{
              minWidth: "300px", // Set minimum width
              flexGrow: 1, // Allow
            }}
          >
            <TextField
              variant="outlined"
              required
              id="username"
              label="الاسم الكامل "
              name="الاسم الكامل"
              fullWidth
            />
          </Grid2>
          <Grid2
            marginBottom={2}
            sx={{
              minWidth: "300px", // Set minimum width
              flexGrow: 1, // Allow
            }}
          >
            <TextField
              variant="outlined"
              required
              id="username"
              label="اسم المستخدم"
              name="اسم المستخدم"
              fullWidth
            />
          </Grid2>
          <Grid2
            sx={{
              minWidth: "300px", // Set minimum width
              flexGrow: 1, // Allow
            }}
          >
            <TextField
              variant="outlined"
              required
              id="password"
              label="كلمة المرور"
              name="كلمة المرور"
              type="password"
              autoComplete="current-password"
              fullWidth
              sx={{
                minWidth: "300px", // Set minimum width
                flexGrow: 1, // Allow to grow
              }}
            />
          </Grid2>
        </Box>
        <Button variant="contained" sx={{ mt: 3, width: "100%", flexGrow: 1 }}>
          انشاء حساب جديد
        </Button>

        <Button
          onClick={goToLogin}
          variant="text"
          sx={{ mt: 3, width: "100%", flexGrow: 1 }}
        >
          لديك حساب؟ تسجيل الدخول
        </Button>
      </Box>
    </Container>
  );
};

export default UserSignUpScreen;
