import { Card, CardContent } from "@/components/ui/card";
import type { InvoiceDetails } from "../types/invoiceDetails";
import { InvoiceLogo } from "@/components/icons/invoiceLogo";

interface InvoiceSummaryCardProps {
  invoice: InvoiceDetails;
}

export function InvoiceSummaryCard({ invoice }: InvoiceSummaryCardProps) {
  return (
    <Card className="bg-pastel-pink border-none shadow-none rounded-4xl p-1">
      <CardContent className="space-y-10 pt-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between">
          {/* Sender */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold text-grey uppercase tracking-wider">
                SENDER
              </h4>
            </div>
            <div className="flex  gap-2">
              <InvoiceLogo />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-black">
                    {invoice.sender.name}
                  </p>
                </div>
                <p className="text-xs text-grey">{invoice.sender.phone}</p>
                <p className="text-xs text-grey">{invoice.sender.address}</p>
                <p className="text-xs text-grey">{invoice.sender.email}</p>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-grey uppercase tracking-wider">
              CUSTOMER
            </h4>
            <div className="space-y-2">
              <p className="text-sm font-medium text-black">
                {invoice.customer.name}
              </p>
              <p className="text-xs text-grey">{invoice.customer.phone}</p>
              {invoice.customer.address && (
                <p className="text-xs text-grey">{invoice.customer.address}</p>
              )}
              <p className="text-xs text-grey">{invoice.customer.email}</p>
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold text-grey uppercase mb-3">
          INVOICE DETAILS
        </p>

        {/* Invoice Metadata */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "INVOICE NO",
              value: invoice.invoiceNumber.split(" - ").slice(1).join(" - "),
            },
            {
              label: "ISSUE DATE",
              value: invoice.issueDate,
            },
            {
              label: "DUE DATE",
              value: invoice.dueDate,
            },
            {
              label: "BILLING CURRENCY",
              value: invoice.billingCurrency,
            },
          ].map((item, index) => (
            <div key={index}>
              <p className="text-xs font-normal text-neutral-grey mb-1">
                {item.label}
              </p>
              <p className="text-sm font-medium text-black">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
