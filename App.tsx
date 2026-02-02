import React, { useState, useCallback } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { CodeViewer } from './components/CodeViewer';
import { AppConfig, SortingStrategy, GeneratedResult, GenerationStatus } from './types';
import { DEFAULT_CONFIG } from './constants';
import { generatePythonApp } from './services/geminiService';
import { Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setStatus(GenerationStatus.GENERATING);
    setError(null);
    try {
      const generatedData = await generatePythonApp(config);
      setResult(generatedData);
      setStatus(GenerationStatus.COMPLETED);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setStatus(GenerationStatus.ERROR);
    }
  }, [config]);

  return (
    <div className="flex flex-col h-screen bg-dark-950 text-white overflow-hidden font-sans">
      {/* Header */}
      <header className="flex-none bg-dark-900 border-b border-dark-800 h-16 flex items-center px-6 justify-between z-10 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">PyRTF2PDF Generator</h1>
            <p className="text-xs text-gray-400">Windows Utility Builder</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {status === GenerationStatus.ERROR && (
             <span className="text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded border border-red-400/20">
               {error}
             </span>
           )}
           <div className="text-xs text-gray-500 font-mono hidden md:block">
             Powered by Gemini 3.0 Pro
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Config */}
        <ConfigPanel 
          config={config} 
          onChange={setConfig} 
          onGenerate={handleGenerate}
          isGenerating={status === GenerationStatus.GENERATING}
        />
        
        {/* Right Panel: Code Viewer */}
        <CodeViewer result={result} />
      </main>
    </div>
  );
};

export default App;