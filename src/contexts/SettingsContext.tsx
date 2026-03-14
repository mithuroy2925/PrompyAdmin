import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface SettingsContextType {
  websiteName: string;
  logoUrl: string;
  adsScript: string;
  footerMenu: { label: string; url: string }[];
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  websiteName: 'AI Studio App',
  logoUrl: '',
  adsScript: '',
  footerMenu: [],
  isLoading: true,
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [websiteName, setWebsiteName] = useState('AI Studio App');
  const [logoUrl, setLogoUrl] = useState('');
  const [adsScript, setAdsScript] = useState('');
  const [footerMenu, setFooterMenu] = useState<{ label: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubGeneral = onSnapshot(doc(db, 'settings', 'general'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setWebsiteName(data.websiteName || 'AI Studio App');
        setLogoUrl(data.logoUrl || '');
        setAdsScript(data.adsScript || '');
      }
    });

    const unsubFooter = onSnapshot(doc(db, 'settings', 'footer'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setFooterMenu(data.menuItems || []);
      }
      setIsLoading(false);
    });

    return () => {
      unsubGeneral();
      unsubFooter();
    };
  }, []);

  return (
    <SettingsContext.Provider value={{ websiteName, logoUrl, adsScript, footerMenu, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};
