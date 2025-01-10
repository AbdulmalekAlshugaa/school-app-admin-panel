import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
interface navBarProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function NavBar(props:navBarProps) {


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.setValue(newValue);
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
          value={props.value}
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
    </Box>
  );
}
