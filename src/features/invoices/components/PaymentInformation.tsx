import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InvoiceDetails } from "../types/invoiceDetails";

interface PaymentInformationProps {
  paymentInfo: InvoiceDetails["paymentInfo"];
}

interface PaymentField {
  label: string;
  value: string | undefined;
  colSpan?: string;
}

function PaymentFieldItem({ label, value, colSpan }: PaymentField) {
  if (!value) return null;

  return (
    <div className={colSpan}>
      <p className="text-xs font-normal text-neutral-grey mb-1">{label}</p>
      <p className="text-sm font-medium text-black">{value}</p>
    </div>
  );
}

export function PaymentInformation({ paymentInfo }: PaymentInformationProps) {
  const fields: PaymentField[] = [
    { label: "ACCOUNT NAME", value: paymentInfo.accountName },
    { label: "ACCOUNT NUMBER", value: paymentInfo.accountNumber },
    { label: "ACH ROUTING NO", value: paymentInfo.achRoutingNumber },
    { label: "BANK NAME", value: paymentInfo.bankName },
    {
      label: "BANK ADDRESS",
      value: paymentInfo.bankAddress,
      colSpan: "sm:col-span-2",
    },
  ];

  return (
    <Card className="bg-white border-light-grey-2 shadow-none rounded-3xl">
      <CardHeader>
        <CardTitle className="text-base font-medium text-grey">
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fields.map((field) => (
            <PaymentFieldItem key={field.label} {...field} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
