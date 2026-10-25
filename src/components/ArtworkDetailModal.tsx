import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Eye, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Check, 
  Sparkles, 
  ChevronRight,
  Maximize2,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { Artwork, FrameOption } from '../types/art';
import { FRAME_OPTIONS } from '../data/artworks';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork, frame: FrameOption) => void;
  onOpenWallPreview: (artwork: Artwork) => void;
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenWallPreview,
}) => {
  const [selectedFrame, setSelectedFrame] = useState<FrameOption>(FRAME_OPTIONS[0]);
  const [cep, setCep] = useState('');
  const [shippingResult, setShippingResult] = useState<{ pac: string; sedex: string; daysPac: number; daysSedex: number } | null>(null);
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');

  if (!isOpen || !artwork) return null;

  const currentImage = activeImage || artwork.imageUrl;
  const totalPrice = artwork.price + selectedFrame.priceDelta;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cep || cep.replace(/\D/g, '').length < 8) return;
    setCalculatingShipping(true);
    setTimeout(() => {
      setCalculatingShipping(false);
      setShippingResult({
        pac: totalPrice > 250 ? 'GRÁTIS' : 'R$ 24,90',
        sedex: 'R$ 42,50',
        daysPac: 6,
        daysSedex: 2,
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors shadow-sm"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
          
          {/* Left Column: Image viewer with framing preview */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-[#F6F4F0] flex flex-col justify-between space-y-6">
            <div className="relative flex items-center justify-center flex-1 min-h-[340px] sm:min-h-[440px]">
              
              {/* Framed container simulating selected frame */}
              <div 
                className="relative transition-all duration-300 shadow-2xl overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: selectedFrame.id !== 'none' ? '#FFF' : 'transparent',
                  padding: selectedFrame.id !== 'none' ? '24px' : '0px',
                  border: selectedFrame.id !== 'none' ? `${selectedFrame.borderWidth}px solid ${selectedFrame.colorHex}` : 'none',
                  boxShadow: selectedFrame.id !== 'none' 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(0,0,0,0.1)' 
                    : '0 20px 30px -10px rgba(0,0,0,0.25)',
                }}
              >
                <img
                  src={currentImage}
                  alt={artwork.title}
                  className="max-h-[50vh] w-auto object-contain block select-none"
                />
              </div>

              {/* Quick Wall preview floating button */}
              <button
                onClick={() => onOpenWallPreview(artwork)}
                className="absolute bottom-2 left-2 z-10 px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-medium backdrop-blur-md flex items-center gap-1.5 shadow-md transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>Simular na sua Parede</span>
              </button>
            </div>

            {/* Gallery thumbnails if available */}
            {artwork.additionalImages && artwork.additionalImages.length > 0 && (
              <div className="flex items-center gap-3 justify-center pt-2">
                <button
                  onClick={() => setActiveImage(artwork.imageUrl)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImage === artwork.imageUrl ? 'border-amber-900 scale-105' : 'border-stone-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={artwork.imageUrl} alt="Capa" className="w-full h-full object-cover" />
                </button>
                {artwork.additionalImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImage === img ? 'border-amber-900 scale-105' : 'border-stone-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Detalhe ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Framing Options, Shipping, Purchase */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 px-2.5 py-1 rounded bg-amber-100/70">
                  {artwork.category === 'original' ? 'Obra Original Única' : 'Gravura Fine Art'}
                </span>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {artwork.year}
                </span>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold text-stone-900 leading-tight">
                  {artwork.title}
                </h2>
                <p className="text-xs text-stone-500 mt-1">{artwork.subtitle}</p>
              </div>

              {/* Price display with frame delta */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold text-stone-900">{formatPrice(totalPrice)}</span>
                    {artwork.originalPrice && selectedFrame.id === 'none' && (
                      <span className="ml-2 text-xs text-stone-400 line-through">
                        {formatPrice(artwork.originalPrice)}
                      </span>
                    )}
                  </div>
                  {selectedFrame.priceDelta > 0 && (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded">
                      + {formatPrice(selectedFrame.priceDelta)} (Moldura)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">
                  À vista no Pix com 5% de desconto ou em até 6x de {formatPrice(totalPrice / 6)}
                </p>
              </div>

              {/* Framing selector */}
              <div>
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Escolha o Acabamento / Moldura:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {FRAME_OPTIONS.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        selectedFrame.id === frame.id
                          ? 'border-amber-900 bg-amber-50/50 shadow-xs ring-1 ring-amber-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-stone-300 shrink-0" 
                          style={{ backgroundColor: frame.colorHex !== 'transparent' ? frame.colorHex : '#ffffff' }}
                        />
                        <div>
                          <p className="font-semibold text-stone-800">{frame.name}</p>
                          <p className="text-[10px] text-stone-600 line-clamp-1">{frame.description}</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-700 shrink-0 ml-2">
                        {frame.priceDelta === 0 ? 'Incluso' : `+ ${formatPrice(frame.priceDelta)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications Accordion / Details */}
              <div className="border-t border-stone-200 pt-4 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">Técnica:</span>
                  <span className="font-medium text-stone-900 text-right">{artwork.technique}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">Dimensões:</span>
                  <span className="font-medium text-stone-900 text-right">{artwork.dimensions}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-700">Papel / Suporte:</span>
                  <span className="font-medium text-stone-900 text-right max-w-[220px]">{artwork.paperType}</span>
                </div>
                {artwork.certificateOfAuthenticity && (
                  <div className="flex items-center gap-2 py-1 text-emerald-800 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Acompanha Certificado de Autenticidade assinado pelo artista</span>
                  </div>
                )}
              </div>

              {/* Shipping Estimator */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
                <div className="flex items-center gap-2 font-bold text-stone-800 mb-2">
                  <Truck className="w-4 h-4 text-amber-800" />
                  <span>Calcular Frete e Prazo de Entrega:</span>
                </div>
                <form onSubmit={handleCalculateShipping} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite seu CEP (Ex: 01310-100)"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    maxLength={9}
                    className="flex-1 bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-900"
                  />
                  <button
                    type="submit"
                    disabled={calculatingShipping}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg font-medium transition-colors"
                  >
                    {calculatingShipping ? 'Calculando...' : 'Calcular'}
                  </button>
                </form>

                {shippingResult && (
                  <div className="mt-2.5 pt-2 border-t border-stone-200 space-y-1 text-[11px]">
                    <div className="flex justify-between text-stone-700">
                      <span>PAC Correios ({shippingResult.daysPac} dias úteis):</span>
                      <strong className="text-emerald-700">{shippingResult.pac}</strong>
                    </div>
                    <div className="flex justify-between text-stone-700">
                      <span>SEDEX Expresso ({shippingResult.daysSedex} dias úteis):</span>
                      <strong>{shippingResult.sedex}</strong>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
              <button
                onClick={() => onToggleFavorite(artwork)}
                className={`p-3.5 rounded-xl border transition-all ${
                  isFavorite
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-300 hover:bg-stone-50 text-stone-700'
                }`}
                title="Favoritar"
                aria-label="Favoritar"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => {
                  onAddToCart(artwork, selectedFrame);
                  onClose();
                }}
                className="flex-1 py-3.5 px-6 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-amber-200" />
                <span>Adicionar ao Carrinho • {formatPrice(totalPrice)}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
