export interface StatCard {
  id: string;
  title: string;
  amount: string;
  count: number;
  status: "paid" | "overdue" | "draft" | "unpaid";
}

export interface ActionCard {
  id: string;
  title: string;
  description: string;
  variant: "primary" | "secondary";
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  dueDate: string;
  amount: string;
  status: "paid" | "overdue" | "draft" | "pending";
}

export interface InvoiceGroup {
  date: string;
  invoices: Invoice[];
}

export interface Activity {
  id: string;
  title: string;
  timestamp: string;
  description: string;
}

export const mockStats: StatCard[] = [
  {
    id: "1",
    title: "TOTAL PAID",
    amount: "$4,120,102.76",
    count: 1289,
    status: "paid",
  },
  {
    id: "2",
    title: "TOTAL OVERDUE",
    amount: "$23,000.13",
    count: 13,
    status: "overdue",
  },
  {
    id: "3",
    title: "TOTAL DRAFT",
    amount: "$12,200.00",
    count: 8,
    status: "draft",
  },
  {
    id: "4",
    title: "TOTAL UNPAID",
    amount: "$87,102.00",
    count: 6,
    status: "unpaid",
  },
];

export const mockActions: ActionCard[] = [
  {
    id: "1",
    title: "Create New Invoice",
    description: "Create new invoices easily",
    variant: "primary",
  },
  {
    id: "2",
    title: "Change Invoice settings",
    description: "Customise your invoices",
    variant: "secondary",
  },
  {
    id: "3",
    title: "Manage Customer list",
    description: "Add and remove customers",
    variant: "secondary",
  },
];

export const mockRecentInvoices: InvoiceGroup[] = [
  {
    date: "TODAY - 27TH NOVEMBER, 2022",
    invoices: [
      {
        id: "1",
        invoiceNumber: "Invoice - 1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: "$1,311,750.12",
        status: "paid",
      },
      {
        id: "2",
        invoiceNumber: "Invoice - 1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: "$1,311,750.12",
        status: "overdue",
      },
    ],
  },
  {
    date: "8TH DECEMBER, 2022",
    invoices: [
      {
        id: "3",
        invoiceNumber: "Invoice - 1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: "$1,311,750.12",
        status: "draft",
      },
      {
        id: "4",
        invoiceNumber: "Invoice - 1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: "$1,311,750.12",
        status: "pending",
      },
      {
        id: "5",
        invoiceNumber: "Invoice - 1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: "$1,311,750.12",
        status: "paid",
      },
    ],
  },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice 00239434/Olaniyi Ojo Adewale",
  },
  {
    id: "2",
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice 00239434/Olaniyi Ojo Adewale",
  },
  {
    id: "3",
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice 00239434/Olaniyi Ojo Adewale",
  },
  {
    id: "4",
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice 00239434/Olaniyi Ojo Adewale",
  },
];
