import { Text } from "../text";
import type { TextProps } from "../text";
import styles from "./label.module.css";

export interface LabelProps extends Omit<TextProps, "as"> {
  /**
   * The ID of the form element the label is associated with
   */
  htmlFor?: string;

  /**
   * Whether the label should indicate a required field
   * @default false
   */
  required?: boolean;

  /**
   * Whether the label should be displayed inline
   * @default false
   */
  inline?: boolean;
}

export const Label = ({
  children,
  htmlFor,
  required = false,
  inline = false,
  className = "",
  ...props
}: LabelProps) => {
  const labelClasses = [styles.label, inline && styles.inline, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Text
      as="label"
      className={labelClasses}
      weight="medium"
      size="sm"
      {...props}
      {...(htmlFor ? { htmlFor } : {})}
    >
      {children}
      {required && <span className={styles.requiredIndicator}>*</span>}
    </Text>
  );
};

export default Label;
