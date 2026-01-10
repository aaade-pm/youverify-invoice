import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TopbarProps {
  title: string;
  onMenuClick?: () => void;
  className?: string;
}

export function Topbar({ title, onMenuClick, className }: TopbarProps) {
  const { firstName, lastName, user, signOut } = useAuth();
  const navigate = useNavigate();
  const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "User";
  const userEmail = user?.email || "";

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header
      className={`bg-ghost-blue border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        )}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 tracking-widest">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="bg-white rounded-full"
          variant="ghost"
          size="icon"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
          >
            <path
              opacity="0.4"
              d="M12 6.43994V9.76994"
              stroke="#373B47"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z"
              stroke="#373B47"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
            <path
              opacity="0.4"
              d="M15.33 18.8199C15.33 20.6499 13.83 22.1499 12 22.1499C11.09 22.1499 10.25 21.7699 9.65004 21.1699C9.05004 20.5699 8.67004 19.7299 8.67004 18.8199"
              stroke="#373B47"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
          </svg>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="bg-white rounded-full flex items-center gap-2 py-2 border-0 outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 hover:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none data-[state=open]:ring-0 data-[state=open]:ring-offset-0"
              style={{ border: "none", boxShadow: "none" }}
            >
              <UserAvatar firstName={firstName} lastName={lastName} size="sm" />
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white rounded-2xl min-w-56 p-2"
          >
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{fullName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-500 focus:text-red focus:bg-red/10 cursor-pointer hover:bg-red/10 text-center font-bold justify-center"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
