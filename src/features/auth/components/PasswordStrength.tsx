import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
}

const criteria: PasswordCriteria[] = [
  {
    label: "At least 8 characters",
    test: (pwd) => pwd.length >= 8,
  },
  {
    label: "Contains lowercase letter",
    test: (pwd) => /[a-z]/.test(pwd),
  },
  {
    label: "Contains uppercase letter",
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    label: "Contains number",
    test: (pwd) => /[0-9]/.test(pwd),
  },
  {
    label: "Contains special character",
    test: (pwd) => /[^a-zA-Z0-9]/.test(pwd),
  },
];

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  return (
    <div className="space-y-2 rounded-md border p-3 bg-muted/50">
      <p className="text-sm font-medium">Password requirements:</p>
      <ul className="space-y-1.5">
        {criteria.map((criterion, index) => {
          const isValid = criterion.test(password);
          return (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-sm",
                isValid ? "text-green-600" : "text-muted-foreground"
              )}
            >
              {isValid ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground" />
              )}
              <span>{criterion.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
