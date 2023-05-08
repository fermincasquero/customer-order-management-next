import Order from "@/lib/server/models/Order";
import dbConnect from "@/lib/server/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  await dbConnect();

  const id = params.id;

  const order = await Order.findById(id);

  return NextResponse.json(order);
}

export async function PUT(request: NextRequest, { params }: any) {
  await dbConnect();

  const id = params.id;

  const data = await request.json();

  const order = await Order.findByIdAndUpdate(id, data, { new: true });

  return NextResponse.json(order);
}

export async function DELETE(request: NextRequest, { params }: any) {
  await dbConnect();

  const id = params.id;

  await Order.findByIdAndDelete(id);

  return NextResponse.json({ result: "ok" });
}
