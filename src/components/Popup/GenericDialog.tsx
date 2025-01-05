import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Slide } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

interface GenericDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  componentType: React.ElementType;
  style?: React.CSSProperties;
}

export default function GenericDialog({
  openDialog,
  setOpenDialog,
  title,
  children,
  componentType = "form", // Default value here,
  style: overrideStyle = {},
}: GenericDialogProps) {
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Slide}
        transitionDuration={300} // Animation duration
        PaperProps={{
          sx: overrideStyle,
          component: componentType,
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            handleClose();
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <CloseRounded
            style={{
              cursor: "pointer",
              margin: "1rem",
            }}
            onClick={handleClose}
          />
        </Box>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
