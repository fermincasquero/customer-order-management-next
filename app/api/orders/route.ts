import { NextResponse, NextRequest } from "next/server";

import Order from "@/lib/server/models/Order";
import dbConnect from "@/lib/server/mongoose";

export async function GET() {
  await dbConnect();

  const orders = await Order.find();

  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  await dbConnect();

  const order = await request.json();

  const newOrder = await Order.create(order);

  return NextResponse.json(newOrder);
}
