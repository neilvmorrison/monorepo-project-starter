import { Input } from "design-system";

interface FormInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FormInput({
  label,
  id,
  value,
  onChange,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        value={value}
        onChange={(val: string) => onChange(val)}
        className={`
          w-full rounded-md border p-2
          ${error ? "border-red-500" : "border-slate-200"}
          ${className}
        `.trim()}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
