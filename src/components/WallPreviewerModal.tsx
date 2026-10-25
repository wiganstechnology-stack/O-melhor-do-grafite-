import React, { useState } from 'react';
import { X, Layers, Sun, Moon, Maximize, RotateCcw, Sparkles, Check } from 'lucide-react';
import { Artwork } from '../types/art';

interface WallPreviewerModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenOrder: (artwork: Artwork) => void;
}

type RoomId = 'living-room' | 'office' | 'bedroom' | 'gallery';

interface RoomBackground {
  id: RoomId;
  name: string;
  imageUrl: string;
  wallX: string; // percentage position
  wallY: string;
  furnitureDescription: string;
}

const ROOMS: RoomBackground[] = [
  {
    id: 'living-room',
    name: 'Sala de Estar Minimalista',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    wallX: '50%',
    wallY: '38%',
    furnitureDescription: 'Acima do sofá de linho cru com iluminação natural',
  },
  {
    id: 'office',
    name: 'Escritório Moderno',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    wallX: '48%',
    wallY: '36%',
    furnitureDescription: 'Acima da mesa de trabalho de carvalho e luminária de design',
  },
  {
    id: 'bedroom',
    name: 'Quarto Acolhedor',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    wallX: '52%',
    wallY: '32%',
    furnitureDescription: 'Cabeceira de cama com tons terrosos e luz suave',
  },
  {
    id: 'gallery',
    name: 'Galeria com Parede Concreto',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80',
    wallX: '50%',
    wallY: '42%',
    furnitureDescription: 'Parede de galeria com spots de iluminação direcionada',
  },
];

export const WallPreviewerModal: React.FC<WallPreviewerModalProps> = ({
  artwork,
  isOpen,
  onClose,
  onOpenOrder,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomBackground>(ROOMS[0]);
  const [frameType, setFrameType] = useState<'black' | 'oak' | 'white' | 'gold' | 'canvas'>('oak');
  const [frameSize, setFrameSize] = useState<number>(100); // 80% to 130%
  const [lighting, setLighting] = useState<'day' | 'warm'>('day');

  if (!isOpen || !artwork) return null;

  const getFrameStyle = () => {
    switch (frameType) {
      case 'black':
        return {
          border: '14px solid #1a1a1a',
          backgroundColor: '#fff',
          padding: '16px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 15px rgba(0,0,0,0.2)',
        };
      case 'oak':
        return {
          border: '16px solid #a37547',
          backgroundColor: '#fff',
          padding: '18px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.45)',
        };
      case 'white':
        return {
          border: '14px solid #f3f3f3',
          backgroundColor: '#fff',
          padding: '16px',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
        };
      case 'gold':
        return {
          border: '18px solid #c29b4e',
          backgroundColor: '#fff',
          padding: '20px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        };
      case 'canvas':
        return {
          border: 'none',
          backgroundColor: '#000',
          padding: '0px',
          boxShadow: '0 20px 45px -10px rgba(0,0,0,0.6)',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col h-[94vh]">
        
        {/* Top Header */}
        <div className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold">Simulador "Quadro na Parede"</h2>
              <p className="text-xs text-stone-400">
                Visualizando: <span className="text-stone-200 font-semibold">{artwork.title}</span> ({artwork.dimensions})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenOrder(artwork);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors shadow-sm"
            >
              Comprar esta Obra
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Canvas / Room View */}
        <div className="relative flex-1 overflow-hidden bg-stone-950 flex items-center justify-center select-none">
          {/* Room Background */}
          <img
            src={selectedRoom.imageUrl}
            alt={selectedRoom.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              lighting === 'warm' ? 'brightness-90 sepia-[0.2]' : 'brightness-100'
            }`}
          />

          {/* Warm lamp lighting overlay */}
          {lighting === 'warm' && (
            <div className="absolute inset-0 bg-amber-600/10 mix-blend-color-burn pointer-events-none" />
          )}

          {/* Floating Framed Artwork positioned on the wall */}
          <div
            className="absolute transition-all duration-500 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{
              left: selectedRoom.wallX,
              top: selectedRoom.wallY,
              transform: `translate(-50%, -50%) scale(${frameSize / 100})`,
            }}
          >
            <div
              style={getFrameStyle()}
              className="transition-all duration-300 relative group"
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="max-h-[320px] sm:max-h-[380px] w-auto object-contain block pointer-events-none select-none"
              />

              {/* Ambient reflection sheen on glass */}
              {frameType !== 'canvas' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              )}
            </div>
          </div>

          {/* Floating Room Info Tag */}
          <div className="absolute bottom-4 left-4 z-10 bg-stone-900/80 backdrop-blur-md border border-stone-700/60 text-stone-200 text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{selectedRoom.name}: {selectedRoom.furnitureDescription}</span>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="bg-stone-900 border-t border-stone-800 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300">
          
          {/* Room Selector */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">Ambiente:</span>
            <div className="flex gap-1.5">
              {ROOMS.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    selectedRoom.id === room.id
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                  }`}
                >
                  {room.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Frame Type Selector */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px]">Moldura:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setFrameType('black')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 ${
                  frameType === 'black' ? 'bg-stone-200 text-stone-950 font-bold' : 'bg-stone-800 hover:bg-stone-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-black border border-stone-500" />
                Preta
              </button>
              <button
                onClick={() => setFrameType('oak')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 ${
                  frameType === 'oak' ? 'bg-stone-200 text-stone-950 font-bold' : 'bg-stone-800 hover:bg-stone-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#a37547]" />
                Carvalho
              </button>
              <button
                onClick={() => setFrameType('white')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 ${
                  frameType === 'white' ? 'bg-stone-200 text-stone-950 font-bold' : 'bg-stone-800 hover:bg-stone-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                Branca
              </button>
              <button
                onClick={() => setFrameType('gold')}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 ${
                  frameType === 'gold' ? 'bg-stone-200 text-stone-950 font-bold' : 'bg-stone-800 hover:bg-stone-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#c29b4e]" />
                Dourada
              </button>
            </div>
          </div>

          {/* Scale Slider & Light toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-semibold text-stone-400">Escala:</span>
              <input
                type="range"
                min="70"
                max="135"
                value={frameSize}
                onChange={(e) => setFrameSize(Number(e.target.value))}
                className="w-20 accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-stone-400 font-mono">{frameSize}%</span>
            </div>

            <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-lg">
              <button
                onClick={() => setLighting('day')}
                className={`p-1.5 rounded-md ${lighting === 'day' ? 'bg-stone-700 text-amber-300' : 'text-stone-400'}`}
                title="Luz do Dia"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLighting('warm')}
                className={`p-1.5 rounded-md ${lighting === 'warm' ? 'bg-stone-700 text-amber-400' : 'text-stone-400'}`}
                title="Luz Quente de Foco"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
