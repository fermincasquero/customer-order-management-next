import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Add from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";
import { Customer, Order } from "@/types";
import { useEffect, useState } from "react";
import { Autocomplete, Stack, Typography } from "@mui/material";
import useCustomers from "../hooks/useCustomers";
import { Remove } from "@mui/icons-material";
import Axios from "axios";
import { mutate } from "swr";

type Props = {
  open: boolean;
  onClose: () => void;
  customer?: Customer;
};

export default function OrderModal({ open, onClose, customer }: Props) {
  const { handleSubmit, register, watch, setValue, control, resetField } = useForm<Order>({});
  const [itemName, setItemName] = useState("");
  const [itemCount, setItemCount] = useState(0);

  const { data } = useCustomers();

  useEffect(() => {
    if (customer) {
      const { orders, ...rest } = customer;
      resetField("customer", { defaultValue: rest });
    }
  }, [customer]);

  const items = watch("items") || [];

  const handleAdd = async (values: any) => {
    await Axios.post("/api/orders", values);

    if (customer) {
      mutate(["/api/customers", customer.id]);
    }
    mutate("/api/orders");

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add an Order</DialogTitle>
      <form onSubmit={handleSubmit(handleAdd)}>
        <DialogContent>
          <Controller
            control={control}
            name="customer"
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={data || []}
                value={value}
                disabled={!!customer}
                onChange={(e, newValue) => onChange(newValue)}
                getOptionLabel={(option) => option.username}
                renderInput={(params) => <TextField {...params} label="Customer" variant="standard" />}
              />
            )}
          />
          <TextField
            type="date"
            variant="standard"
            label="Date Ordered"
            {...register("dateOrdered")}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            type="date"
            variant="standard"
            label="Date Completed"
            {...register("dateCompleted")}
            fullWidth
            sx={{ mt: 2 }}
          />

          <Typography mt={2}>Items</Typography>

          {items.map((item, index) => (
            <Stack key={index} direction="row" mt={1} gap={2}>
              <Stack flex={1} gap={1} direction="row">
                <TextField variant="standard" value={item.name} disabled />
                <TextField variant="standard" value={item.count || 0} disabled />
              </Stack>

              <Button
                color="error"
                variant="contained"
                onClick={() =>
                  setValue(
                    "items",
                    items.filter((_, idx) => idx !== index)
                  )
                }
              >
                <Remove />
              </Button>
            </Stack>
          ))}

          <Stack direction="row" mt={2} gap={2}>
            <Stack flex={1} direction="row" gap={1}>
              <TextField value={itemName} label="Name" onChange={(event) => setItemName(event.target.value)} />
              <TextField
                type="number"
                value={itemCount}
                label="Count"
                onChange={(event) => setItemCount(parseInt(event.target.value))}
              />
            </Stack>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setValue("items", [...items, { name: itemName, count: itemCount }])}
            >
              <Add />
            </Button>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!items.length}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
