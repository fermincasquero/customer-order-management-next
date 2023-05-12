"use client";

import Link from "next/link";
import { AppBar, Toolbar, Button } from "@/lib/mui/material";

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button variant="text" sx={{ color: "white" }} component={Link} href="/customers">
          Customers
        </Button>
        <Button variant="text" sx={{ color: "white" }} component={Link} href="/orders">
          Orders
        </Button>
      </Toolbar>
    </AppBar>
  );
}
