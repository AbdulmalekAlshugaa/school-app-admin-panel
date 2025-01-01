import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface GenericDialogProps {
  openDialog: boolean;
  title: string;
  children: React.ReactNode;
  componentType: React.ElementType;
}

export default function GenericDialog({
  openDialog,
  title,
  children,
  componentType = "form", // Default value here
}: GenericDialogProps) {
  const handleClose = () => {
    console.log("Handle close button");
  };
  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          component: componentType,
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
