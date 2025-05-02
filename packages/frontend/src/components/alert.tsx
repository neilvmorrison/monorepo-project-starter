import { ReactNode } from "react";
import { CheckCircle2, XCircle, Info, AlertCircle } from "lucide-react";

type AlertVariant = "success" | "error" | "information";

interface AlertProps {
  variant: AlertVariant;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  title?: string;
}

const variantConfig = {
  success: {
    role: "status",
    ariaLive: "polite",
    defaultClass: "bg-green-100 text-green-800 border-green-300",
    Icon: CheckCircle2,
    iconClass: "text-green-600",
  },
  error: {
    role: "alert",
    ariaLive: "assertive",
    defaultClass: "bg-red-100 text-red-800 border-red-300",
    Icon: AlertCircle,
    iconClass: "text-red-600",
  },
  information: {
    role: "note",
    ariaLive: "polite",
    defaultClass: "bg-blue-100 text-blue-800 border-blue-300",
    Icon: Info,
    iconClass: "text-blue-600",
  },
} as const;

export function Alert({
  variant,
  children,
  className = "",
  onClose,
  title,
}: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.Icon;

  return (
    <div
      role={config.role}
      aria-live={config.ariaLive}
      className={`
        rounded-lg p-4 border flex gap-3
        ${config.defaultClass}
        ${className}
      `.trim()}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.iconClass}`} />
      <div className="flex-grow">
        {title && <h3 className="font-medium mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70"
          aria-label="Dismiss message"
        >
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
