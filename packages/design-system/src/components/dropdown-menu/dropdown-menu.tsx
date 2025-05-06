import { useRef, useState, useEffect, forwardRef } from "react";
import type { ReactNode } from "react";
import styles from "./dropdown-menu.module.css";

export type DropdownPosition =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end";

export interface DropdownMenuProps {
  /**
   * The trigger element that opens the dropdown when clicked
   */
  trigger: ReactNode;

  /**
   * The content of the dropdown menu
   */
  children: ReactNode;

  /**
   * Position of the dropdown relative to the trigger
   * @default 'bottom-start'
   */
  position?: DropdownPosition;

  /**
   * Whether the dropdown is open
   */
  isOpen?: boolean;

  /**
   * Handler called when the open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Width of the dropdown menu
   * @default 'trigger' (matches trigger width)
   */
  width?: number | "trigger" | "auto";

  /**
   * Additional CSS class for the dropdown container
   */
  className?: string;
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      trigger,
      children,
      position = "bottom-start",
      isOpen: controlledIsOpen,
      onOpenChange,
      width = "trigger",
      className = "",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(controlledIsOpen || false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle controlled state
    useEffect(() => {
      if (controlledIsOpen !== undefined) {
        setIsOpen(controlledIsOpen);
      }
    }, [controlledIsOpen]);

    const handleToggle = () => {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onOpenChange?.(newIsOpen);
    };

    // Close when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          onOpenChange?.(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onOpenChange]);

    // Close on escape key
    useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
        if (isOpen && event.key === "Escape") {
          setIsOpen(false);
          onOpenChange?.(false);
        }
      };

      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }, [isOpen, onOpenChange]);

    // Calculate menu width
    useEffect(() => {
      if (isOpen && triggerRef.current && menuRef.current) {
        if (width === "trigger") {
          const triggerWidth = triggerRef.current.offsetWidth;
          menuRef.current.style.width = `${triggerWidth}px`;
        } else if (typeof width === "number") {
          menuRef.current.style.width = `${width}px`;
        } else {
          menuRef.current.style.width = "auto";
        }
      }
    }, [isOpen, width]);

    // Handle dropdown positioning
    useEffect(() => {
      if (isOpen && triggerRef.current && menuRef.current) {
        const classes = [
          styles.menu,
          styles[position],
          isOpen ? styles.open : "",
        ]
          .filter(Boolean)
          .join(" ");

        menuRef.current.className = classes;
      }
    }, [isOpen, position]);

    const containerClasses = [styles.container, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses} ref={ref || containerRef}>
        <div className={styles.trigger} onClick={handleToggle} ref={triggerRef}>
          {trigger}
        </div>

        {isOpen && (
          <div className={`${styles.menu} ${styles[position]}`} ref={menuRef}>
            {children}
          </div>
        )}
      </div>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

export interface DropdownItemProps {
  /**
   * Item content
   */
  children: ReactNode;

  /**
   * Click handler for the item
   */
  onClick?: () => void;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Icon to display before the label
   */
  icon?: ReactNode;

  /**
   * Additional CSS class for the item
   */
  className?: string;
}

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, onClick, disabled = false, icon, className = "" }, ref) => {
    const itemClasses = [
      styles.item,
      disabled ? styles.disabled : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick = () => {
      if (!disabled && onClick) {
        onClick();
      }
    };

    return (
      <div
        className={itemClasses}
        onClick={handleClick}
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemContent}>{children}</span>
      </div>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

export interface DropdownSeparatorProps {
  /**
   * Additional CSS class for the separator
   */
  className?: string;
}

export const DropdownSeparator = forwardRef<
  HTMLDivElement,
  DropdownSeparatorProps
>(({ className = "" }, ref) => {
  const separatorClasses = [styles.separator, className]
    .filter(Boolean)
    .join(" ");

  return <div className={separatorClasses} ref={ref} role="separator" />;
});

DropdownSeparator.displayName = "DropdownSeparator";

export default DropdownMenu;
