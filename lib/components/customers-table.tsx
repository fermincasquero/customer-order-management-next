"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSWRConfig } from "swr";
import Axios from "axios";
import { DataGrid, GridColDef } from "@/lib/mui/datagrid";
import { IconButton, Stack } from "@/lib/mui/material";
import type { Customer } from "@/types";
import { Delete, Visibility } from "@mui/icons-material";

type Props = {
  items: Customer[];
};

export default function CustomersTable({ items }: Props) {
  const { mutate } = useSWRConfig();

  const handleDelete = (id: number) => async () => {
    await Axios.delete(`/api/customers/${id}`);

    mutate("/api/customers");
  };

  const columns: GridColDef[] = useMemo(() => {
    return [
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
              <IconButton component={Link} href={`/customers/${value}`} prefetch={false}>
                <Visibility />
              </IconButton>

              <IconButton onClick={handleDelete(value)}>
                <Delete />
              </IconButton>
            </Stack>
          );
        },
      },
    ];
  }, [handleDelete]);

  return <DataGrid columns={columns} rows={items} sx={{ mt: 4 }} />;
}
