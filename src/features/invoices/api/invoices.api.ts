import type { StatCard, InvoiceGroup, Activity } from "../data/mockDashboard";
import type { InvoiceDetails } from "../types/invoiceDetails";
import {
  mockStats,
  mockRecentInvoices,
  mockActivities,
} from "../data/mockDashboard";
import { mockInvoiceDetails } from "../data/mockInvoiceDetails";

export interface DashboardResponse {
  stats: StatCard[];
  recentInvoices: InvoiceGroup[];
  recentActivities: Activity[];
}

async function fetchJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return fallback;
    }

    return response.json();
  } catch {
    return fallback;
  }
}

export async function fetchStats(): Promise<StatCard[]> {
  return fetchJson<StatCard[]>("/api/invoices/stats", mockStats);
}

export async function fetchRecentInvoices(): Promise<InvoiceGroup[]> {
  return fetchJson<InvoiceGroup[]>("/api/invoices/recent", mockRecentInvoices);
}

export async function fetchRecentActivities(): Promise<Activity[]> {
  return fetchJson<Activity[]>("/api/invoices/activities", mockActivities);
}

export async function fetchDashboardData(): Promise<DashboardResponse> {
  const [stats, recentInvoices, recentActivities] = await Promise.all([
    fetchStats(),
    fetchRecentInvoices(),
    fetchRecentActivities(),
  ]);

  return {
    stats,
    recentInvoices,
    recentActivities,
  };
}

function getFallbackInvoiceDetails(invoiceId: string): InvoiceDetails {
  const invoice = mockRecentInvoices
    .flatMap((group) => group.invoices)
    .find((inv) => inv.id === invoiceId);

  if (!invoice) {
    return {
      ...mockInvoiceDetails,
      id: invoiceId,
    };
  }

  return {
    ...mockInvoiceDetails,
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    status: invoice.status === "pending" ? "pending" : invoice.status,
    dueDate: invoice.dueDate,
    issueDate: invoice.dueDate,
  };
}

export async function fetchInvoiceDetails(
  invoiceId: string
): Promise<InvoiceDetails> {
  return fetchJson<InvoiceDetails>(
    `/api/invoices/${invoiceId}`,
    getFallbackInvoiceDetails(invoiceId)
  );
}
