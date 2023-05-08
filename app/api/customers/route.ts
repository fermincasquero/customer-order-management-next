import { NextResponse, NextRequest } from "next/server";

import Customer from "@/lib/server/models/Customer";
import dbConnect from "@/lib/server/mongoose";

export async function GET() {
  await dbConnect();

  const customers = await Customer.find();

  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  await dbConnect();

  const customer = await request.json();

  const newCustomer = await Customer.create(customer);

  return NextResponse.json(newCustomer);
}
