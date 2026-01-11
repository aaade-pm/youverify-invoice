import { http, HttpResponse } from "msw";
import type {
  StatCard,
  InvoiceGroup,
  Activity,
} from "@/features/invoices/data/mockDashboard";
import type { InvoiceDetails } from "@/features/invoices/types/invoiceDetails";
import { mockInvoiceDetails } from "@/features/invoices/data/mockInvoiceDetails";

const mockStats: StatCard[] = [
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

const mockRecentInvoices: InvoiceGroup[] = [
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
      {
        id: "6",
        invoiceNumber: "Invoice - 1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: "$1,311,750.12",
        status: "paid",
      },
      {
        id: "7",
        invoiceNumber: "Invoice - 1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: "$1,311,750.12",
        status: "paid",
      },
      {
        id: "8",
        invoiceNumber: "Invoice - 1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: "$1,311,750.12",
        status: "paid",
      },
    ],
  },
];

const mockActivities: Activity[] = [
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
  {
    id: "5",
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice 00239434/Olaniyi Ojo Adewale",
  },
  {
    id: "6",
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice 00239434/Olaniyi Ojo Adewale",
  },
  {
    id: "7",
    title: "Invoice creation",
    timestamp: "Yesterday, 12:05 PM",
    description: "Created invoice 00239434/Olaniyi Ojo Adewale",
  },
];

export const invoiceHandlers = [
  http.get("/api/invoices/stats", async () => {
    return HttpResponse.json<StatCard[]>(mockStats);
  }),
  http.get("/api/invoices/recent", async () => {
    return HttpResponse.json<InvoiceGroup[]>(mockRecentInvoices);
  }),
  http.get("/api/invoices/activities", async () => {
    return HttpResponse.json<Activity[]>(mockActivities);
  }),
  http.get("/api/invoices/:id", async ({ params }) => {
    const id = params.id;

    if (!id || (Array.isArray(id) && id.length === 0)) {
      return HttpResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    const invoiceId = typeof id === "string" ? id : id[0];

    const invoice = mockRecentInvoices
      .flatMap((group) => group.invoices)
      .find((inv) => inv.id === invoiceId);

    if (!invoice) {
      return HttpResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const invoiceDetails: InvoiceDetails = {
      ...mockInvoiceDetails,
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      status: invoice.status === "pending" ? "pending" : invoice.status,
      dueDate: invoice.dueDate,
      issueDate: invoice.dueDate,
    };

    return HttpResponse.json<InvoiceDetails>(invoiceDetails);
  }),
];
