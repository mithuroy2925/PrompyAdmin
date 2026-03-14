import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function AdminSettings() {
  const [websiteName, setWebsiteName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [adsScript, setAdsScript] = useState('');
  const [footerMenu, setFooterMenu] = useState<{ label: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const generalDoc = await getDoc(doc(db, 'settings', 'general'));
        if (generalDoc.exists()) {
          const data = generalDoc.data();
          setWebsiteName(data.websiteName || '');
          setLogoUrl(data.logoUrl || '');
          setAdsScript(data.adsScript || '');
        }

        const footerDoc = await getDoc(doc(db, 'settings', 'footer'));
        if (footerDoc.exists()) {
          setFooterMenu(footerDoc.data().menuItems || []);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'general'), {
        websiteName,
        logoUrl,
        adsScript,
      });
      alert('General settings saved successfully!');
    } catch (error) {
      console.error('Error saving general settings:', error);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveFooter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'footer'), {
        menuItems: footerMenu,
      });
      alert('Footer settings saved successfully!');
    } catch (error) {
      console.error('Error saving footer settings:', error);
      alert('Failed to save footer settings.');
    } finally {
      setSaving(false);
    }
  };

  const addFooterItem = () => {
    setFooterMenu([...footerMenu, { label: '', url: '' }]);
  };

  const removeFooterItem = (index: number) => {
    const newMenu = [...footerMenu];
    newMenu.splice(index, 1);
    setFooterMenu(newMenu);
  };

  const updateFooterItem = (index: number, field: 'label' | 'url', value: string) => {
    const newMenu = [...footerMenu];
    newMenu[index][field] = value;
    setFooterMenu(newMenu);
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>

      {/* General Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <form onSubmit={handleSaveGeneral} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website Name</label>
            <input
              type="text"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL (Optional)</label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/logo.png"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ads Script Code (Optional)</label>
            <textarea
              value={adsScript}
              onChange={(e) => setAdsScript(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
              placeholder="<script>...</script>"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save size={18} />
            <span>Save General Settings</span>
          </button>
        </form>
      </div>

      {/* Footer Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Footer Menu</h2>
        <form onSubmit={handleSaveFooter} className="space-y-4">
          {footerMenu.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateFooterItem(index, 'label', e.target.value)}
                placeholder="Label (e.g., About Us)"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                value={item.url}
                onChange={(e) => updateFooterItem(index, 'url', e.target.value)}
                placeholder="URL (e.g., /about)"
                className="flex-1 p-2 border border-gray-300 rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => removeFooterItem(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFooterItem}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
          >
            <Plus size={18} />
            <span>Add Menu Item</span>
          </button>
          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              <Save size={18} />
              <span>Save Footer Menu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
