"use client";

import { Avatar, Box, Button, IconButton, Stack, Typography } from "@/lib/mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Add, Delete, Visibility } from "@mui/icons-material";
import Link from "next/link";
import { mutate } from "swr";
import Axios from "axios";
import useOrders from "@/lib/hooks/useOrders";
import OrderModal from "@/lib/components/order-modal";

export default function Customers() {
  const { data } = useOrders();

  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = (id: string) => async () => {
    await Axios.delete(`/api/orders/${id}`);

    mutate("/api/orders");
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
        renderCell: ({ value }) => {
          return <Typography>{value?.username}</Typography>;
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
              <IconButton component={Link} href={`/orders/${value}`} prefetch={false}>
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
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h6">Orders</Typography>

        <Button onClick={() => setModalOpen(true)} color="primary" variant="contained">
          <Add />
        </Button>
      </Stack>

      {data?.length ? (
        <DataGrid columns={columns} rows={data} getRowId={(row) => row.id} rowSelection={false} sx={{ mt: 2 }} />
      ) : (
        <Typography mt={2}>No Orders</Typography>
      )}

      {modalOpen ? <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} /> : null}
    </Box>
  );
}
