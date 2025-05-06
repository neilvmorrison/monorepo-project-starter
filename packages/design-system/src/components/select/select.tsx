import { forwardRef, useState, useRef, useEffect } from "react";
import type { ReactNode, ForwardedRef } from "react";
import styles from "./select.module.css";

export type SelectSize = "small" | "medium" | "large";
export type SelectVariant = "default" | "outlined";

export interface SelectOption<T> {
  /**
   * Unique value for this option
   */
  value: T;

  /**
   * Label or rich content to display for this option
   */
  label: ReactNode;

  /**
   * Optional icon or component to display before the label
   */
  icon?: ReactNode;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface SelectProps<T> {
  /**
   * The options to display in the dropdown
   */
  options: SelectOption<T>[];

  /**
   * The currently selected value
   */
  value?: T;

  /**
   * Handler that is called when an option is selected
   */
  onChange?: (value: T) => void;

  /**
   * The size of the select component
   * @default 'medium'
   */
  size?: SelectSize;

  /**
   * The visual style of the select component
   * @default 'default'
   */
  variant?: SelectVariant;

  /**
   * Placeholder text to display when no option is selected
   */
  placeholder?: string;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Optional label for the select
   */
  label?: ReactNode;

  /**
   * Additional CSS classes to apply to the select
   */
  className?: string;

  /**
   * Error message to display
   */
  error?: string;
}

function Select<T>(
  {
    options,
    value,
    onChange,
    size = "medium",
    variant = "default",
    placeholder = "Select an option",
    disabled = false,
    fullWidth = false,
    label,
    className = "",
    error,
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    SelectOption<T> | undefined
  >(options.find((option) => option.value === value));
  const selectRef = useRef<HTMLDivElement>(null);

  // Forward the ref
  const combinedRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof ref === "function") {
      ref(combinedRef.current);
    } else if (ref) {
      ref.current = combinedRef.current;
    }
  }, [ref]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update selected option when value changes
  useEffect(() => {
    setSelectedOption(options.find((option) => option.value === value));
  }, [value, options]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: SelectOption<T>) => {
    if (option.disabled) return;

    setSelectedOption(option);
    setIsOpen(false);

    if (onChange) {
      onChange(option.value);
    }
  };

  // Combine classes
  const selectClasses = [
    styles.select,
    styles[size],
    styles[variant],
    disabled ? styles.disabled : "",
    fullWidth ? styles.fullWidth : "",
    isOpen ? styles.open : "",
    error ? styles.error : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.container} ref={combinedRef}>
      {label && <div className={styles.label}>{label}</div>}

      <div
        className={selectClasses}
        onClick={toggleDropdown}
        ref={selectRef}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        <div className={styles.selectValue}>
          {selectedOption ? (
            <div className={styles.selectedOption}>
              {selectedOption.icon && (
                <span className={styles.optionIcon}>{selectedOption.icon}</span>
              )}
              <span className={styles.optionLabel}>{selectedOption.label}</span>
            </div>
          ) : (
            <div className={styles.placeholder}>{placeholder}</div>
          )}
        </div>

        <div className={styles.arrow}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <div className={styles.dropdown} role="listbox">
            {options.map((option, index) => (
              <div
                key={index}
                className={`
                  ${styles.option}
                  ${option.disabled ? styles.optionDisabled : ""}
                  ${
                    option.value === selectedOption?.value
                      ? styles.optionSelected
                      : ""
                  }
                `}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={option.value === selectedOption?.value}
                aria-disabled={option.disabled}
              >
                {option.icon && (
                  <span className={styles.optionIcon}>{option.icon}</span>
                )}
                <span className={styles.optionLabel}>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}

export const SelectComponent = forwardRef(Select) as <T>(
  props: SelectProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

// @ts-expect-error - We know the displayName exists after the forwardRef
SelectComponent.displayName = "Select";

export default SelectComponent;
