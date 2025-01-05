import { Select } from "@mui/material";
import React from "react";

interface DropDownListProps {
  value: string;
  setValue: (value: string) => void;
  children?: React.ReactNode;
  label: string;
}

function DropDownList(props: DropDownListProps) {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={props.value}
      label={props.label}
      onChange={(e) => props.setValue(e.target.value)}
    >
      {props.children}
    </Select>
  );
}

export default DropDownList;
