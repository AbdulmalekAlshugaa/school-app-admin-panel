import { Routes, Route } from "react-router-dom";
import LoginUser from "./screens/auth/userLogin/LoginUser";
import UserSignUpScreen from "./screens/auth/userSignUp/SingUpScreen";
import DashboardLayoutBasic from "./screens/main/DashboardLayoutBasic";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserDetailsScreen from "./screens/main/UserDetailsScreen";
import UseIsLoginUser from "./hooks/useIsLoginUser";
import { AuthContextProvider } from "./context/AuthContext";
import NotFound from "./screens/main/NotFound";

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
    <main>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route path="/login" element={<LoginUser />} />
                <Route path="/signup" element={<UserSignUpScreen />} />
                <Route element={<UseIsLoginUser />}>
                  <Route path="/" element={<DashboardLayoutBasic />} />
                  <Route path="/userDetails" element={<UserDetailsScreen />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </main>
  );
}

export default App;
