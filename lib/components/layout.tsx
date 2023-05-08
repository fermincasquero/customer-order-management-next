import Link from "next/link";
import { AppBar, Toolbar, Button, Container } from "@/lib/mui";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button variant="text" sx={{ color: "white" }} component={Link} href="/customers">
            Customers
          </Button>
          <Button variant="text" sx={{ color: "white" }} component={Link} href="/orders">
            Orders
          </Button>
        </Toolbar>
      </AppBar>

      <Container>{children}</Container>
    </div>
  );
}
