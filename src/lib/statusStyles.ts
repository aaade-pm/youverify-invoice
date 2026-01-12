export type InvoiceStatus = "paid" | "overdue" | "draft" | "pending" | "unpaid";

export const STATUS_LABELS = {
  PAID: "PAID",
  OVERDUE: "OVERDUE",
  DRAFT: "DRAFT",
  PENDING_PAYMENT: "PENDING",
  UNPAID: "UNPAID",
} as const;

export const STATUS_COLORS = {
  paid: "bg-mint-green",
  overdue: "bg-pale-red",
  draft: "bg-platinum",
  pending: "bg-cosmic-latte",
  unpaid: "bg-yellowish-beige",
} as const;

export const STATUS_TEXT_COLORS = {
  paid: "text-green",
  overdue: "text-red",
  draft: "text-dark-grey",
  pending: "text-amber",
  unpaid: "text-dark-grey",
} as const;

export const STATUS_BORDER_COLORS = {
  paid: "border-green",
  overdue: "border-red",
  draft: "border-dark-grey",
  pending: "border-amber",
  unpaid: "border-dark-grey",
} as const;

export const statusConfig: Record<
  InvoiceStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
    color: string;
    borderColor: string;
    textColor: string;
  }
> = {
  paid: {
    label: STATUS_LABELS.PAID,
    variant: "default",
    color: STATUS_COLORS.paid,
    borderColor: STATUS_BORDER_COLORS.paid,
    textColor: STATUS_TEXT_COLORS.paid,
  },
  overdue: {
    label: STATUS_LABELS.OVERDUE,
    variant: "destructive",
    color: STATUS_COLORS.overdue,
    borderColor: STATUS_BORDER_COLORS.overdue,
    textColor: STATUS_TEXT_COLORS.overdue,
  },
  draft: {
    label: STATUS_LABELS.DRAFT,
    variant: "secondary",
    color: STATUS_COLORS.draft,
    borderColor: STATUS_BORDER_COLORS.draft,
    textColor: STATUS_TEXT_COLORS.draft,
  },
  pending: {
    label: STATUS_LABELS.PENDING_PAYMENT,
    variant: "outline",
    color: STATUS_COLORS.pending,
    borderColor: STATUS_BORDER_COLORS.pending,
    textColor: STATUS_TEXT_COLORS.pending,
  },
  unpaid: {
    label: STATUS_LABELS.UNPAID,
    variant: "outline",
    color: STATUS_COLORS.unpaid,
    borderColor: STATUS_BORDER_COLORS.unpaid,
    textColor: STATUS_TEXT_COLORS.unpaid,
  },
};

export function getStatusVariant(status: InvoiceStatus) {
  return statusConfig[status]?.variant || "secondary";
}

export function getStatusLabel(status: InvoiceStatus) {
  return statusConfig[status]?.label || status.toUpperCase();
}

export function getStatusColor(status: InvoiceStatus) {
  return statusConfig[status]?.color || STATUS_COLORS.draft;
}

export function getStatusTextColor(status: InvoiceStatus) {
  return statusConfig[status]?.textColor || STATUS_TEXT_COLORS.draft;
}

export function getStatusBorderColor(status: InvoiceStatus) {
  return statusConfig[status]?.borderColor || STATUS_BORDER_COLORS.draft;
}
