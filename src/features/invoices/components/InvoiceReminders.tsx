import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

interface InvoiceRemindersProps {
  reminders: string[];
  activeReminders?: string[];
}

export function InvoiceReminders({
  reminders,
  activeReminders = [],
}: InvoiceRemindersProps) {
  return (
    <div className="w-full md:w-fit px-4 py-3 md:px-6 md:py-4 flex flex-col xl:flex-row xl:items-center gap-4 border border-light-grey-2 rounded-3xl">
      <h3 className="text-xs font-normal text-neutral-grey">REMINDERS</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="w-fit sm:w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {reminders.map((reminder, index) => {
            const isActive = activeReminders.includes(reminder);
            return (
              <Badge
                key={index}
                variant="outline"
                className={`${
                  isActive
                    ? "bg-pale-green text-dark-grey border-none"
                    : "bg-white text-dark-grey border-light-grey-2"
                } text-[9px] md:text-xs font-medium px-4 py-2 rounded-3xl whitespace-nowrap flex items-center gap-2`}
              >
                {reminder}
                {isActive && (
                  <Check className="h-2 w-2 md:h-4 md:w-4 text-green shrink-0" />
                )}
              </Badge>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
