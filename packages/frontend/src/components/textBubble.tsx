export default function TextBubble({ text }: { text: string }) {
  return (
    <div className="p-4 rounded-sm bg-blue-500 text-white size-fit self-end max-w-3/4">
      {text}
    </div>
  );
}
