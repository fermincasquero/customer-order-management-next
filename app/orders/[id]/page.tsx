"use client";

import { useParams } from "next/navigation";
import { Box, Typography } from "@/lib/mui/material";
import { useOrder } from "@/lib/hooks/useOrders";
import OrderView from "@/lib/components/order-view";

export default function Customer() {
  const { id } = useParams();
  const { data, isLoading } = useOrder(id);

  if (isLoading) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box border={1} borderColor="lightgray" borderRadius={2} p={4} mt={4}>
      <Box mt="4">{!!data ? <OrderView data={data} /> : null}</Box>
    </Box>
  );
}
