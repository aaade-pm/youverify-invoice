import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getStatusLabel,
  getStatusVariant,
  getStatusColor,
  getStatusTextColor,
  getStatusBorderColor,
} from "@/lib/statusStyles";
import {
  MoreVertical,
  Download,
  Send,
  Mail,
  MessageCircle,
  MessageSquare,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import type { InvoiceDetails } from "../types/invoiceDetails";

interface InvoiceHeaderProps {
  invoice: InvoiceDetails;
  onDownloadPDF?: () => void;
  onSendInvoice?: () => void;
  onDuplicate?: () => void;
  onGetShareableLink?: () => void;
}

interface SendPlatform {
  label: string;
  icon: LucideIcon;
}

const sendPlatforms: SendPlatform[] = [
  { label: "Email", icon: Mail },
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Telegram", icon: MessageSquare },
  { label: "LinkedIn", icon: Linkedin },
  { label: "Twitter/X", icon: Twitter },
];

export function InvoiceHeader({
  invoice,
  onDownloadPDF,
  onSendInvoice,
  onDuplicate,
  onGetShareableLink,
}: InvoiceHeaderProps) {
  const status = invoice.status === "partial" ? "pending" : invoice.status;

  return (
    <div className="space-y-4">
      <div className="flex flex-col xl:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">
            {invoice.invoiceNumber}
          </h2>
          <p className="text-sm text-grey">
            View the details and activity of this invoice
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto rounded-4xl border-light-grey-2 text-cichild-blue text-xs hover:shadow-sm"
            onClick={onDownloadPDF}
          >
            <Download className="mr-2 h-4 w-4" />
            DOWNLOAD AS PDF
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full sm:w-auto bg-cichild-blue hover:bg-cichild-blue/90 text-white rounded-4xl text-xs hover:shadow-sm">
                <Send className="mr-2 h-4 w-4" />
                SEND INVOICE
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-fit px-4 py-2 flex bg-white border border-light-grey-2 mt-2"
            >
              {sendPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <DropdownMenuItem
                    key={platform.label}
                    onClick={onSendInvoice}
                    className="flex flex-col gap-1 text-grey hover:bg-light-grey hover:text-dark-grey text-xs cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {platform.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-4xl border-light-grey-2 text-dark-grey text-xs hover:shadow-sm"
              >
                <MoreVertical className="h-4 w-4" />
                MORE
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 px-4 py-2 bg-white border border-light-grey-2 mt-2"
            >
              <DropdownMenuItem
                onClick={onDuplicate}
                className="text-grey text-xs"
              >
                DUPLICATE INVOICE
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onGetShareableLink}
                className="text-grey text-xs"
              >
                GET SHARABLE LINK
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge
          variant={getStatusVariant(status)}
          className={`${getStatusColor(status)} ${getStatusTextColor(
            status
          )} ${getStatusBorderColor(
            status
          )} text-xs font-medium px-3 py-1 border`}
        >
          {invoice.status === "partial"
            ? "PARTIAL PAYMENT"
            : getStatusLabel(status)}
        </Badge>
      </div>
    </div>
  );
}
