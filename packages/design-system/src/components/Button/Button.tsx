import React from "react";
import { colors, spacing, typography } from "../../theme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return {
        backgroundColor: colors.primary.main,
        color: "white",
        border: "none",
        ":hover": {
          backgroundColor: colors.primary.dark,
        },
      };
    case "secondary":
      return {
        backgroundColor: colors.secondary.main,
        color: "white",
        border: "none",
        ":hover": {
          backgroundColor: colors.secondary.dark,
        },
      };
    case "outline":
      return {
        backgroundColor: "transparent",
        color: colors.primary.main,
        border: `1px solid ${colors.primary.main}`,
        ":hover": {
          backgroundColor: colors.gray[100],
        },
      };
    case "text":
      return {
        backgroundColor: "transparent",
        color: colors.primary.main,
        border: "none",
        ":hover": {
          backgroundColor: colors.gray[100],
        },
      };
    default:
      return {};
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case "small":
      return {
        padding: `${spacing[1]} ${spacing[2]}`,
        fontSize: typography.fontSize.sm,
      };
    case "medium":
      return {
        padding: `${spacing[2]} ${spacing[4]}`,
        fontSize: typography.fontSize.base,
      };
    case "large":
      return {
        padding: `${spacing[3]} ${spacing[6]}`,
        fontSize: typography.fontSize.lg,
      };
    default:
      return {};
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      startIcon,
      endIcon,
      fullWidth,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0.375rem",
      fontWeight: typography.fontWeight.medium,
      cursor: "pointer",
      transition: "background-color 0.2s, box-shadow 0.2s",
      width: fullWidth ? "100%" : "auto",
      ":focus": {
        outline: "none",
        boxShadow: `0 0 0 3px ${colors.primary.light}50`,
      },
      ":disabled": {
        opacity: 0.6,
        cursor: "not-allowed",
      },
    };

    const variantStyles = getVariantStyles(variant);
    const sizeStyles = getSizeStyles(size);

    const combinedStyles = {
      ...baseStyles,
      ...variantStyles,
      ...sizeStyles,
      ...style,
    };

    return (
      <button
        ref={ref}
        style={combinedStyles as React.CSSProperties}
        {...props}
      >
        {startIcon && (
          <span style={{ marginRight: spacing[2] }}>{startIcon}</span>
        )}
        {children}
        {endIcon && <span style={{ marginLeft: spacing[2] }}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
