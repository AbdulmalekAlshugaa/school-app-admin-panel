import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Container, Grid2 } from "@mui/material";
import { LockClockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useLogin from "../../../hooks/useLogin";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isSuccess, isPending, isError } = useLogin();

  const handleUserLogin = () => {
    const data = {
      username,
      password,
    };
    mutate(data, {
      onSuccess: (res) => {
        console.log("res", res)
        setPassword("");
        setUsername("");
        localStorage.setItem("token", JSON.stringify(res.accessToken));
        localStorage.setItem("user", JSON.stringify(res.result));
      },
    });
  };
  const Navigate = useNavigate();
  const goToSignUp = () => {
    Navigate("/");
  };
  useEffect(() => {
    if (isSuccess) {
      goToSignUp();
    }
  }, [isSuccess]);
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
          تسجيل الدخول
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
              onChange={(event) => {
                setUsername(event.target.value);
              }}
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
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              autoComplete="current-password"
              fullWidth
              sx={{
                minWidth: "300px", // Set minimum width
                flexGrow: 1, // Allow to grow
              }}
            />
          </Grid2>
        </Box>
        <LoadingButton
          onClick={handleUserLogin}
          variant="contained"
          loading={isPending}
          sx={{ mt: 3, width: "100%", flexGrow: 1 }}
        >
          تسجيل الدخول
        </LoadingButton>

        <Button variant="text" sx={{ mt: 3, width: "100%", flexGrow: 1 }}>
          نسيت كلمة المرور
        </Button>

        <Button
          onClick={goToSignUp}
          variant="text"
          sx={{ mt: 3, width: "100%", flexGrow: 1 }}
        >
          ليس لديك حساب؟ انشاء حساب جديد
        </Button>
        {isError ? (
          <Typography color="red" component="h6" variant="h6" sx={{ mb: 3 }}>
            حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.
          </Typography>
        ) : null}
      </Box>
    </Container>
  );
};

export default LoginUser;
