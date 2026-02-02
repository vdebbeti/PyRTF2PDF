import React from 'react';
import { AppConfig, SortingStrategy } from '../types';
import { STRATEGY_LABELS } from '../constants';
import { Settings, FileText, List, Image, Type, Save } from 'lucide-react';

interface ConfigPanelProps {
  config: AppConfig;
  onChange: (newConfig: AppConfig) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange, onGenerate, isGenerating }) => {
  const handleChange = <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="bg-dark-900 border-r border-dark-800 h-full flex flex-col w-full md:w-96 overflow-y-auto custom-scrollbar">
      <div className="p-6 border-b border-dark-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-500" />
          App Configuration
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          Define the logic for your Windows RTF-to-PDF tool.
        </p>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Project Details */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Project Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Application Name</label>
            <input
              type="text"
              value={config.appName}
              onChange={(e) => handleChange('appName', e.target.value)}
              className="w-full bg-dark-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Extension to Scan</label>
            <input
              type="text"
              value={config.sourceExtension}
              onChange={(e) => handleChange('sourceExtension', e.target.value)}
              className="w-full bg-dark-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition"
            />
          </div>
        </section>

        {/* Content Handling */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Content Logic</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={config.handleTables}
                onChange={(e) => handleChange('handleTables', e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-brand-500 focus:ring-brand-500 bg-dark-800"
              />
              <span className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition">
                <List className="w-4 h-4" /> Handle Tables
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={config.handleFigures}
                onChange={(e) => handleChange('handleFigures', e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-brand-500 focus:ring-brand-500 bg-dark-800"
              />
              <span className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition">
                <Image className="w-4 h-4" /> Handle Figures
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={config.handleListings}
                onChange={(e) => handleChange('handleListings', e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-brand-500 focus:ring-brand-500 bg-dark-800"
              />
              <span className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition">
                <FileText className="w-4 h-4" /> Handle Listings
              </span>
            </label>
          </div>
        </section>

        {/* Strategy */}
        <section className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Sorting & Output</h3>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sorting Strategy</label>
            <select
              value={config.sortingStrategy}
              onChange={(e) => handleChange('sortingStrategy', e.target.value as SortingStrategy)}
              className="w-full bg-dark-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
            >
              {Object.entries(STRATEGY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          
          <div className="pt-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.includeTOC}
                onChange={(e) => handleChange('includeTOC', e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-brand-500 focus:ring-brand-500 bg-dark-800"
              />
              <span className="text-sm text-gray-300">Generate Table of Contents</span>
            </label>
            
            {config.includeTOC && (
              <div className="mt-2 ml-7">
                 <label className="block text-xs text-gray-500 mb-1">TOC Depth</label>
                 <input
                  type="number"
                  min={1}
                  max={5}
                  value={config.tocDepth}
                  onChange={(e) => handleChange('tocDepth', parseInt(e.target.value))}
                  className="w-20 bg-dark-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
                 />
              </div>
            )}
          </div>
        </section>
        
        {/* Engine Settings */}
        <section className="space-y-4">
           <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Engine</h3>
           <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.useWin32Com}
                onChange={(e) => handleChange('useWin32Com', e.target.checked)}
                className="w-4 h-4 mt-1 rounded border-gray-600 text-brand-500 focus:ring-brand-500 bg-dark-800"
              />
              <div className="text-sm text-gray-300">
                <span className="block font-medium">Use MS Word Engine (win32com)</span>
                <span className="text-xs text-gray-500">Requires MS Word installed on target machine. Best quality for RTF.</span>
              </div>
            </label>
        </section>
      </div>

      <div className="p-6 border-t border-dark-800 bg-dark-900 sticky bottom-0">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-white transition-all shadow-lg ${
            isGenerating 
              ? 'bg-gray-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/20 active:scale-[0.98]'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Thinking...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Generate Python App
            </>
          )}
        </button>
      </div>
    </div>
  );
};