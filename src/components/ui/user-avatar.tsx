import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getUserInitials } from "@/lib/utils";

interface UserAvatarProps {
  firstName?: string | null;
  lastName?: string | null;
  fallback?: string;
  showIcon?: boolean;
  className?: string;
  fallbackClassName?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function UserAvatar({
  firstName,
  lastName,
  fallback = "KO",
  className,
  fallbackClassName,
  size = "md",
}: UserAvatarProps) {
  const initials = getUserInitials(firstName, lastName, fallback);

  return (
    <Avatar className={cn(sizeMap[size], className)}>
      <AvatarFallback
        className={cn("bg-cichild-blue text-white", fallbackClassName)}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
