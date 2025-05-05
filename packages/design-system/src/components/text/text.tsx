import React from "react";
import styles from "./text.module.css";

export type TextElement =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "div"
  | "label";
export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextVariant =
  | "default"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";
export type TextAlign = "left" | "center" | "right";

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "as"> {
  /**
   * The semantic element to use
   * @default 'p'
   */
  as?: TextElement;

  /**
   * Text size
   * @default 'md'
   */
  size?: TextSize;

  /**
   * Font weight
   * @default 'regular'
   */
  weight?: TextWeight;

  /**
   * Text color variant
   * @default 'default'
   */
  variant?: TextVariant;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: TextAlign;

  /**
   * Whether the text should be truncated with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Whether the text should not wrap
   * @default false
   */
  nowrap?: boolean;

  /**
   * Whether the text should be uppercase
   * @default false
   */
  uppercase?: boolean;

  /**
   * Whether the text should be capitalized
   * @default false
   */
  capitalize?: boolean;

  /**
   * Whether the text should be italic
   * @default false
   */
  italic?: boolean;

  /**
   * Whether the text should be underlined
   * @default false
   */
  underline?: boolean;
}

export const Text = ({
  as = "p",
  children,
  size = "md",
  weight = "regular",
  variant = "default",
  align = "left",
  truncate = false,
  nowrap = false,
  uppercase = false,
  capitalize = false,
  italic = false,
  underline = false,
  className = "",
  ...props
}: TextProps) => {
  const Component = as;
  const textClasses = [
    styles.text,
    styles[size],
    styles[weight],
    styles[variant],
    align === "center" && styles.center,
    align === "right" && styles.right,
    truncate && styles.truncate,
    nowrap && styles.nowrap,
    uppercase && styles.uppercase,
    capitalize && styles.capitalize,
    italic && styles.italic,
    underline && styles.underline,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
};

export default Text;
