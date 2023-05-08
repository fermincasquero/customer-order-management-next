import { Box, Button, Stack, Typography } from "@/lib/mui/material";
import { Add } from "@/lib/mui/icons";
import CustomersTable from "@/lib/components/customers-table";

async function getCustomers() {
  const res = await fetch("http://localhost:3000/api/customers");

  return res.json();
}

export default async function Customers() {
  const customersData = await getCustomers();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h6">Customers</Typography>
        <Button variant="contained" color="primary">
          <Add sx={{ mr: 1 }} />
          Customer
        </Button>
      </Stack>

      <CustomersTable items={customersData} />
    </Box>
  );
}
