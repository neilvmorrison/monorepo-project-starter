import { forwardRef, useId } from "react";
import styles from "./checkbox.module.css";
import type { InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /**
   * The label for the checkbox
   */
  label?: string;

  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;

  /**
   * Whether the checkbox is indeterminate
   * @default false
   */
  indeterminate?: boolean;

  /**
   * The size of the checkbox
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";

  /**
   * Whether to render the checkbox without a label
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Additional CSS classes to apply to the checkbox container
   */
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked,
      indeterminate = false,
      size = "medium",
      hideLabel = false,
      className = "",
      id: externalId,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId || `checkbox-${generatedId}`;

    // Combine CSS classes
    const containerClasses = [
      styles.container,
      disabled ? styles.disabled : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const checkboxClasses = [
      styles.checkbox,
      styles[size],
      indeterminate ? styles.indeterminate : "",
      checked ? styles.checked : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        <input
          type="checkbox"
          id={id}
          ref={(element) => {
            // Apply indeterminate state (not controllable through HTML attributes)
            if (element) {
              element.indeterminate = indeterminate;
              if (ref) {
                if (typeof ref === "function") {
                  ref(element);
                } else {
                  ref.current = element;
                }
              }
            }
          }}
          className={styles.input}
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <label htmlFor={id} className={styles.label}>
          <span className={checkboxClasses} aria-hidden="true">
            {checked && !indeterminate && (
              <svg
                className={styles.checkIcon}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  fill="currentColor"
                />
              </svg>
            )}
            {indeterminate && (
              <svg
                className={styles.indeterminateIcon}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 13H5v-2h14v2z" fill="currentColor" />
              </svg>
            )}
          </span>
          {!hideLabel && <span className={styles.labelText}>{label}</span>}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
