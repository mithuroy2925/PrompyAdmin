import { Search } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-16 bg-[#0f111a]/80 backdrop-blur-md border-b border-slate-800 fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-8">
      <div className="flex-1">
        <p className="text-slate-300 font-medium">Discover and share AI art prompts with our creative community</p>
      </div>
      <div className="w-72 h-10 bg-slate-800/50 border border-slate-700/50 rounded flex items-center justify-center text-xs text-slate-500">
        Advertisement Space
      </div>
    </header>
  );
}
