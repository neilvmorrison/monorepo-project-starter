import { ReactNode } from "react";

interface IMainLayoutProps {
  children: ReactNode[];
}

export default function MainLayout({ children }: IMainLayoutProps) {
  const [child1, child2] = children;
  return (
    <main className="grid grid-cols-12">
      <div className="col-span-3 h-screen">{child1}</div>
      <div className="col-span-8 mt-12 ml-12 flex flex-col justify-between">
        <div className="flex flex-col gap-6">{child2}</div>
      </div>
    </main>
  );
}
