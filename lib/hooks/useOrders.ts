"use client";

import useSWR from "swr";
import Axios from "axios";
import { Order } from "@/types";

export default function useOrders() {
  return useSWR("/api/orders", async () => {
    const response = await Axios.get<Order[]>("/api/orders");

    return response.data;
  });
}

export function useOrder(id: string) {
  return useSWR(["/api/orders", id], async () => {
    const response = await Axios.get<Order>(`/api/orders/${id}`);

    return response.data;
  });
}
