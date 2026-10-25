import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Pencil, 
  Eraser, 
  RotateCcw, 
  Trash2, 
  Download, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SketchCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAttachSketchToCommission: (dataUrl: string) => void;
}

export const SketchCanvasModal: React.FC<SketchCanvasModalProps> = ({
  isOpen,
  onClose,
  onAttachSketchToCommission,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'pen' | 'eraser'>('pencil');
  const [color, setColor] = useState<string>('#262626');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Small delay to ensure canvas element is rendered in DOM
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Handle high DPI
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      ctx.scale(2, 2);

      // Fill with vintage sketching paper background
      ctx.fillStyle = '#FAF7F2';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Save initial state to history
      const initial = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initial]);
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const saveHistoryStep = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), data]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const newHist = [...history];
    newHist.pop(); // remove current
    const prev = newHist[newHist.length - 1];
    setHistory(newHist);

    const canvas = canvasRef.current;
    if (!canvas || !prev) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(prev, 0, 0);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, rect.width, rect.height);
    saveHistoryStep();
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === 'eraser') {
      ctx.strokeStyle = '#FAF7F2';
      ctx.lineWidth = lineWidth * 4;
    } else if (tool === 'pen') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth * 1.5;
    } else {
      // pencil
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveHistoryStep();
  };

  const handleAttachToCommission = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onAttachSketchToCommission(dataUrl);
    onClose();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'meu-rascunho-cvm.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-300 flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-900/10 text-amber-900 flex items-center justify-center">
              <Pencil className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Bloco de Rascunho do Ateliê</h3>
              <p className="text-xs text-stone-500">Desenhe um esboço, proporção ou ideia para sua encomenda personalizada</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Tools */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTool('pencil')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                tool === 'pencil' ? 'bg-amber-900 text-white font-medium shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Grafite</span>
            </button>
            <button
              onClick={() => setTool('pen')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                tool === 'pen' ? 'bg-amber-900 text-white font-medium shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>Nanquim</span>
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                tool === 'eraser' ? 'bg-amber-900 text-white font-medium shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Borracha</span>
            </button>
          </div>

          {/* Color Palette */}
          {tool !== 'eraser' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-stone-400">Tom:</span>
              {[
                { hex: '#1c1917', name: 'Grafite Escuro' },
                { hex: '#57534e', name: 'Grafite Médio' },
                { hex: '#854d0e', name: 'Sépia' },
                { hex: '#991b1b', name: 'Sanguínea' },
                { hex: '#1e3a8a', name: 'Azul Nanquim' },
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColor(c.hex)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    color === c.hex ? 'border-amber-900 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          {/* Line width */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-stone-400">Espessura:</span>
            <input
              type="range"
              min="1"
              max="16"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-16 accent-amber-900 cursor-pointer"
            />
          </div>

          {/* Canvas Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={undo}
              disabled={history.length <= 1}
              className="p-1.5 rounded-lg bg-white text-stone-700 hover:bg-stone-200 disabled:opacity-40 transition-colors"
              title="Desfazer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={clearCanvas}
              className="p-1.5 rounded-lg bg-white text-stone-700 hover:bg-rose-100 hover:text-rose-700 transition-colors"
              title="Limpar Tela"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-4 sm:p-6 bg-stone-200/60 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-[#FAF7F2] rounded-2xl shadow-inner border border-stone-300 overflow-hidden relative cursor-crosshair">
            <canvas
              ref={canvasRef}
              className="w-full h-full touch-none block"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <div className="absolute top-3 left-4 pointer-events-none text-stone-400 text-[11px] font-serif italic select-none">
              Papel CVM Ateliê • Rascunho Livre
            </div>
          </div>
        </div>

        {/* Footer with action */}
        <div className="bg-white px-6 py-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Rascunho PNG</span>
          </button>

          <button
            onClick={handleAttachToCommission}
            className="px-6 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <Check className="w-4 h-4 text-amber-200" />
            <span>Usar este Rascunho na Encomenda Sob Medida</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
