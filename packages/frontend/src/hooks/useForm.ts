import { FormEvent, useMemo, useState } from "react";

export type FormValue = string | number | boolean | null | FormValues;

export type FormValues = {
  [key: string]: FormValue;
};

export type UseFormOptions = {
  keepDirtyValues?: boolean;
  onSuccess?: (values: FormValues) => void;
  onError?: (error: Error) => void;
  shouldValidate?: boolean;
};

const defaultUseFormOptions: UseFormOptions = {
  keepDirtyValues: false,
  onSuccess: undefined,
  onError: undefined,
  shouldValidate: false,
};

const useForm = <T extends FormValues>(
  initialValues: T,
  options: UseFormOptions = {}
) => {
  const formOptions = { ...defaultUseFormOptions, ...options };
  const initialFormValues = initialValues;
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<null | { [key: string]: string }>(null);
  const [dirtyFields, setDirtyFields] = useState<{ [key: string]: FormValue }>(
    {}
  );
  const [isSubmitting, setSubmitting] = useState(false);
  const isDirty = useMemo(() => {
    return Object.values(dirtyFields).some((value) => !!value);
  }, [dirtyFields]);

  function reset() {
    setValues(initialFormValues);
    setDirtyFields({});
  }

  function clear() {
    const clearObject = (obj: FormValues): FormValues => {
      return Object.keys(obj).reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            typeof obj[key] === "object"
              ? clearObject(obj[key] as FormValues)
              : null,
        }),
        {}
      );
    };

    setDirtyFields({});
    setValues(clearObject(initialFormValues) as T);
  }

  function setValue(path: string, value: FormValue) {
    setDirtyFields({ ...dirtyFields, [path]: value });
    setValues((prev) => {
      const keys = path.split(".");
      const lastKey = keys.pop()!;
      const newValues = { ...prev } as Record<string, FormValue>;

      let current = newValues;
      for (const key of keys) {
        current[key] = current[key] || ({} as FormValue);
        current = current[key] as FormValues;
      }

      current[lastKey] = value;
      return newValues as T;
    });
  }

  function getValue(path: string): FormValue {
    return path
      .split(".")
      .reduce((obj, key) => (obj as FormValues)?.[key], values as FormValue);
  }

  function handleSubmit<R>(callback: (values: T) => Promise<R>) {
    if (formOptions.shouldValidate) {
      validate();
    }
    return (e?: FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();
      setSubmitting(true);
      callback(values);
    };
  }

  function validate() {
    setErrors({});
  }

  return {
    values,
    isDirty,
    isSubmitting,
    dirtyFields,
    errors,
    handleSubmit,
    validate,
    setValue,
    getValue,
    reset,
    clear,
  };
};

export default useForm;
