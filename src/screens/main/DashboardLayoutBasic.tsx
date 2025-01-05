import * as React from "react";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Class, People, Quiz, School, SchoolRounded } from "@mui/icons-material";
import UserListScreen from "./UserListScreen";
import ResultsScreen from "./ResultsScreen";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import TeachersScreen from "./TeachersScreen";
import SubjectsScreen from "./SubjectsScreen";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "القائمة",
  },
  {
    kind: "divider",
  },
  {
    segment: "dashboard",
    title: "لوحة التحكم",
    icon: <LayersIcon />,
  },

  {
    segment: "teacherList",
    title: "المعلمين",
    icon: <People />,
  },
  {
    segment: "studentList",
    title: "الطلاب",
    icon: <SchoolRounded />,
  },
  {
    segment: "classes",
    title: "الصفوف الدراسيه",
    icon: <Class />,
  },
  {
    segment: "subjects",
    title: "مواد دراسية ",
    icon: <School />,
  },
  {
    segment: "results",
    title: "النتائج",
    icon: <Quiz />,
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
      <ThemeProvider defaultMode="light" theme={theme}>
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
              {router.pathname === "/studentList" && <UserListScreen />}
              {router.pathname === "/teacherList" && <TeachersScreen />}
              {router.pathname === "/results" && <ResultsScreen />}
              {router.pathname === "/subjects" && <SubjectsScreen/>}

            </PageContainer>
          </DashboardLayout>
        </AppProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
