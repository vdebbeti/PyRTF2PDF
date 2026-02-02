import { GoogleGenAI } from "@google/genai";
import { AppConfig, SortingStrategy, GeneratedResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePythonApp = async (config: AppConfig): Promise<GeneratedResult> => {
  const model = 'gemini-3-pro-preview';

  const sortingPrompt = config.sortingStrategy === SortingStrategy.COMBINED
    ? "Merge all detected RTF files into a single sequence based on their numeric ID found in filenames."
    : config.sortingStrategy === SortingStrategy.SEPARATE_FILES
    ? "Generate separate PDF files for Tables, Listings, and Figures."
    : "Merge into one PDF, but group all Tables first, then Figures, then Listings (or vice versa based on standard reporting).";

  const libraryHint = config.useWin32Com 
    ? "Use 'pywin32' (win32com.client) to leverage MS Word for high-fidelity RTF to PDF conversion. This is a Windows-only requirement."
    : "Use a cross-platform library if possible, but prioritize 'pywin32' if quality is paramount for RTF.";

  const prompt = `
    I need a complete, professional, production-ready Python application that I can run on Windows.
    
    **Goal**: A Windows utility script to process RTF files and merge them into PDF(s).
    
    **Specifications**:
    1.  **App Name**: ${config.appName}
    2.  **Input**: Recursively scan a directory for files ending in '${config.sourceExtension}'.
    3.  **Content Types**: Detect and handle ${config.handleTables ? 'Tables' : ''} ${config.handleFigures ? ', Figures' : ''} ${config.handleListings ? ', Listings' : ''}.
    4.  **Sorting Logic**: ${sortingPrompt}
    5.  **TOC**: ${config.includeTOC ? `Generate a clickable Table of Contents at the beginning of the PDF (Depth: ${config.tocDepth}).` : 'No TOC needed.'}
    6.  **Conversion Engine**: ${libraryHint}
    7.  **Output**: A clean PDF file(s).
    
    **Requirements**:
    - The code must be robust, using classes and proper error handling.
    - Include a \`main\` block that uses \`argparse\` for command line arguments (input dir, output dir).
    - Provide specific instructions on how to bundle this into an .exe using PyInstaller.
    - The script should scan filenames (e.g., "Table 14.1.rtf", "Figure 2.rtf") to determine type and order.
    
    **Response Format**:
    Return a JSON object with three keys:
    - "code": The full Python source code.
    - "requirements": Content for requirements.txt.
    - "instructions": Markdown guide on how to setup environment, install dependencies, run the script, and build the EXE.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 2048 }, // Allow some thinking for architectural decisions
      }
    });

    const text = response.text || "{}";
    const json = JSON.parse(text);

    return {
      code: json.code || "# Error generating code",
      requirements: json.requirements || "# Error generating requirements",
      instructions: json.instructions || "Error generating instructions"
    };
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate application code. Please check API Key or try again.");
  }
};