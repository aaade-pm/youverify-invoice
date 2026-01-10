import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityItem } from "./ActivityItem";
import type { Activity } from "../data/mockDashboard";

interface RecentActivitiesCardProps {
  activities: Activity[];
  isLoading?: boolean;
}

export function RecentActivitiesCard({
  activities,
  isLoading,
}: RecentActivitiesCardProps) {
  if (isLoading) {
    return (
      <Card className="bg-white border-none shadow-none rounded-[40px] h-full flex flex-col min-h-[400px] max-h-[600px]">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden min-h-0">
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="bg-white border-none shadow-none rounded-[40px] h-full flex flex-col min-h-[400px] max-h-[600px]">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recent activities</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-none shadow-none rounded-[40px] h-full flex flex-col min-h-[400px] max-h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-black">
          Recent Activities
        </CardTitle>
        <Button className="text-cichild-blue border border-light-grey-2 text-xs font-medium rounded-4xl hover:shadow-sm">
          VIEW ALL
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden min-h-0 xl:px-4">
        <ScrollArea className="h-full">
          <div className="space-y-5 sm:space-y-7">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
