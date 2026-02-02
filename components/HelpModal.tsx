import React from 'react';
import { X, Cpu, Code2, Play } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-dark-900 border border-dark-800 rounded-xl shadow-2xl max-w-2xl w-full text-white overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-dark-800 bg-dark-950/50">
          <h2 className="text-xl font-bold">How to use PyRTF2PDF</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="flex gap-4">
             <div className="flex-none w-10 h-10 rounded-full bg-brand-900/50 flex items-center justify-center border border-brand-500/20 text-brand-500">
               <Cpu className="w-5 h-5" />
             </div>
             <div>
               <h3 className="font-semibold text-brand-100 mb-1">1. Configure Your Logic</h3>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Use the panel on the left to describe exactly how you want your Windows utility to behave. 
                 Decide whether to merge everything into one PDF or split Tables/Figures into separate files.
                 Enable the "Use MS Word Engine" for high-fidelity conversion if you have Word installed.
               </p>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="flex-none w-10 h-10 rounded-full bg-brand-900/50 flex items-center justify-center border border-brand-500/20 text-brand-500">
               <Code2 className="w-5 h-5" />
             </div>
             <div>
               <h3 className="font-semibold text-brand-100 mb-1">2. Generate the Source Code</h3>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Click the <strong>Generate Python App</strong> button. We use Google's Gemini 3.0 Pro to write a complete, 
                 production-ready Python script based on your specific configuration.
               </p>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="flex-none w-10 h-10 rounded-full bg-brand-900/50 flex items-center justify-center border border-brand-500/20 text-brand-500">
               <Play className="w-5 h-5" />
             </div>
             <div>
               <h3 className="font-semibold text-brand-100 mb-1">3. Build & Run</h3>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Once generated, use the tabs on the right to view the code. 
                 Check the <strong>Instructions</strong> tab for a step-by-step guide on how to install Python dependencies 
                 and turn the script into a standalone <code>.exe</code> file for your users.
               </p>
             </div>
          </div>
        </div>
        
        <div className="p-6 bg-dark-950/30 border-t border-dark-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white text-sm font-medium rounded-lg transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};