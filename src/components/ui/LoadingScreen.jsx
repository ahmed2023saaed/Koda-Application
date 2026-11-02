import { cn } from "@/lib/util";
import { Spinner } from "./Spinner";

/**
 * LoadingScreen — full-page loader used as a Suspense fallback.
 *
 * @param {Object} props
 * @param {string}  [props.brand="Koda Dashboard"]
 * @param {string}  [props.label="Loading admin overview..."]
 * @param {boolean} [props.withSkeletons=true]
 * @param {string}  [props.className]
 */
export function LoadingScreen({
  brand = "Koda Dashboard",
  label = "Loading admin overview...",
  withSkeletons = true,
  className,
}) {
  return (
    <div className={cn("flex flex-col gap-8 p-6 md:p-10", className)}>
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <Spinner size={44} className="text-primary" />
        <div className="space-y-1 text-center">
          <p className="text-sm font-semibold text-foreground">{brand}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>

      {withSkeletons && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
              </div>
              <div className="h-7 w-24 animate-pulse rounded bg-muted" />
              <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function LoadingInline({ label, size = 20 }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Spinner size={size} />
      {label ? <span className="text-sm">{label}</span> : null}
    </div>
  );
}