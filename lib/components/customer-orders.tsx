"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Customer } from "@/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import Add from "@mui/icons-material/Add";
import dayjs from "dayjs";
import OrderModal from "./order-modal";
import { Delete, Visibility } from "@mui/icons-material";
import Link from "next/link";
import Axios from "axios";
import { mutate } from "swr";

export default function CustomerOrders({ data }: { data: Customer }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (id: string) => async () => {
    await Axios.delete(`/api/orders/${id}`);

    mutate(["/api/customers", data.id]);
  };

  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        field: "_id",
        headerName: "No",
        filterable: false,
        renderCell: (index) => index.api.getRowIndexRelativeToVisibleRows(index.row.id) + 1,
      },
      {
        field: "customer",
        headerName: "Customer",
        flex: 1,
        renderCell: () => {
          return <Typography>{data.username}</Typography>;
        },
      },
      {
        field: "dateOrdered",
        width: 150,
        headerName: "Date Ordered",
        renderCell: ({ value }) => {
          return <Typography>{dayjs(value).format("MM/DD/YYYY")}</Typography>;
        },
      },
      {
        field: "dateCompleted",
        width: 150,
        headerName: "Date Completed",
        renderCell: ({ value }) => {
          return <Typography>{dayjs(value).format("MM/DD/YYYY")}</Typography>;
        },
      },
      {
        field: "id",
        headerName: "Action",
        sortable: false,
        headerAlign: "center",
        renderCell: ({ value }) => {
          return (
            <Stack direction="row" justifyContent="center">
              <IconButton component={Link} href={`/orders/${value}`}>
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
  }, []);

  return (
    <Box mt={4}>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h6">Orders</Typography>
        <IconButton onClick={() => setModalOpen(true)} color="primary">
          <Add />
        </IconButton>
      </Stack>

      {data?.orders?.length ? (
        <DataGrid columns={columns} rows={data.orders} getRowId={(row) => row.id} />
      ) : (
        <Typography mt={2}>No Orders</Typography>
      )}

      {modalOpen ? <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} customer={data} /> : null}
    </Box>
  );
}
