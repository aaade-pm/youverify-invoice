import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FolderIcon,
  OverviewIcon,
  HelpCenterIcon,
  BeneficiaryManagementIcon,
  InvoiceIcon,
  SettingsIcon,
} from "@/components/icons/sidebarIcons";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: "Getting Started", icon: FolderIcon },
  { label: "Overview", icon: OverviewIcon },
  { label: "Accounts", icon: FolderIcon },
  { label: "Invoice", icon: InvoiceIcon, active: true },
  { label: "Beneficiary Management", icon: BeneficiaryManagementIcon },
  { label: "Help Center", icon: HelpCenterIcon },
  { label: "Settings", icon: SettingsIcon },
];

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  return (
    <aside
      className={cn(
        "bg-white text-white w-full lg:w-60 xl:w-72 min-h-screen flex flex-col",
        className
      )}
    >
      <div className="p-4 sm:p-6 lg:p-3 xl:p-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center mb-6 sm:mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="24"
            viewBox="0 0 10 24"
            fill="none"
            className="text-cichild-blue"
          >
            <path
              d="M7.14755 21.3317V0L0 0.844224V0.908521L1.58466 2.40644C1.6853 2.51478 1.76296 2.64253 1.81291 2.78192C1.86287 2.92131 1.88408 3.06945 1.87525 3.21733V21.3317C1.88232 21.4746 1.86018 21.6173 1.8102 21.7513C1.76022 21.8852 1.68346 22.0074 1.58466 22.1104L0 23.6013V23.6655H9.05598V23.6013L7.47136 22.1069C7.36427 22.0093 7.27978 21.8892 7.22384 21.7554C7.1679 21.6214 7.14185 21.4768 7.14755 21.3317Z"
              fill="#003EFF"
            />
          </svg>
        </div>
        <nav className="space-y-3 sm:space-y-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-xs sm:text-sm text-grey font-normal hover:bg-white/10 py-2 sm:py-3",
                  item.active &&
                    "bg-white text-dark-grey-2 border-8 border-light-grayish-blue rounded-4xl py-3 sm:py-5 tracking-widest"
                )}
              >
                <Icon className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" />
                <span className="truncate">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
