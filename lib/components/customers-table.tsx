"use client";

import { DataGrid, GridColDef } from "@/lib/mui/datagrid";
import { IconButton, Stack } from "@/lib/mui/material";
import type { Customer } from "@/types";
import { Delete, Visibility } from "@mui/icons-material";

type Props = {
  items: Customer[];
};

const columns: GridColDef[] = [
  { field: "name", headerName: "Name" },
  {
    field: "username",
    headerName: "Username",
    flex: 1,
  },
  {
    field: "id",
    headerName: "Action",
    sortable: false,
    headerAlign: "center",
    renderCell: ({ value }) => {
      return (
        <Stack direction="row" justifyContent="center">
          <IconButton>
            <Visibility />
          </IconButton>

          <IconButton>
            <Delete />
          </IconButton>
        </Stack>
      );
    },
  },
];

export default function CustomersTable({ items }: Props) {
  return <DataGrid columns={columns} rows={items} sx={{ mt: 4 }} />;
}
