import { forwardRef } from "react";
import type { CSSProperties } from "react";
import styles from "./skeleton.module.css";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps {
  /**
   * The width of the skeleton
   * @default '100%'
   */
  width?: number | string;

  /**
   * The height of the skeleton
   * @default for variant 'text': 1em
   * @default for other variants: 100px
   */
  height?: number | string;

  /**
   * The visual shape of the skeleton
   * @default 'text'
   */
  variant?: SkeletonVariant;

  /**
   * The animation effect of the skeleton
   * @default 'pulse'
   */
  animation?: SkeletonAnimation;

  /**
   * Additional CSS classes to apply to the skeleton
   */
  className?: string;

  /**
   * Additional inline styles to apply to the skeleton
   */
  style?: CSSProperties;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      variant = "text",
      animation = "pulse",
      className = "",
      style = {},
      ...props
    },
    ref
  ) => {
    const getDefaultHeight = () => {
      return variant === "text" ? "1em" : "100px";
    };

    const combinedStyles: CSSProperties = {
      width: width ?? "100%",
      height: height ?? getDefaultHeight(),
      ...style,
    };

    const skeletonClasses = [
      styles.skeleton,
      styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
      styles[
        `animation${animation.charAt(0).toUpperCase() + animation.slice(1)}`
      ],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={skeletonClasses}
        style={combinedStyles}
        aria-busy="true"
        aria-live="polite"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
