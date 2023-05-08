"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Customer } from "@/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import Add from "@mui/icons-material/Add";
import dayjs from "dayjs";
import OrderModal from "./order-modal";

export default function CustomerOrders({ data }: { data: Customer }) {
  const [modalOpen, setModalOpen] = useState(false);

  const columns: GridColDef[] = useMemo(() => {
    return [
      {
        field: "id",
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
