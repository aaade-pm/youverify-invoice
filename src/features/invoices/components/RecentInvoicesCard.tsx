import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceRow } from "./InvoiceRow";
import { InvoiceDetailsModal } from "./InvoiceDetailsModal";
import { fetchInvoiceDetails } from "../api/invoices.api";
import type { InvoiceGroup, Invoice } from "../data/mockDashboard";
import { FileText, Plus } from "lucide-react";

interface RecentInvoicesCardProps {
  invoices: InvoiceGroup[];
  isLoading?: boolean;
}

export function RecentInvoicesCard({
  invoices,
  isLoading,
}: RecentInvoicesCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );

  // Fetch invoice details when an invoice is selected
  const {
    data: invoiceDetails,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
  } = useQuery({
    queryKey: ["invoice", selectedInvoiceId],
    queryFn: () => fetchInvoiceDetails(selectedInvoiceId!),
    enabled: !!selectedInvoiceId,
    retry: 0,
    staleTime: 30000,
  });

  const handleInvoiceClick = (invoice: Invoice) => {
    setSelectedInvoiceId(invoice.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoiceId(null);
  };
  if (isLoading) {
    return (
      <Card className="bg-white border-none shadow-none rounded-[40px] h-full flex flex-col min-h-[400px] max-h-[600px]">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden min-h-0">
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (invoices.length === 0) {
    return (
      <Card className="bg-white border-none shadow-none rounded-[40px] h-full flex flex-col min-h-[400px] max-h-[600px]">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first invoice
            </p>
            <Button className="bg-cichild-blue hover:bg-cichild-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-white border-none shadow-none rounded-[40px] pb-6  h-full flex flex-col min-h-[400px] max-h-[600px]">
        <CardHeader className="flex md:flex-row md:items-center gap-4 md:gap-0 justify-between pb-4">
          <CardTitle className="text-xl font-semibold text-black">
            Recent Invoices
          </CardTitle>
          <Button className="text-cichild-blue border border-light-grey-2 text-xs font-medium rounded-4xl hover:shadow-sm">
            VIEW ALL INVOICES
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden min-h-0 p-0">
          <ScrollArea className="h-full">
            <div className="px-4 sm:px-6 flex flex-col gap-3">
              {invoices.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h4 className="text-sm font-semibold text-black mb-6">
                    {group.date}
                  </h4>
                  <div className="flex flex-col gap-6">
                    {group.invoices.map((invoice) => (
                      <InvoiceRow
                        key={invoice.id}
                        invoice={invoice}
                        onClick={() => handleInvoiceClick(invoice)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <InvoiceDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        invoice={invoiceDetails || null}
        isLoading={isLoadingDetails}
        isError={isErrorDetails}
      />
    </>
  );
}
