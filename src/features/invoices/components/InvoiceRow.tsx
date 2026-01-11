import { Badge } from "@/components/ui/badge";
import {
  getStatusLabel,
  getStatusVariant,
  getStatusColor,
  getStatusTextColor,
  getStatusBorderColor,
} from "@/lib/statusStyles";
import type { Invoice } from "../data/mockDashboard";

interface InvoiceRowProps {
  invoice: Invoice;
  onClick?: () => void;
}

export function InvoiceRow({ invoice, onClick }: InvoiceRowProps) {
  const invoiceNumberParts = invoice.invoiceNumber.split(" - ");
  const invoicePrefix = invoiceNumberParts[0] + " -";
  const invoiceNumbers = invoiceNumberParts.slice(1).join(" - ");

  return (
    <>
      <div
        onClick={onClick}
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-2 px-4 sm:px-6 lg:px-8 ${
          onClick
            ? "cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
            : ""
        }`}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (onClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="flex flex-row md:flex-col gap-2 md:gap-0 text-dark-grey font-medium text-xs sm:text-sm space-y-1 sm:space-y-2  min-w-0">
          <p className="truncate">{invoicePrefix}</p>
          <p className="truncate">{invoiceNumbers}</p>
        </div>
        <div className="text-grey space-y-1 sm:space-y-2 ">
          <p className="text-xs font-normal">DUE DATE</p>
          <p className="text-xs sm:text-sm font-medium">{invoice.dueDate}</p>
        </div>
        <div className="w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start gap-2">
          <p className="font-semibold text-sm sm:text-base">{invoice.amount}</p>
          <Badge
            variant={getStatusVariant(invoice.status)}
            className={`${getStatusColor(invoice.status)} ${getStatusTextColor(
              invoice.status
            )} ${getStatusBorderColor(
              invoice.status
            )} text-xs font-medium w-fit md:min-w-14 px-2 sm:px-3 py-1 flex items-center justify-center border`}
          >
            {getStatusLabel(invoice.status)}
          </Badge>
        </div>
      </div>
    </>
  );
}
