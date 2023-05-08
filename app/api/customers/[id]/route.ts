import Customer from "@/lib/server/models/Customer";
import dbConnect from "@/lib/server/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  await dbConnect();

  const id = params.id;

  const customer = await Customer.findById(id).populate("orders");

  return NextResponse.json(customer);
}

export async function PUT(request: NextRequest, { params }: any) {
  await dbConnect();

  const id = params.id;

  const data = await request.json();

  const customer = await Customer.findByIdAndUpdate(id, data, { new: true });

  return NextResponse.json(customer);
}

export async function DELETE(request: NextRequest, { params }: any) {
  await dbConnect();

  const id = params.id;

  await Customer.findByIdAndDelete(id);

  return NextResponse.json({ result: "ok" });
}
