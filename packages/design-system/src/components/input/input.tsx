import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import styles from "./input.module.css";

export type InputVariant = "outline" | "filled" | "unstyled";
export type InputSize = "small" | "medium" | "large";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * The visual style of the input
   * @default 'outline'
   */
  variant?: InputVariant;

  /**
   * The size of the input
   * @default 'medium'
   */
  size?: InputSize;

  /**
   * Whether the input should render at full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Icon to display before input text
   */
  iconLeft?: ReactNode;

  /**
   * Icon to display after input text
   */
  iconRight?: ReactNode;

  /**
   * Whether the input is in an error state
   * @default false
   */
  isError?: boolean;

  /**
   * Whether the input is in a success state
   * @default false
   */
  isSuccess?: boolean;

  /**
   * Additional CSS classes to apply to the input
   */
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outline",
      size = "medium",
      fullWidth = true,
      iconLeft,
      iconRight,
      isError = false,
      isSuccess = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Combine utility classes
    const inputClasses = [
      styles.input,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : "",
      isError ? styles.error : "",
      isSuccess ? styles.success : "",
      iconLeft ? styles.withIconLeft : "",
      iconRight ? styles.withIconRight : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const wrapperClasses = [
      styles.inputWrapper,
      fullWidth ? styles.fullWidth : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}

        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />

        {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
