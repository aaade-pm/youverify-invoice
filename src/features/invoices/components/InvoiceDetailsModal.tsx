import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { InvoiceHeader } from "./InvoiceHeader";
import { InvoiceReminders } from "./InvoiceReminders";
import { InvoiceSummaryCard } from "./InvoiceSummaryCard";
import { InvoiceItemsTable } from "./InvoiceItemsTable";
import { InvoiceTotals } from "./InvoiceTotals";
import { PaymentInformation } from "./PaymentInformation";
import { InvoiceActivityFeed } from "./InvoiceActivityFeed";
import type { InvoiceDetails } from "../types/invoiceDetails";

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: InvoiceDetails | null;
  isLoading?: boolean;
  isError?: boolean;
  onDownloadPDF?: () => void;
  onSendInvoice?: () => void;
  onDuplicate?: () => void;
  onGetShareableLink?: () => void;
}

export function InvoiceDetailsModal({
  isOpen,
  onClose,
  invoice,
  isLoading = false,
  onDownloadPDF,
  onSendInvoice,
  onDuplicate,
  onGetShareableLink,
}: InvoiceDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />

        {/* Desktop close button - outside Content */}
        <DialogClose asChild>
          <button
            type="button"
            className="hidden md:flex fixed top-4 right-4 md:top-2 md:right-2 lg:top-6 lg:right-16 z-100 h-10 w-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors focus:outline-none focus:ring-none focus:ring-offset-0 focus:ring-ring"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Close dialog</span>
          </button>
        </DialogClose>

        <DialogPrimitive.Content className="fixed left-0 top-0 md:left-[50%] md:top-[50%] z-50 md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1100px] w-full h-screen md:h-[90vh] lg:max-h-[85vh] md:translate-x-[-50%] md:translate-y-[-50%] p-0 flex flex-col bg-white overflow-hidden border-0 md:border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-none md:rounded-lg">
          {/* Mobile close button - inside Content */}
          <DialogClose asChild>
            <button
              type="button"
              className="md:hidden absolute right-4 top-4 z-100 h-10 w-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 cursor-pointer transition-colors focus:outline-none focus:ring-none focus:ring-offset-0 focus:ring-ring touch-manipulation"
              style={{ WebkitTapHighlightColor: "transparent" }}
              aria-label="Close dialog"
            >
              <X className="h-5 w-5 text-gray-600 pointer-events-none" />
              <span className="sr-only">Close dialog</span>
            </button>
          </DialogClose>

          <DialogTitle className="sr-only">
            Invoice Details {invoice ? `- ${invoice.invoiceNumber}` : ""}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {invoice
              ? `Invoice details and activity for ${invoice.invoiceNumber}`
              : "Invoice details"}
          </DialogDescription>

          {!invoice && isLoading ? (
            <ScrollArea className="flex-1 overflow-auto">
              <div className="px-4 py-4 md:px-10 md:py-6 space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-96" />
                </div>
                <Separator />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-40" />
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                  <div className="lg:col-span-1">
                    <Skeleton className="h-64 w-full" />
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : !invoice ? (
            <div className="flex-1 flex items-center justify-center p-4 md:p-10">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Failed to load invoice details
                </p>
                <Button onClick={onClose} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <ScrollArea className="flex-1 overflow-auto">
              <div className="px-4 py-4 md:px-10 md:py-6 space-y-6">
                {/* Header */}
                <InvoiceHeader
                  invoice={invoice}
                  onDownloadPDF={onDownloadPDF}
                  onSendInvoice={onSendInvoice}
                  onDuplicate={onDuplicate}
                  onGetShareableLink={onGetShareableLink}
                />

                {/* Reminders */}
                <InvoiceReminders
                  reminders={invoice.reminders}
                  activeReminders={invoice.reminders.slice(0, 2)}
                />

                <Separator />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Left Column - Main Invoice Content */}
                  <div className="xl:col-span-2 space-y-6 md:space-y-10 border border-light-grey-2 rounded-4xl p-4 md:p-8">
                    {/* Summary Card */}
                    <InvoiceSummaryCard invoice={invoice} />

                    {/* Items Table */}
                    <InvoiceItemsTable
                      items={invoice.items}
                      currency={invoice.billingCurrency}
                    />

                    {/* Totals */}
                    <InvoiceTotals
                      subtotal={invoice.subtotal}
                      discount={invoice.discount}
                      discountPercentage={invoice.discountPercentage}
                      totalAmount={invoice.totalAmount}
                      currency={invoice.billingCurrency}
                    />

                    {/* Payment Information */}
                    <PaymentInformation paymentInfo={invoice.paymentInfo} />

                    {/* Note */}
                    {invoice.note && (
                      <div className="space-y-2 bg-light-grey rounded-3xl p-4">
                        <h3 className="text-sm font-semibold text-black">
                          Note
                        </h3>
                        <p className="text-sm text-dark-grey">{invoice.note}</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Activity Feed */}
                  <div className="xl:col-span-1 w-fit">
                    <div className="lg:sticky lg:top-6">
                      <InvoiceActivityFeed activities={invoice.activities} />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
