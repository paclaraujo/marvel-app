import { IconX } from "@tabler/icons-react";

interface ErrorBadgeProps {
    error: string
    setError: (error: string) => void
}

export const ErrorBadge = ({error, setError}: ErrorBadgeProps) => {
    return (
        <div className="bg-red-300 text-neutral-100 px-4 py-4 flex items-center gap-3 rounded-full m-3">
        {error}
        <button onClick={() => setError("")}>
          <IconX />
        </button>
      </div>
    );
  };
  