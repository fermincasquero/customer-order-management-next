"use client";

import useSWR from "swr";
import Axios from "axios";
import { Customer } from "@/types";

export default function useCustomers() {
  return useSWR("/api/customers", async () => {
    const response = await Axios.get<Customer[]>("/api/customers");

    return response.data;
  });
}

export function useCustomer(id: string) {
  return useSWR(["/api/customers", id], async () => {
    const response = await Axios.get<Customer>(`/api/customers/${id}`);

    return response.data;
  });
}
