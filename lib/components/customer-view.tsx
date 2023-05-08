"use client";

import { Box } from "@/lib/mui/material";
import CustomerProfile from "./CustomerProfile";
import { Customer } from "@/types";

export default function CustomerView({ data }: { data: Customer }) {
  return (
    <Box mt="4">
      <CustomerProfile data={data} />
    </Box>
  );
}
