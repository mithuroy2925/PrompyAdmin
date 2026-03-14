import { Link, useLocation } from 'react-router-dom';
import { Home, Image as ImageIcon, Info, Mail, Rabbit, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { websiteName, logoUrl } = useSettings();
  const { isAdmin } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Browse Prompts', path: '/prompts', icon: ImageIcon },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <aside className="w-64 bg-[#161925] border-r border-slate-800 fixed h-full flex flex-col justify-between">
      <div>
        <Link to="/" className="p-6 flex flex-col items-center justify-center border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
          {logoUrl ? (
            <img src={logoUrl} alt={websiteName} className="w-12 h-12 mb-2 object-contain" referrerPolicy="no-referrer" />
          ) : (
            <Rabbit className="w-12 h-12 text-slate-400 mb-2" />
          )}
          <h1 className="text-white font-bold text-lg tracking-wide">{websiteName}</h1>
        </Link>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/prompts' && location.pathname.startsWith('/prompt'));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={twMerge(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 mt-4 border border-purple-500/20"
            >
              <Settings className="w-5 h-5" />
              Admin Panel
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
}
