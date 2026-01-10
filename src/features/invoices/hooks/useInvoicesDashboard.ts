import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../api/invoices.api";

export function useInvoicesDashboard() {
  return useQuery({
    queryKey: ["invoices", "dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 30000,
  });
}
