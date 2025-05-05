import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import styles from "./button.module.css";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Whether the button should render at full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Icon to display before button text
   */
  iconLeft?: ReactNode;

  /**
   * Icon to display after button text
   */
  iconRight?: ReactNode;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Button contents
   */
  children?: ReactNode;

  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      fullWidth = false,
      iconLeft,
      iconRight,
      isLoading = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Combine utility classes from index.css with component-specific styles
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : "",
      isLoading ? styles.loading : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        type={props.type || "button"}
        {...props}
      >
        {iconLeft && !isLoading && (
          <span className={styles.iconLeft}>{iconLeft}</span>
        )}

        {children}

        {iconRight && !isLoading && (
          <span className={styles.iconRight}>{iconRight}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
