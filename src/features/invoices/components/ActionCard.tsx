import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CreateInvoiceIcon,
  ChangeInvoiceSettingsIcon,
  ManageCustomersIcon,
} from "./actionIcons";

interface ActionCardProps {
  title: string;
  description: string;
  variant: "primary" | "secondary";
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Create New Invoice": CreateInvoiceIcon,
  "Change Invoice settings": ChangeInvoiceSettingsIcon,
  "Manage Customer list": ManageCustomersIcon,
};

export function ActionCard({
  title,
  description,
  variant,
  onClick,
}: ActionCardProps) {
  const Icon = iconMap[title] || CreateInvoiceIcon;
  const isPrimary = variant === "primary";

  return (
    <Card
      className={cn(
        "bg-white border-none shadow-none cursor-pointer transition-all hover:shadow-lg rounded-2xl sm:rounded-3xl",
        isPrimary && "bg-cichild-blue text-white"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <CardContent className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
        <Icon />
        <div className="flex flex-col gap-2">
          <h3
            className={cn(
              "text-lg sm:text-xl font-semibold",
              isPrimary ? "text-white" : "text-dark-grey"
            )}
          >
            {title}
          </h3>
          <p className={cn("text-sm", isPrimary ? "text-white" : "text-grey")}>
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
