import { formatCurrency } from "@/lib/utils";

interface InvoiceTotalsProps {
  subtotal: number;
  discount: number;
  discountPercentage?: number;
  totalAmount: number;
  currency?: string;
}

export function InvoiceTotals({
  subtotal,
  discount,
  discountPercentage,
  totalAmount,
  currency = "USD",
}: InvoiceTotalsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm">
        <span className="text-grey font-semibold uppercase tracking-wider">
          SUBTOTAL
        </span>
        <span className="text-black font-medium">
          {formatCurrency(subtotal, currency)}
        </span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-grey font-semibold uppercase tracking-wider">
            DISCOUNT {discountPercentage ? `(${discountPercentage}%)` : ""}
          </span>
          <span className="text-black font-medium">
            {formatCurrency(discount, currency)}
          </span>
        </div>
      )}
      <div className="flex justify-between items-center pt-3 border-t border-light-grey-2">
        <span className="text-sm md:text-base font-bold text-black uppercase tracking-wider">
          TOTAL AMOUNT DUE
        </span>
        <span className="text-base md:text-lg font-bold text-black">
          {formatCurrency(totalAmount, currency)}
        </span>
      </div>
    </div>
  );
}
