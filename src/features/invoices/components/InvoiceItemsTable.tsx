import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { InvoiceDetails } from "../types/invoiceDetails";
import { formatCurrency } from "@/lib/utils";

interface InvoiceItemsTableProps {
  items: InvoiceDetails["items"];
  currency?: string;
}

export function InvoiceItemsTable({
  items,
  currency = "USD",
}: InvoiceItemsTableProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-black">Items</h3>
      <ScrollArea className="w-full">
        <div className="min-w-full">
          {/* Desktop Table View */}
          <table className="hidden md:table w-full border-collapse">
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4">
                    <div>
                      <p className="text-sm font-medium text-black">
                        {item.name}
                      </p>
                      {item.description && (
                        <p className="text-xs text-grey mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 text-sm text-black">
                    {item.quantity}
                  </td>
                  <td className="text-right py-4 px-4 text-sm text-black">
                    {formatCurrency(item.unitPrice, currency)}
                  </td>
                  <td className="text-right py-4 px-4 text-sm font-medium text-black">
                    {formatCurrency(item.lineTotal, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Stacked View */}
          <div className="md:hidden space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-light-grey-2 rounded-lg p-4 space-y-3"
              >
                <div>
                  <p className="text-sm font-medium text-black">{item.name}</p>
                  {item.description && (
                    <p className="text-xs text-grey mt-1">{item.description}</p>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-grey">Quantity:</span>
                  <span className="text-black font-medium">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-grey">Unit Price:</span>
                  <span className="text-black font-medium">
                    {formatCurrency(item.unitPrice, currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-light-grey-2">
                  <span className="text-grey font-medium">Total:</span>
                  <span className="text-black font-semibold">
                    {formatCurrency(item.lineTotal, currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
