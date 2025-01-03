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
  GridSlotProps,
} from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';

// Helper function to generate random ID
const randomId = () => Math.floor(Math.random() * 10000) + 1;

// Generate fake data for the rows
const initialRows: GridRowsProp = [
  {
    id: 1,
    name: "رياضيات", // اسم المادة الدراسية
    firstTerm: 40,
    secondTerm: 30,
    finalMarks: 70,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "فيزياء", // اسم المادة الدراسية
    firstTerm: 35,
    secondTerm: 40,
    finalMarks: 75,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "كيمياء", // اسم المادة الدراسية
    firstTerm: 45,
    secondTerm: 40,
    finalMarks: 85,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "أحياء", // اسم المادة الدراسية
    firstTerm: 25,
    secondTerm: 30,
    finalMarks: 55,
    status: "راسب",
  },
  {
    id: randomId(),
    name: "لغة عربية", // اسم المادة الدراسية
    firstTerm: 50,
    secondTerm: 45,
    finalMarks: 95,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "إنجليزي", // اسم المادة الدراسية
    firstTerm: 60,
    secondTerm: 50,
    finalMarks: 110,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "تاريخ", // اسم المادة الدراسية
    firstTerm: 55,
    secondTerm: 45,
    finalMarks: 100,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "جغرافيا", // اسم المادة الدراسية
    firstTerm: 40,
    secondTerm: 50,
    finalMarks: 90,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "معلوماتية", // اسم المادة الدراسية
    firstTerm: 50,
    secondTerm: 50,
    finalMarks: 100,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "فلسفة", // اسم المادة الدراسية
    firstTerm: 30,
    secondTerm: 40,
    finalMarks: 70,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "علم نفس", // اسم المادة الدراسية
    firstTerm: 60,
    secondTerm: 60,
    finalMarks: 120,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "تربية إسلامية", // اسم المادة الدراسية
    firstTerm: 45,
    secondTerm: 50,
    finalMarks: 95,
    status: "ناجح",
  },
  {
    id: randomId(),
    name: "فن", // اسم المادة الدراسية
    firstTerm: 50,
    secondTerm: 45,
    finalMarks: 95,
    status: "ناجح",
  },
];

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", firstTerm: 0, secondTerm: 0, finalMarks: 0, status: "" },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        اضافة
      </Button>
    </GridToolbarContainer>
  );
}

export default function ResultTableCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

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
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "المادة الدراسية",
      width: 180,
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
      editable: true,
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
      <StyledDataGrid
        rows={rows}
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
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
