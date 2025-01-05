import * as React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface RowRadioButtonsGroupProps {
  children: React.ReactNode;
  title: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function RowRadioButtonsGroup({
  children,
  title = "الجنس",
  selectedValue,
  setSelectedValue,
}: RowRadioButtonsGroupProps) {
  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Update state with the selected value
    console.log("Selected Value:", event.target.value); // Log the selected value
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={selectedValue}
      >
        {children}
      </RadioGroup>
    </FormControl>
  );
}
