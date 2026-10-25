import React from 'react';
import { Sparkles, ShieldCheck, Truck, Frame, Pencil, Eye, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onRequestCommission: () => void;
  onOpenWallPreviewSample: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onRequestCommission,
  onOpenWallPreviewSample,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] border-b border-stone-200">
      
      {/* Decorative fine-art background element */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/10 border border-amber-900/20 text-amber-950 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Obras Originais, Gravuras Fine Art & Encomendas de Desenho</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12]">
              Traços que capturam <span className="italic font-normal text-amber-900">a essência da vida</span> e memórias afetivas.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-2xl">
              Bem-vindo à loja virtual de desenho do <strong>Ateliê CVM</strong>. Peças autênticas produzidas à mão em grafite de alta densidade, nanquim puro, bico de pena e aquarela sobre papéis franceses 100% algodão.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-sm flex items-center gap-2.5 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Explorar Galeria & Obras</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRequestCommission}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-medium text-sm flex items-center gap-2 transition-all shadow-xs hover:border-amber-900/40"
              >
                <Pencil className="w-4 h-4 text-amber-800" />
                <span>Pedir Encomenda Sob Medida</span>
              </button>

              <button
                onClick={onOpenWallPreviewSample}
                className="px-4 py-3.5 rounded-xl text-stone-700 hover:text-amber-900 hover:bg-amber-100/50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Teste como um quadro ficaria na sua parede"
              >
                <Eye className="w-4 h-4 text-amber-800" />
                <span>Testar Quadro na Parede Virtual</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Certificado Original</h4>
                  <p className="text-[11px] text-stone-500">Com selo e assinatura autêntica</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Embalagem Blindada</h4>
                  <p className="text-[11px] text-stone-500">Tubo rígido e proteção anti-umidade</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Frame className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Molduras Artesanais</h4>
                  <p className="text-[11px] text-stone-500">Madeira nobre e vidro especial</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Artwork Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Main spotlight frame */}
              <div className="relative z-10 bg-white p-3.5 sm:p-5 rounded-2xl shadow-2xl border border-stone-200/90 rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                    alt="Desenho em destaque no ateliê"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent p-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">Destaque do Ateliê</span>
                    <h3 className="font-serif text-lg font-bold">O Olhar Silencioso</h3>
                    <p className="text-xs text-stone-300">Grafite 9B sobre Arches 300g/m² • Obra Única</p>
                  </div>
                </div>
              </div>

              {/* Floating secondary badge */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-300 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-serif text-lg font-bold">
                  12+
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Anos de Ofício</p>
                  <p className="text-[11px] text-stone-500">Mais de 1.400 obras entregues</p>
                </div>
              </div>

              {/* Floating technique card */}
              <div className="absolute -top-4 -right-4 z-20 bg-stone-900 text-stone-100 px-3.5 py-2 rounded-xl shadow-lg text-xs flex items-center gap-2 border border-stone-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Pronta Entrega no Brasil</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
