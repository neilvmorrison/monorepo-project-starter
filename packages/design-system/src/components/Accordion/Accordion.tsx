import {
  type ReactNode,
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useSpring, animated, a } from "@react-spring/web";
import Surface from "../surface";
import styles from "./Accordion.module.css";

interface AccordionContextType {
  expanded: string[];
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  defaultExpandedItems?: string[];
  className?: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      allowMultiple = false,
      defaultExpanded = [],
      defaultExpandedItems,
      className = "",
    },
    ref
  ) => {
    const initialExpanded = defaultExpandedItems || defaultExpanded;
    const [expanded, setExpanded] = useState<string[]>(initialExpanded);

    const toggleItem = (id: string) => {
      if (allowMultiple) {
        setExpanded((prev) =>
          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
      } else {
        setExpanded((prev) => (prev.includes(id) ? [] : [id]));
      }
    };

    return (
      <AccordionContext.Provider
        value={{ expanded, toggleItem, allowMultiple }}
      >
        <div ref={ref} className={`${styles.accordion} ${className}`}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    { id: providedId, title, children, className = "", disabled = false },
    ref
  ) => {
    const context = useContext(AccordionContext);
    if (!context)
      throw new Error("AccordionItem must be used within Accordion");

    const generatedId = useRef(
      `accordion-${Math.random().toString(36).substring(2, 9)}`
    ).current;
    const id = providedId || generatedId;

    const { expanded, toggleItem } = context;
    const isExpanded = expanded.includes(id);
    const contentRef = useRef<HTMLDivElement>(null);

    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [children]);

    const springProps = useSpring({
      height: isExpanded ? contentHeight : 0,
      opacity: isExpanded ? 1 : 0,
      config: {
        tension: 250,
        friction: 32,
        clamp: true,
      },
    });

    const handleToggle = () => {
      if (!disabled) {
        toggleItem(id);
      }
    };

    const AnimatedDiv = animated("div");

    return (
      <div
        ref={ref}
        className={`${styles.item} ${className} ${
          disabled ? styles.disabled : ""
        }`}
      >
        <button
          className={`${styles.trigger} ${isExpanded ? styles.expanded : ""}`}
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-controls={`accordion-content-${id}`}
          disabled={disabled}
        >
          <span className={styles.headerContent}>{title}</span>
          <span
            className={`${styles.icon} ${isExpanded ? styles.expanded : ""}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        <AnimatedDiv
          id={`accordion-content-${id}`}
          role="region"
          aria-labelledby={`accordion-trigger-${id}`}
          className={styles.panel}
          style={springProps}
        >
          <div ref={contentRef} className={styles.panelInner}>
            <Surface
              variant="outlined"
              radius="small"
              className="p-4"
              // style={{ marginTop: -1 }}
            >
              {children}
            </Surface>
          </div>
        </AnimatedDiv>
      </div>
    );
  }
);

Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
