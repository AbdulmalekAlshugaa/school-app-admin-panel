import * as React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface RowRadioButtonsGroupProps {
  children: React.ReactNode;
  title: string;
}

export default function RowRadioButtonsGroup({
  children,
  title = "الجنس",
}: RowRadioButtonsGroupProps) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {children}
      </RadioGroup>
    </FormControl>
  );
}
