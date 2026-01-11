import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/ui/user-avatar";
import type { Activity } from "../data/mockDashboard";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface InvoiceActivityFeedProps {
  activities: Activity[];
}

export function InvoiceActivityFeed({ activities }: InvoiceActivityFeedProps) {
  const { firstName, lastName } = useAuth();
  return (
    <div className="space-y-4 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-black">Invoice Activity</h3>
      <ScrollArea className="flex-1">
        <div className="relative pr-4">
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="relative flex items-start gap-3"
              >
                {/* Avatar with timeline connection */}
                <div className="relative shrink-0">
                  <div className="relative z-10">
                    <UserAvatar
                      firstName={firstName}
                      lastName={lastName}
                      size="md"
                    />
                  </div>
                </div>

                {index < activities.length - 1 && (
                  <div className="absolute left-[20px] top-10 w-0.5 bg-light-grey-2 md:h-28 h-34" />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1 pt-1">
                  {/* Header with title and timestamp */}
                  <div className="flex flex-col gap-1 mb-2">
                    <p className="text-sm font-medium text-black">
                      {activity.title || "You"}
                    </p>
                    <span className="text-xs text-grey">
                      {activity.timestamp}
                    </span>
                  </div>

                  {/* Description in rounded bubble */}
                  <div className="bg-light-grey rounded-2xl p-4">
                    <p className="text-sm text-black font-medium">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
