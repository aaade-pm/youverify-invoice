import { Spinner } from "@/components/ui/spinner";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-10 text-[#9333ea]" />
    </div>
  );
}
