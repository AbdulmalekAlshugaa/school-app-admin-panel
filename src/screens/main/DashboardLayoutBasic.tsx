import * as React from "react";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Class, People, Quiz, School } from "@mui/icons-material";
import UserListScreen from "./UserListScreen";
import ResultsScreen from "./ResultsScreen";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "القائمة",
  },

  {
    segment: "userList",
    title: "جميع المستخدمين",
    icon: <People />,
  },
  {
    segment: "results",
    title: "النتائج",
    icon: <Quiz />,
  },
  {
    segment: "classes",
    title: "الفصول",
    icon: <Class />,
  },
  {
    segment: "subjects",
    title: "مواد دراسية ",
    icon: <School />,
  },
  
  
];

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

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function DashboardLayoutBasic() {
  const router = useDemoRouter("/userList");
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider defaultMode="dark" theme={theme}>
        <CssBaseline />
        <AppProvider navigation={NAVIGATION} router={router}>
          <DashboardLayout
            disableCollapsibleSidebar={true}
            defaultSidebarCollapsed={true}
            branding={{
              title: "نظام مدرسي متكامل",
              homeUrl: "/",
              logo: (
                <LayersIcon
                  sx={{
                    fontSize: 40,
                    color: "primary.main",
                  }}
                />
              ),
            }}
          >
            <PageContainer>
              {router.pathname === "/userList" && <UserListScreen />}
              {router.pathname === "/results" && <ResultsScreen />}
            </PageContainer>
          </DashboardLayout>
        </AppProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
