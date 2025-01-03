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

interface RowData {
  id: number;
  name: string;
  firstTerm: number;
  secondTerm: number;
  finalMarks: number;
  status: string;
}

interface ResultTableProps {
  rows: RowData[];
  subjects: [];
  setRows?: (newRows: RowData[]) => void;
}

// Helper function to generate random ID
const randomId = () => Math.floor(Math.random() * 10000) + 1;



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

export default function ResultTableCrudGrid(props:ResultTableProps) {
  // const [rows, setRows] = React.useState([]);
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

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "المادة الدراسية",
      width: 180,
      type:'singleSelect',
      valueOptions: props.subjects,
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
        slotProps={{
          //toolbar: { props.setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
