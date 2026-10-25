import React from 'react';
import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { Artwork } from '../types/art';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Artwork[];
  onRemoveFavorite: (artwork: Artwork) => void;
  onOpenDetails: (artwork: Artwork) => void;
  onQuickAddToCart: (artwork: Artwork) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onOpenDetails,
  onQuickAddToCart,
}) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl border-l border-stone-200 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="font-serif text-xl font-bold text-stone-900">Obras Favoritas</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
              {favorites.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favorites.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-300 flex items-center justify-center">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-stone-800">Nenhuma obra favoritada ainda</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Clique no ícone de coração sobre qualquer desenho na galeria para salvar em sua coleção particular.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-amber-900 text-white text-xs font-medium hover:bg-amber-950 transition-colors"
              >
                Navegar pela Loja
              </button>
            </div>
          ) : (
            favorites.map((art) => (
              <div
                key={art.id}
                className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs flex gap-3.5 items-center"
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-16 h-18 rounded-xl object-cover bg-stone-100 shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onOpenDetails(art);
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      onClose();
                      onOpenDetails(art);
                    }}
                    className="font-serif text-sm font-bold text-stone-900 truncate hover:text-amber-900 cursor-pointer"
                  >
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-amber-900 font-medium truncate">{art.technique}</p>
                  <p className="text-xs font-bold text-stone-900 mt-1">{formatPrice(art.price)}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenDetails(art);
                      }}
                      className="text-[11px] font-semibold text-stone-700 hover:text-amber-900 flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Ver Obra</span>
                    </button>

                    <button
                      onClick={() => onQuickAddToCart(art)}
                      className="text-[11px] font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 ml-auto"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFavorite(art)}
                  className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors self-start"
                  title="Remover dos favoritos"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {favorites.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors"
            >
              Continuar Navegando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
