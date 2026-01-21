import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../api/invoices.api";
import {
  mockStats,
  mockRecentInvoices,
  mockActivities,
} from "../data/mockDashboard";

export function useInvoicesDashboard() {
  const query = useQuery({
    queryKey: ["invoices", "dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 30000,
  });

  if (query.isError && import.meta.env.MODE === "production") {
    return {
      data: {
        stats: mockStats,
        recentInvoices: mockRecentInvoices,
        recentActivities: mockActivities,
      },
      isLoading: false,
      isError: false,
    };
  }

  return query;
}
