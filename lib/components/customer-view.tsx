"use client";

import { Box, Divider } from "@/lib/mui/material";
import CustomerProfile from "./customer-profile";
import { Customer } from "@/types";
import CustomerOrders from "./customer-orders";

export default function CustomerView({ data }: { data: Customer }) {
  return (
    <Box mt="4">
      <CustomerProfile data={data} />

      <Divider sx={{ mt: 4 }} />

      <CustomerOrders data={data} />
    </Box>
  );
}
