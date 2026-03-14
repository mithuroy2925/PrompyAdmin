import { Rabbit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

export default function Footer() {
  const { websiteName, logoUrl, footerMenu } = useSettings();

  return (
    <footer className="mt-24 border-t border-slate-800 pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <div className="flex items-center gap-3 mb-4">
            {logoUrl ? (
              <img src={logoUrl} alt={websiteName} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
            ) : (
              <Rabbit className="w-8 h-8 text-slate-400" />
            )}
            <span className="text-white font-bold text-lg">{websiteName}</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Discover and share AI art prompts with our creative community
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Resources</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Tutorials</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Company</h3>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Links</h3>
          <ul className="space-y-3">
            {footerMenu.map((item, index) => (
              <li key={index}>
                <Link to={item.url} className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li><Link to="/privacy-policy" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} {websiteName} All Rights Reserved.</p>
      </div>
    </footer>
  );
}
