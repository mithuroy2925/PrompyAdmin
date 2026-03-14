import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import { useSettings } from '../contexts/SettingsContext';

export default function Layout() {
  const { adsScript } = useSettings();

  return (
    <div className="flex min-h-screen bg-[#0f111a] text-slate-300 font-sans">
      {adsScript && (
        <div dangerouslySetInnerHTML={{ __html: adsScript }} />
      )}
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Topbar />
        <main className="flex-1 p-8 mt-16 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
