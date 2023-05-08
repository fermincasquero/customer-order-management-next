"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import Axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@/lib/mui/material";
import { Add } from "@/lib/mui/icons";

type CustomerFields = {
  username: string;
  name: string;
};

export default function CustomerModal() {
  const [open, setOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const { register, handleSubmit } = useForm<CustomerFields>();

  const handleAdd: SubmitHandler<CustomerFields> = async ({ username, name }) => {
    if (username && name) {
      await Axios.post("/api/customers", { username, name });
      mutate("/api/customers");
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <Add />
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a customer</DialogTitle>
        <form onSubmit={handleSubmit(handleAdd)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="User"
              fullWidth
              variant="standard"
              {...register("name")}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              fullWidth
              variant="standard"
              {...register("username")}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
