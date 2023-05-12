import { useEffect, useState } from "react";
import { Order } from "@/types";
import { Controller, useForm } from "react-hook-form";
import useCustomers from "../hooks/useCustomers";
import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Axios from "axios";
import { mutate } from "swr";
import dayjs from "dayjs";

export default function OrderView({ data }: { data: Order }) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { isDirty },
    reset,
  } = useForm<Order>({
    defaultValues: {
      ...data,
      dateOrdered: dayjs(data.dateOrdered).format("yyyy-MM-dd"),
      dateCompleted: dayjs(data.dateCompleted).format("YYYY-MM-DD"),
    },
  });
  const { data: customers } = useCustomers();

  const items = watch("items") || [];
  const [itemName, setItemName] = useState("");
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    reset({
      ...data,
      dateOrdered: dayjs(data.dateOrdered).format("YYYY-MM-DD"),
      dateCompleted: dayjs(data.dateCompleted).format("YYYY-MM-DD"),
    });
  }, [data]);

  const handleUpdate = async (values: any) => {
    const res = await Axios.put(`/api/orders/${data.id}`, values);

    mutate(["/api/orders", data.id]);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <Controller
        control={control}
        name="customer"
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            options={customers || []}
            value={value}
            onChange={(e, newValue) => onChange(newValue)}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.username}
                </li>
              );
            }}
            getOptionLabel={(option) => option.username}
            renderInput={(params) => <TextField {...params} label="Customer" variant="standard" />}
          />
        )}
      />
      <Controller
        control={control}
        name="dateOrdered"
        render={({ field: { value, onChange } }) => (
          <TextField
            type="date"
            variant="standard"
            label="Date Ordered"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <TextField
        type="date"
        variant="standard"
        label="Date Completed"
        {...register("dateCompleted")}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mt: 2 }}
      />

      <Typography mt={2}>Items</Typography>

      {items.map((item, index) => (
        <Stack key={index} direction="row" mt={1} gap={2}>
          <Stack flex={1} gap={1} direction="row">
            <TextField variant="standard" value={item.name} disabled sx={{ flex: 1 }} />
            <TextField variant="standard" value={item.count} disabled sx={{ flex: 1 }} />
          </Stack>

          <Button
            color="error"
            variant="contained"
            onClick={() =>
              setValue(
                "items",
                items.filter((_, idx) => idx !== index),
                { shouldDirty: true }
              )
            }
          >
            <Remove />
          </Button>
        </Stack>
      ))}

      <Stack direction="row" mt={2} gap={2}>
        <Stack flexGrow={1} direction="row" gap={1}>
          <TextField
            value={itemName}
            label="Name"
            onChange={(event) => setItemName(event.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            type="number"
            value={itemCount || 0}
            label="Count"
            onChange={(event) => setItemCount(parseInt(event.target.value))}
            sx={{ flex: 1 }}
          />
        </Stack>

        <Button
          variant="contained"
          color="primary"
          disabled={!itemCount}
          onClick={() => setValue("items", [...items, { name: itemName, count: itemCount }], { shouldDirty: true })}
        >
          <Add />
        </Button>
      </Stack>

      {isDirty && (
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }} disabled={!items.length}>
          Update Order
        </Button>
      )}
    </form>
  );
}
