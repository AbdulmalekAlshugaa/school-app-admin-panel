import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface CustomizedSnackbarProps {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function AlertMessage({
  open,
  message,
  setOpen,
}: CustomizedSnackbarProps) {

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
      <Alert
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
