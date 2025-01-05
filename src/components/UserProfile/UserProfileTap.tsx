import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
interface UserProfileTapProps {
  children: React.ReactNode;
  index: number;
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
}
export default function UserProfileTap(props: UserProfileTapProps) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.gray" }}>
      <AppBar
        sx={{
          backgroundColor: "#C5C5C5",
          color: "black",

          justifyContent: "center",
          alignContent: "center",
          borderRadius: 1,
        }}
        position="static"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
            label="النتائج"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
            label="المواد الدراسية "
            {...a11yProps(1)}
          />
          <Tab
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
            label="الحضور"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={props.index} dir={theme.direction}>
        {props.children}
      </TabPanel>
    </Box>
  );
}
