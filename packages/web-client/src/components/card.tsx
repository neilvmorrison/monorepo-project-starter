import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 p-6 shadow-md ${className}`.trim()}
    >
      {children}
    </div>
  );
}
