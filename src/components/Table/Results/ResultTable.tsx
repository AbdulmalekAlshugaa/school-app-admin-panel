import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { RowData } from "./types";
import GenericDialog from "../../Popup/GenericDialog";
import {
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Radio,
  TextField,
} from "@mui/material";
import DropDownList from "../../DropDownList/DropDownList";
import RowRadioButtonsGroup from "../../RadioButton/RowRadioButtonsGroup";
import useAddingUserResult from "../../../hooks/useAddingUser";
import LoadingButton from "@mui/lab/LoadingButton";
import AlertMessage from "../../Toast/AlertMessage";

interface ResultTableProps {
  rows: RowData[];
  subjects: [];
  setRows?: (newRows: RowData[]) => void;
}

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

export default function ResultTableCrudGrid(props: ResultTableProps) {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [studyYear, setStudyYear] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [score, setScore] = React.useState("");
  const [isSuccessPopup, setIsSuccessPopup] = React.useState(false);
  const { mutate, isPending } = useAddingUserResult();

  const handleAddingResult = async () => {
    const data = {
      year: studyYear,
      userId: "6776bc0881fe8d4fa889f672",
      subjectId: subject,
      term: parseInt(term),
      score: parseInt(score),
    };

    mutate(data);
    mutate(data, {
      onSuccess: () => {
        setOpenDialog(false);
        setStudyYear("");
        setSubject("");
        setTerm("");
        setScore("");
        setIsSuccessPopup(true);
      },
      onError: (error) => {
        console.error("Error adding result:", error);
        // Handle error state if needed
      },
    });
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    //setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow!.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    //setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  function EditToolbar() {
    const handleClick = () => {
      setOpenDialog(true);
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          اضافة
        </Button>
      </GridToolbarContainer>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "المادة الدراسية",
      width: 180,
      type: "singleSelect",
      valueOptions: props.subjects.map((subject: any) => subject.name),
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "firstTerm",
      headerName: "الفصل الدراسي الاول",
      type: "number",
      width: 120,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "secondTerm",
      headerName: "الفصل الدراسي الثاني",
      type: "number",
      width: 120,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "finalMarks",
      headerName: "العلامة النهائية",
      type: "number",
      width: 120,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "الحالة",
      width: 120,
      editable: false,
      type: "singleSelect",
      valueOptions: ["ناجح", "راسب"],
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "العمليات",
      width: 100,
      cellClassName: "actions",
      align: "center",
      headerAlign: "center",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "green",
                "&:hover": {
                  color: "darkgreen",
                },
                marginRight: 1,
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              sx={{
                color: "red",
                "&:hover": {
                  color: "darkred",
                },
                marginLeft: 1,
              }}
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            sx={{
              color: "grey",
              "&:hover": {
                color: "darkblue",
              },
              marginRight: 1,
            }}
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .actions": {
      color: theme.palette.text.secondary,
    },
    "& .textPrimary": {
      color: theme.palette.text.primary,
    },
  }));

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <AlertMessage
        setOpen={setIsSuccessPopup}
        open={isSuccessPopup}
        message="تم اضافة النتيجة بنجاح"
      />
      <GenericDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="اضافة جديد"
        componentType="form"
        style={{
          borderRadius: 4,
          flex: 1,
          flexDirection: "column",
          animation: "grow 0.3s ease-out",
        }}
      >
        <Grid2
          spacing={{
            xs: 2,
            sm: 3,
            md: 4,
          }}
          marginBottom={2}
        >
          <RowRadioButtonsGroup
            setSelectedValue={(val) => {
              setTerm(val);
            }}
            selectedValue={term}
            title="الفصل الدراسي"
          >
            <FormControlLabel value={1} control={<Radio />} label="الاول" />
            <FormControlLabel value={2} control={<Radio />} label="الثاني" />
          </RowRadioButtonsGroup>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              اختار السنة الدراسية{" "}
            </InputLabel>
            <DropDownList
              setValue={(value) => {
                setStudyYear(value);
              }}
              label="اختار السنة الدراسية"
              value={studyYear}
            >
              <MenuItem value={"2024-2025"}>2024-2025</MenuItem>
              <MenuItem value={"2025-2026"}> 2025-2026</MenuItem>
              <MenuItem value={"2026-2027"}> 2026-2027</MenuItem>
            </DropDownList>
          </FormControl>

          <FormControl sx={{ marginTop: 3 }} fullWidth>
            <InputLabel id="subject-select-label">
              اختار المادة الدراسية{" "}
            </InputLabel>
            <DropDownList
              setValue={(value) => {
                setSubject(value);
              }}
              label="اختار المادة الدراسية"
              value={subject}
            >
              {props.subjects.map((subject: any) => (
                <MenuItem value={subject._id}>{subject.name}</MenuItem>
              ))}
            </DropDownList>
          </FormControl>
        </Grid2>
        <Grid2
          marginBottom={2}
          sx={{
            minWidth: "300px", // Set minimum width
            flexGrow: 1, // Allow
          }}
        >
          <TextField
            variant="outlined"
            required
            value={score}
            onChange={(e) => setScore(e.target.value)}
            id="score"
            label="العلامة"
            name=" العلامة"
            fullWidth
          />
        </Grid2>
        <LoadingButton
          loading={isPending}
          variant="contained"
          sx={{ mt: 3, width: "100%", flexGrow: 1 }}
          onClick={handleAddingResult}
        >
          اضافه النتيجة
        </LoadingButton>
      </GenericDialog>
      <StyledDataGrid
        rows={props.rows}
        style={{ direction: "rtl" }}
        columns={columns}
        editMode="row"
        sx={{
          "& .MuiDataGrid-columnsContainer": {
            backgroundColor: "primary.light",
          },
        }}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        hideFooterPagination={true}
        slots={{ toolbar: EditToolbar }}
      />
    </Box>
  );
}