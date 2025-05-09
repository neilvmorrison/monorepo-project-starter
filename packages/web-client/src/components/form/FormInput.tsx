import { Input, InputSize } from "design-system";

interface FormInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "size"
  > {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  size?: InputSize;
}

export default function FormInput({
  label,
  id,
  value,
  onChange,
  error,
  className = "",
  size = "medium",
  ...props
}: FormInputProps) {
  // Filter out any props that would conflict with design-system Input
  const filteredProps = { ...props };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        value={value}
        onChange={(val: string) => onChange(val)}
        size={size}
        className={`
          w-full rounded-md border p-2
          ${error ? "border-red-500" : "border-slate-200"}
          ${className}
        `.trim()}
        isError={!!error}
        caption={error || ""}
        captionType={error ? "error" : "none"}
        {...filteredProps}
      />
    </div>
  );
}
