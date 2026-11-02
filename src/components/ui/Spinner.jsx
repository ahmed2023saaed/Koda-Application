import * as React from "react";
import { cn } from "@/lib/util";

/**
 * Spinner — circular SVG loader that rotates a full 360°.
 * The active arc sweeps every point on the circle as the svg rotates.
 *
 * @param {Object} props
 * @param {string}  [props.className]
 * @param {number}  [props.size=24]
 * @param {number}  [props.strokeWidth=2.5]
 * @param {string}  [props.color="currentColor"]
 */
export const Spinner = React.forwardRef(function Spinner(
  { className, size = 24, strokeWidth = 2.5, color = "currentColor", ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      role="status"
      aria-label="Loading"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("animate-spin", className)}
      style={{ color }}
      {...props}
    >
      {/* Faint track circle */}
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth={strokeWidth}
      />
      {/* Active arc — sweeps full 360° as the svg rotates */}
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="42 14"
      />
    </svg>
  );
});

/**
 * SpinnerWithText — convenience wrapper for full-page loaders.
 */
export function SpinnerWithText({ label = "Loading...", size = 36, className }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <Spinner size={size} className="text-primary" />
      {label ? <p className="text-sm text-muted-foreground">{label}</p> : null}
    </div>
  );
}