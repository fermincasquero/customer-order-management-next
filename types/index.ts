export type Customer = {
  name: string;
  username: string;
  id: string;
  orders?: Order[];
};

export type Order = {
  items: { name: string; count: number }[];
  dateOrdered: string;
  dateCompleted: string | null;
  customer: Customer;
};
