import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { FileCode, BookOpen, Download, Check, Clipboard } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface CodeViewerProps {
  result: GeneratedResult | null;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'code' | 'instructions' | 'requirements'>('code');
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-gray-500 h-full bg-dark-950">
        <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center mb-6">
          <FileCode className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-300 mb-2">Ready to Build</h3>
        <p className="max-w-md">
          Configure your RTF-to-PDF tool settings on the left and click "Generate" to create your custom Python application code.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    const content = activeTab === 'code' ? result.code : activeTab === 'requirements' ? result.requirements : result.instructions;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-dark-950 overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-dark-800 bg-dark-900">
        <div className="flex space-x-1 bg-dark-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'code' ? 'bg-brand-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            main.py
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'requirements' ? 'bg-brand-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            requirements.txt
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'instructions' ? 'bg-brand-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            Instructions
          </button>
        </div>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white text-sm transition"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Clipboard className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Content'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto custom-scrollbar p-6">
        {activeTab === 'code' && (
          <pre className="font-mono text-sm text-gray-300 bg-dark-900 p-6 rounded-lg border border-dark-800 overflow-x-auto">
            <code>{result.code}</code>
          </pre>
        )}
        
        {activeTab === 'requirements' && (
           <pre className="font-mono text-sm text-gray-300 bg-dark-900 p-6 rounded-lg border border-dark-800 overflow-x-auto">
             <code>{result.requirements}</code>
           </pre>
        )}

        {activeTab === 'instructions' && (
          <div className="prose prose-invert prose-sm max-w-none bg-dark-900 p-8 rounded-lg border border-dark-800">
            <ReactMarkdown>{result.instructions}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};