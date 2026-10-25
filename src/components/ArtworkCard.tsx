import React from 'react';
import { Heart, Eye, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Artwork } from '../types/art';

interface ArtworkCardProps {
  artwork: Artwork;
  isFavorite: boolean;
  onToggleFavorite: (artwork: Artwork) => void;
  onOpenDetails: (artwork: Artwork) => void;
  onOpenWallPreview: (artwork: Artwork) => void;
  onQuickAddToCart: (artwork: Artwork) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onOpenWallPreview,
  onQuickAddToCart,
}) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getCategoryBadge = () => {
    switch (artwork.category) {
      case 'original':
        return { label: 'Obra Original Única', bg: 'bg-amber-900 text-amber-50' };
      case 'print':
        return { label: 'Gravura Fine Art', bg: 'bg-stone-800 text-stone-100' };
      case 'digital':
        return { label: 'Arte Digital 8K', bg: 'bg-indigo-900 text-indigo-50' };
      case 'sketchbook':
        return { label: 'Caderno / Material', bg: 'bg-emerald-900 text-emerald-50' };
      default:
        return { label: 'Arte', bg: 'bg-stone-700 text-white' };
    }
  };

  const badge = getCategoryBadge();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-amber-900/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image container */}
      <div className="relative aspect-4/5 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onOpenDetails(artwork)}>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient shadow overlay on hover */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs ${badge.bg}`}>
            {badge.label}
          </span>
        </div>

        {/* Action icons (Wishlist & Wall preview) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(artwork);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
              isFavorite 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/90 text-stone-700 hover:bg-white hover:text-rose-500'
            }`}
            title={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
            aria-label="Favoritar"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenWallPreview(artwork);
            }}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-amber-900 flex items-center justify-center backdrop-blur-md transition-all shadow-sm"
            title="Simular quadro na parede virtual"
            aria-label="Ver na parede"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock / Limited edition ribbon */}
        {artwork.stockCount === 1 && artwork.inStock && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-[11px] font-semibold bg-amber-500 text-stone-950 px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Peça única exclusiva
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium text-amber-950">{artwork.technique}</span>
            <span>{artwork.dimensions}</span>
          </div>

          <h3 
            onClick={() => onOpenDetails(artwork)}
            className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer line-clamp-1"
          >
            {artwork.title}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1">
            {artwork.subtitle}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-stone-900">
                {formatPrice(artwork.price)}
              </span>
              {artwork.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatPrice(artwork.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-600 block">
              Até 6x de {formatPrice(artwork.price / 6)} sem juros
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onOpenDetails(artwork)}
              className="px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Ver Obra
            </button>
            <button
              onClick={() => onQuickAddToCart(artwork)}
              className="p-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-white transition-colors shadow-xs"
              title="Adicionar ao carrinho"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
