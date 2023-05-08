"use client";

import { Box, Button, Stack, TextField, Typography } from "@/lib/mui/material";
import { Customer } from "@/types";
import Axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";

export default function CustomerProfile({ data }: { data: Customer }) {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<Customer>({ defaultValues: data });

  const { mutate } = useSWRConfig();

  useEffect(() => {
    reset(data);
  }, [data]);

  const handleUpdate: SubmitHandler<Customer> = async (values) => {
    await Axios.put(`/api/customers/${data.id}`, values);

    mutate(["/api/customers", data.id]);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <Typography variant="h6">User Info</Typography>

      <Box mt={2}>
        <TextField autoFocus margin="dense" id="name" label="User" fullWidth variant="standard" {...register("name")} />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Username"
          fullWidth
          variant="standard"
          sx={{ mt: 2 }}
          {...register("username")}
        />
      </Box>

      {isDirty ? (
        <Stack justifyContent="flex-end" mt={2} direction="row">
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Stack>
      ) : null}
    </form>
  );
}
