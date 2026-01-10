import { UserAvatar } from "@/components/ui/user-avatar";
import type { Activity } from "../data/mockDashboard";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface ActivityItemProps {
  activity: Activity;
  showSeparator?: boolean;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const { firstName, lastName } = useAuth();

  return (
    <>
      <div className="flex items-start gap-3">
        <UserAvatar firstName={firstName} lastName={lastName} size="md" />
        <div className="flex-1">
          <p className="font-medium text-base text-black">{activity.title}</p>
          <p className="text-xs text-grey mb-1">{activity.timestamp}</p>
          <div className="xl:bg-light-grey-2 xl:rounded-2xl  xl:p-4">
            <p className="text-sm text-black font-medium">
              {activity.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
