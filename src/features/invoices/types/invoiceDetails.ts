import type { Activity } from "../data/mockDashboard";

export interface InvoiceItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface InvoiceDetails {
  id: string;
  invoiceNumber: string;
  status: "paid" | "overdue" | "draft" | "pending" | "partial";
  issueDate: string;
  dueDate: string;
  billingCurrency: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  discountPercentage?: number;
  totalAmount: number;
  sender: {
    name: string;
    phone: string;
    address: string;
    email: string;
    logo?: string;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
    address?: string;
  };
  paymentInfo: {
    accountName: string;
    accountNumber: string;
    achRoutingNumber: string;
    bankName: string;
    bankAddress?: string;
  };
  note?: string;
  reminders: string[];
  activities: Activity[];
}

