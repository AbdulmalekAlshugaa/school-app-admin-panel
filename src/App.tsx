import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginUser from "./screens/auth/userLogin/LoginUser";
import UserSignUpScreen from "./screens/auth/userSignUp/SingUpScreen";
import DashboardLayoutBasic from "./screens/main/DashboardLayoutBasic";
import UserListScreen from "./screens/main/UserListScreen";
import ResultsScreen from "./screens/main/ResultsScreen";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create the theme with RTL direction
const theme = createTheme({
  direction: "rtl", // Specify right-to-left direction
  typography: {
    fontFamily: `"Tajawal", "Roboto", "Arial", sans-serif`, // Add RTL-compatible fonts
  },
});

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<DashboardLayoutBasic />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/signup" element={<UserSignUpScreen />} />
            <Route path="/userList" element={<UserListScreen />} />
            <Route path="/results" element={<ResultsScreen />} />
          </Routes>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

export default App;
