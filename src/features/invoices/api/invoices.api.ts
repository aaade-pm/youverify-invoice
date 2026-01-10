import type { StatCard, InvoiceGroup, Activity } from "../data/mockDashboard";

export interface DashboardResponse {
  stats: StatCard[];
  recentInvoices: InvoiceGroup[];
  recentActivities: Activity[];
}

export async function fetchStats(): Promise<StatCard[]> {
  const response = await fetch("/api/invoices/stats");

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  return response.json();
}

export async function fetchRecentInvoices(): Promise<InvoiceGroup[]> {
  const response = await fetch("/api/invoices/recent");

  if (!response.ok) {
    throw new Error("Failed to fetch recent invoices");
  }

  return response.json();
}

export async function fetchRecentActivities(): Promise<Activity[]> {
  const response = await fetch("/api/invoices/activities");

  if (!response.ok) {
    throw new Error("Failed to fetch recent activities");
  }

  return response.json();
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
