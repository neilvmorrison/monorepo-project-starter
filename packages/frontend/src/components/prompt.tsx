import { CommandIcon, PlusIcon } from "lucide-react";
import { Button } from "./button";
import { ChangeEvent, FormEvent, useRef } from "react";
import useKeyboardListener from "../hooks/useKeyboardListener";
import { FormValue } from "../hooks/useForm";

interface IPromptProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  models: { label: string; name: string }[];
  setValue: (field: string, value: string) => void;
  getValue: (field: string) => FormValue;
}

export default function Prompt({
  handleSubmit,
  models,
  setValue,
  getValue,
}: IPromptProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleKeydown() {
    if (formRef.current) {
      const event = new Event("submit", {
        cancelable: true,
        bubbles: true,
      }) as unknown as FormEvent<HTMLFormElement>;
      handleSubmit(event);
    }
  }
  useKeyboardListener(handleKeydown);

  const handleTextareaInput = (value: string) => {
    setValue("prompt", value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className="bg-white p-6 w-[700px] border border-gray-200 rounded-lg drop-shadow-sm flex flex-col gap-3">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3"
        ref={formRef}
      >
        <div>
          <select
            value={getValue("model") as string}
            className="size-fit hover:underline hover:cursor"
            onChange={(e) => setValue("model", e.target.value)}
          >
            {models.map((model) => {
              return <option value={model.name}>{model.label}</option>;
            })}
          </select>
          <label className="text-xs block text-gray-500">Model</label>
        </div>
        <textarea
          ref={textareaRef}
          className="border border-gray-200 rounded-md px-3 py-2 resize-none w-full min-h-[40px] max-h-[300px] overflow-y-auto"
          placeholder="Prompt..."
          value={getValue("prompt") as string}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleTextareaInput(e.target.value)
          }
          rows={1}
        />
        <Button
          className="flex items-center gap-3 text-md"
          leftIcon={
            <span className="flex items-center gap-1">
              <CommandIcon className="size-4" />
              <PlusIcon className="size-4" />
              <span>Enter</span>
            </span>
          }
        >
          Ask
        </Button>
      </form>
    </div>
  );
}
