"use client";

import { Box, Stack, Typography } from "@/lib/mui/material";
import CustomersTable from "@/lib/components/customers-table";
import CustomerModal from "@/lib/components/customer-modal";
import useCustomers from "@/lib/hooks/useCustomers";

export default function Customers() {
  const { data } = useCustomers();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h6">Customers</Typography>

        <CustomerModal />
      </Stack>

      {data?.length ? <CustomersTable items={data} /> : <Typography mt={2}>No Customers</Typography>}
    </Box>
  );
}
