import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StatCard } from "../components/StatCard";
import { ActionCard } from "../components/ActionCard";
import { RecentInvoicesCard } from "../components/RecentInvoicesCard";
import { RecentActivitiesCard } from "../components/RecentActivitiesCard";
import { useInvoicesDashboard } from "../hooks/useInvoicesDashboard";
import { mockActions } from "../data/mockDashboard";

export function InvoiceHomePage() {
  const { data, isLoading, isError } = useInvoicesDashboard();

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">
            Invoice
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-auto">
            <Button className="bg-white border border-light-grey-2 text-xs font-medium px-6 sm:px-10 py-4 sm:py-6 rounded-4xl hover:shadow-sm w-full sm:w-auto">
              SEE WHAT'S NEW
            </Button>
            <Button className="bg-cichild-blue hover:bg-cichild-blue/90 text-white text-sm font-medium px-8 sm:px-14 py-4 sm:py-6 rounded-4xl hover:shadow-sm w-full sm:w-auto">
              CREATE
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-3 xl:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <StatCard
                  key={i}
                  stat={{
                    id: String(i),
                    title: "",
                    amount: "",
                    count: 0,
                    status: "paid",
                  }}
                  isLoading={true}
                />
              ))
            : data?.stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} isLoading={false} />
              ))}
        </div>

        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-4">
            Invoice Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-3 xl:gap-6">
            {mockActions.map((action) => (
              <ActionCard
                key={action.id}
                title={action.title}
                description={action.description}
                variant={action.variant}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {isLoading ? (
            <>
              <div className="lg:col-span-2 h-full">
                <RecentInvoicesCard invoices={[]} isLoading={true} />
              </div>
              <div className="lg:col-span-1 h-full">
                <RecentActivitiesCard activities={[]} isLoading={true} />
              </div>
            </>
          ) : isError ? (
            <div className="col-span-1 lg:col-span-3 text-center py-12">
              <p className="text-muted-foreground mb-4">
                Failed to load dashboard data
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : (
            <>
              <div className="lg:col-span-2 h-full">
                <RecentInvoicesCard
                  invoices={data?.recentInvoices || []}
                  isLoading={false}
                />
              </div>

              <div className="lg:col-span-1 h-full">
                <RecentActivitiesCard
                  activities={data?.recentActivities || []}
                  isLoading={false}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
