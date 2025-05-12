import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import styles from "./divider.module.css";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSize = "thin" | "regular" | "thick";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * The thickness of the divider
   * @default 'regular'
   */
  size?: DividerSize;

  /**
   * Additional CSS classes to apply to the divider
   */
  className?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    { orientation = "horizontal", size = "regular", className = "", ...props },
    ref
  ) => {
    const dividerClasses = [
      styles.divider,
      styles[orientation],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={dividerClasses}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export default Divider;
