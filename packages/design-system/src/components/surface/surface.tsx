import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./surface.module.css";

export type SurfaceVariant = "default" | "elevated" | "outlined";
export type SurfaceRadius = "none" | "small" | "medium" | "large" | "full";
export type SurfaceElevation = "none" | "low" | "medium" | "high";

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style of the surface
   * @default 'default'
   */
  variant?: SurfaceVariant;

  /**
   * The border radius of the surface
   * @default 'medium'
   */
  radius?: SurfaceRadius;

  /**
   * The elevation (shadow) level of the surface
   * @default 'none' for default and outlined variants, 'low' for elevated variant
   */
  elevation?: SurfaceElevation;

  /**
   * Whether the surface should use a higher contrast background
   * @default false
   */
  highContrast?: boolean;

  /**
   * Surface contents
   */
  children?: ReactNode;

  /**
   * Additional CSS classes to apply to the surface
   */
  className?: string;
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  (
    {
      variant = "default",
      radius = "medium",
      elevation,
      highContrast = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    // If elevation isn't explicitly set, use default values based on variant
    const resolvedElevation =
      elevation || (variant === "elevated" ? "low" : "none");

    // Combine utility classes with component-specific styles
    const surfaceClasses = [
      styles.surface,
      styles[`variant-${variant}`],
      styles[`radius-${radius}`],
      styles[`elevation-${resolvedElevation}`],
      highContrast ? styles.highContrast : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={surfaceClasses} {...props}>
        {children}
      </div>
    );
  }
);

Surface.displayName = "Surface";

export default Surface;
