"use client";

import { useParams } from "next/navigation";
import { Box, Typography } from "@/lib/mui/material";
import { useCustomer } from "@/lib/hooks/useCustomers";
import CustomerView from "@/lib/components/customer-view";

export default function Customer() {
  const { id } = useParams();

  const { data, isLoading } = useCustomer(id);

  if (isLoading) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box border={1} borderColor="lightgray" borderRadius={2} p={4} mt={4}>
      {data ? <CustomerView data={data} /> : null}
    </Box>
  );
}
