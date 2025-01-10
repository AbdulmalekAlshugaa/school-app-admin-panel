import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavBar from "../Navbar/NavBar";

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

interface UserProfileTapProps {
  children: React.ReactNode;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
export default function UserProfileTap(props: UserProfileTapProps) {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "background.gray" }}>
      <NavBar
        setValue={(index = 0) => {
          props.setIndex(index);
        }}
        value={props.index}
      />
      <TabPanel value={props.index} index={props.index} dir={theme.direction}>
        {props.children}
      </TabPanel>
    </Box>
  );
}
