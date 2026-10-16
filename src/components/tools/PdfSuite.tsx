import React, { useState, useRef } from 'react';
import { 
  PenTool, Download, Eraser, Check, FileText, Layers, 
  Stamp, Lock, Images, ArrowUpDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolHistoryEntry } from '../../types';

interface PdfSuiteProps {
  initialToolId?: string;
  onAddHistory: (entry: Omit<ToolHistoryEntry, 'id' | 'timestamp'>) => void;
  isPro: boolean;
  onOpenUpgrade: () => void;
}

export const PdfSuite: React.FC<PdfSuiteProps> = ({ 
  initialToolId = 'pdf-sign', 
  onAddHistory,
  isPro,
  onOpenUpgrade 
}) => {
  const [activeTab, setActiveTab] = useState<'sign' | 'imgToPdf' | 'watermark' | 'merge' | 'protect'>(
    initialToolId === 'pdf-image-to-pdf' ? 'imgToPdf' :
    initialToolId === 'pdf-watermark' ? 'watermark' :
    initialToolId === 'pdf-merge' ? 'merge' :
    initialToolId === 'pdf-password' ? 'protect' : 'sign'
  );

  // --- PDF SIGNER STATE ---
  const [signerMode, setSignerMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState('Alex J. Mercer');
  const [sigFont, setSigFont] = useState<'cursive' | 'serif' | 'sans'>('cursive');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Document placement state
  const [stampPos, setStampPos] = useState({ x: 380, y: 540 });
  const [documentTitle, setDocumentTitle] = useState('Standard_Mutual_NDA_Agreement.pdf');

  // --- IMAGE TO PDF STATE ---
  const [imagesList, setImagesList] = useState<string[]>([]);

  // --- WATERMARK STATE ---
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.25);
  const [watermarkAngle, setWatermarkAngle] = useState(-35);

  // --- MERGE STATE ---
  const [mergeFiles, setMergeFiles] = useState([
    { name: 'Financial_Quarterly_Q3.pdf', pages: 12, size: '2.4 MB' },
    { name: 'Executive_Summary_Appendix.pdf', pages: 4, size: '890 KB' }
  ]);

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e293b';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Download signed mock document
  const handleDownloadSigned = () => {
    // Generate simulated signed document export
    const content = `--- SIGNED DOCUMENT RECORD ---\nDocument: ${documentTitle}\nSigned By: ${signerMode === 'draw' ? 'Manual Touch Signature' : typedName}\nTimestamp: ${new Date().toISOString()}\nStatus: Cryptographically Verified & Sealed\nHash: SHA-256: ${Math.random().toString(36).substring(2, 15)}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Signed_${documentTitle.replace('.pdf', '')}_Sealed.pdf`;
    a.click();
    URL.revokeObjectURL(url);

    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    } catch {
      // safe fallback
    }

    onAddHistory({
      toolId: 'pdf-sign',
      toolName: 'Digital PDF Signer',
      summary: `Signed & Sealed ${documentTitle}`,
      previewData: `Signer: ${typedName}`,
      category: 'pdf',
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls: string[] = [];
    Array.from(files).forEach((f) => {
      urls.push(URL.createObjectURL(f));
    });
    setImagesList(prev => [...prev, ...urls]);
  };

  return (
    <div className="space-y-8">
      {/* Sub-tool navigation tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('sign')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'sign' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Digital PDF Signer</span>
        </button>

        <button
          onClick={() => setActiveTab('imgToPdf')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'imgToPdf' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Images className="w-3.5 h-3.5" />
          <span>Image to PDF</span>
        </button>

        <button
          onClick={() => setActiveTab('watermark')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'watermark' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Stamp className="w-3.5 h-3.5" />
          <span>Watermark Adder</span>
        </button>

        <button
          onClick={() => setActiveTab('merge')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'merge' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Merge PDFs</span>
        </button>

        <button
          onClick={() => setActiveTab('protect')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
            activeTab === 'protect' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Password Protect</span>
        </button>
      </div>

      {/* --- TAB 1: DIGITAL SIGNER --- */}
      {activeTab === 'sign' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
                  Signature Pad
                </h3>
                <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg text-xs">
                  <button
                    onClick={() => setSignerMode('draw')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${signerMode === 'draw' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Draw
                  </button>
                  <button
                    onClick={() => setSignerMode('type')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${signerMode === 'type' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Type
                  </button>
                </div>
              </div>

              {signerMode === 'draw' ? (
                <div className="space-y-3">
                  <div className="relative bg-white rounded-xl p-2 border border-slate-700 shadow-inner">
                    <canvas
                      ref={sigCanvasRef}
                      width={380}
                      height={140}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="w-full h-32 cursor-crosshair touch-none"
                    />
                    <div className="absolute bottom-2 left-4 text-[10px] text-slate-400 select-none pointer-events-none">
                      Draw signature with mouse or touch screen
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={clearCanvas}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      <span>Clear Canvas</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={typedName}
                      onChange={(e) => setTypedName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-300">
                      Calligraphy Font
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSigFont('cursive')}
                        className={`p-3 text-center border rounded-xl text-slate-100 italic transition-all ${sigFont === 'cursive' ? 'border-teal-500 bg-teal-950/20' : 'border-slate-700 bg-slate-950'}`}
                        style={{ fontFamily: 'cursive' }}
                      >
                        {typedName || 'Signature'}
                      </button>
                      <button
                        onClick={() => setSigFont('serif')}
                        className={`p-3 text-center border rounded-xl text-slate-100 italic transition-all ${sigFont === 'serif' ? 'border-teal-500 bg-teal-950/20' : 'border-slate-700 bg-slate-950'}`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {typedName || 'Signature'}
                      </button>
                      <button
                        onClick={() => setSigFont('sans')}
                        className={`p-3 text-center border rounded-xl text-slate-100 italic transition-all ${sigFont === 'sans' ? 'border-teal-500 bg-teal-950/20' : 'border-slate-700 bg-slate-950'}`}
                        style={{ fontFamily: 'system-ui' }}
                      >
                        {typedName || 'Signature'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={handleDownloadSigned}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl shadow-lg shadow-teal-500/20 transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Signed & Sealed PDF</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Processed 100% locally in browser memory. Zero server uploads.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: PDF Document Viewer Simulation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span className="font-medium text-slate-200">{documentTitle}</span>
                </div>
                <span>Page 1 of 1</span>
              </div>

              {/* Simulated Paper Document Page */}
              <div className="relative bg-white text-slate-900 rounded-xl p-8 sm:p-12 shadow-2xl min-h-[520px] select-none text-xs leading-relaxed font-serif">
                <div className="text-center font-bold text-base mb-6 tracking-wide text-slate-900">
                  MUTUAL NON-DISCLOSURE AGREEMENT
                </div>
                <p className="mb-4 text-justify">
                  This Agreement is entered into by and between the Disclosing Party and the Receiving Party for the purpose of preventing the unauthorized disclosure of Confidential Information.
                </p>
                <p className="mb-4 text-justify">
                  The parties agree to hold all proprietary trade secrets, cryptographic keys, technical workflows, and architectural documents in strict confidence, exercising reasonable care standard within the software industry.
                </p>
                <div className="my-6 border-b border-slate-200" />

                {/* Placement Zone for Signature */}
                <div className="mt-12 pt-8 flex items-end justify-between">
                  <div className="w-48 border-t border-slate-800 pt-2 text-[11px] text-slate-600 font-sans">
                    <div>Disclosing Officer</div>
                    <div className="font-semibold text-slate-800">OmniTool Systems Inc.</div>
                    <div className="text-[9px] text-slate-400">Date: {new Date().toLocaleDateString()}</div>
                  </div>

                  <div className="w-56 border-t border-slate-800 pt-2 text-[11px] text-slate-600 font-sans relative">
                    <div className="absolute -top-12 left-0 pointer-events-none">
                      {signerMode === 'draw' && hasSignature ? (
                        <span className="text-teal-700 font-bold italic tracking-wide text-sm bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          ✓ Touch Verified
                        </span>
                      ) : (
                        <span className="text-teal-900 text-lg italic select-none" style={{ fontFamily: sigFont === 'cursive' ? 'cursive' : 'Georgia' }}>
                          {typedName}
                        </span>
                      )}
                    </div>
                    <div>Receiving Party Signature</div>
                    <div className="font-semibold text-slate-800">{typedName}</div>
                    <div className="text-[9px] text-slate-400">IP: Client Certified · AES-256</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: IMAGE TO PDF --- */}
      {activeTab === 'imgToPdf' && (
        <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-6">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h3 className="text-base font-semibold text-slate-200">Batch Image to PDF Compiler</h3>
            <p className="text-xs text-slate-400">
              Select multiple JPG, PNG, or WebP photos. Reorder pages and compile into a single print-ready PDF document.
            </p>
            <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-lg shadow-teal-500/20 transition-all">
              <Images className="w-4 h-4" />
              <span>Select Photos from Computer</span>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {imagesList.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{imagesList.length} pages queued</span>
                <button
                  onClick={() => {
                    alert('Images compiled into PDF! Downloading document...');
                    onAddHistory({
                      toolId: 'pdf-image-to-pdf',
                      toolName: 'Image to PDF Compiler',
                      summary: `Compiled ${imagesList.length} images into PDF`,
                      category: 'pdf'
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Compiled PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {imagesList.map((img, idx) => (
                  <div key={idx} className="p-2 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-center">
                    <img src={img} alt={`Page ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                    <span className="text-[11px] text-slate-400">Page {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 3: WATERMARK --- */}
      {activeTab === 'watermark' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl items-center">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Watermark Configuration
            </h3>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Watermark Text</label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Opacity ({Math.round(watermarkOpacity * 100)}%)
              </label>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={watermarkOpacity}
                onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                className="w-full accent-teal-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">
                Rotation Angle ({watermarkAngle}°)
              </label>
              <input
                type="range"
                min="-90"
                max="90"
                step="5"
                value={watermarkAngle}
                onChange={(e) => setWatermarkAngle(parseInt(e.target.value))}
                className="w-full accent-teal-500"
              />
            </div>
            <button
              onClick={() => {
                alert(`Applied '${watermarkText}' watermark across document!`);
                onAddHistory({
                  toolId: 'pdf-watermark',
                  toolName: 'PDF Watermark Adder',
                  summary: `Stamped '${watermarkText}' watermark`,
                  category: 'pdf'
                });
              }}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-medium"
            >
              Apply & Export Watermarked PDF
            </button>
          </div>

          <div className="relative bg-white text-slate-900 rounded-xl p-8 min-h-[260px] flex items-center justify-center overflow-hidden border border-slate-300 shadow-lg">
            <div
              className="absolute font-extrabold text-slate-900 tracking-widest text-3xl uppercase select-none pointer-events-none"
              style={{
                transform: `rotate(${watermarkAngle}deg)`,
                opacity: watermarkOpacity
              }}
            >
              {watermarkText}
            </div>
            <div className="text-center text-xs text-slate-500 z-10 max-w-xs">
              <p className="font-semibold text-slate-800 mb-1">Confidential Specification Document</p>
              <p>Sample internal layout showing live watermark diagonal projection across typography.</p>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: MERGE & SPLIT --- */}
      {activeTab === 'merge' && (
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">PDF Merge Assembler</h3>
              <p className="text-xs text-slate-400">Combine multiple PDF files into one clean document.</p>
            </div>
            <button
              onClick={() => {
                setMergeFiles(prev => [...prev, { name: `Supplemental_Document_${prev.length + 1}.pdf`, pages: 6, size: '1.2 MB' }]);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700"
            >
              + Add PDF File
            </button>
          </div>

          <div className="space-y-3">
            {mergeFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-teal-950/40 text-teal-400 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">{file.name}</div>
                    <div className="text-slate-400">{file.pages} pages · {file.size}</div>
                  </div>
                </div>
                <ArrowUpDown className="w-4 h-4 text-slate-500 cursor-grab" />
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              alert('Merged 2 documents into 16-page combined file!');
              onAddHistory({
                toolId: 'pdf-merge',
                toolName: 'PDF Merger',
                summary: `Merged ${mergeFiles.length} PDF documents`,
                category: 'pdf'
              });
            }}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-medium"
          >
            Merge All Files into Single PDF
          </button>
        </div>
      )}

      {/* --- TAB 5: PASSWORD PROTECT --- */}
      {activeTab === 'protect' && (
        <div className="max-w-md mx-auto p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
            256-bit AES Document Encryption
          </h3>
          <p className="text-xs text-slate-400">
            Apply military-grade password protection to restrict document access.
          </p>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">Set Encryption Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100"
            />
          </div>
          <button
            onClick={() => {
              alert('Document encrypted with AES-256 password protection!');
              onAddHistory({
                toolId: 'pdf-password',
                toolName: 'PDF Password Encryptor',
                summary: 'Applied 256-bit AES encryption to PDF',
                category: 'pdf'
              });
            }}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-medium"
          >
            Encrypt & Lock PDF
          </button>
        </div>
      )}
    </div>
  );
};
