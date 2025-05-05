import { Button } from "../button";
import { UserProfile, UserProject } from "shared/types";

interface ISidebarProps {
  currentUser: UserProfile | null;
  projects: UserProject[];
}

export default function Sidebar({ currentUser, projects }: ISidebarProps) {
  return (
    <div className="fixed top-0 left-0 p-3 border-r border-gray-200 w-[240px] h-screen">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-lg">Chatbot</h1>
          <div className="flex gap-3 items-center">
            <label className="text-sm font-semibold text-slate-500">
              Recent Conversations
            </label>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <label className="text-sm font-semibold text-slate-500">
                Projects
              </label>
              <Button variant="ghost">+</Button>
            </div>
            {projects?.map((project) => {
              return <div key={project.id}>{project.name}</div>;
            })}
          </div>
        </div>
        <div>{currentUser?.username}</div>
      </div>
    </div>
  );
}
