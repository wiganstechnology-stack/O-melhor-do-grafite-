import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Filter, X } from 'lucide-react';
import { Artwork, CategoryType, TechniqueType } from '../types/art';
import { ArtworkCard } from './ArtworkCard';

interface CatalogProps {
  artworks: Artwork[];
  favorites: Artwork[];
  onToggleFavorite: (artwork: Artwork) => void;
  onOpenDetails: (artwork: Artwork) => void;
  onOpenWallPreview: (artwork: Artwork) => void;
  onQuickAddToCart: (artwork: Artwork) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: 'all', label: 'Todas as Obras' },
  { id: 'original', label: 'Desenhos Originais Únicos' },
  { id: 'print', label: 'Gravuras & Prints Fine Art' },
  { id: 'digital', label: 'Arte Digital' },
  { id: 'sketchbook', label: 'Cadernos & Materiais' },
];

const TECHNIQUES: (TechniqueType | 'all')[] = [
  'all',
  'Grafite & Carvão',
  'Nanquim & Bico de Pena',
  'Aquarela Botânica',
  'Lápis de Cor & Giz Pastel',
  'Ilustração Digital',
];

export const Catalog: React.FC<CatalogProps> = ({
  artworks,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onOpenWallPreview,
  onQuickAddToCart,
  searchQuery,
  onClearSearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedTechnique, setSelectedTechnique] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        // Category filter
        if (selectedCategory !== 'all' && art.category !== selectedCategory) {
          return false;
        }
        // Technique filter
        if (selectedTechnique !== 'all' && art.technique !== selectedTechnique) {
          return false;
        }
        // In stock filter
        if (inStockOnly && !art.inStock) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = art.title.toLowerCase().includes(q);
          const matchTech = art.technique.toLowerCase().includes(q);
          const matchTags = art.tags.some((t) => t.toLowerCase().includes(q));
          const matchDesc = art.description.toLowerCase().includes(q);
          if (!matchTitle && !matchTech && !matchTags && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'year') return b.year - a.year;
        // Default featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [artworks, selectedCategory, selectedTechnique, sortBy, inStockOnly, searchQuery]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="catalogo">
      
      {/* Search status notice if active */}
      {searchQuery.trim() && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs text-amber-950">
          <span>
            Exibindo resultados para: <strong>"{searchQuery}"</strong> ({filteredArtworks.length} encontradas)
          </span>
          <button
            onClick={onClearSearch}
            className="flex items-center gap-1 font-semibold text-amber-900 hover:underline"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpar busca</span>
          </button>
        </div>
      )}

      {/* Categories Horizontal Tabs */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4 overflow-x-auto gap-4 no-scrollbar">
        <div className="flex items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFiltersMobile(!showFiltersMobile)}
          className="lg:hidden px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 shrink-0"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filtros</span>
        </button>
      </div>

      {/* Filter & Sort Bar */}
      <div className={`bg-white p-4 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs ${
        showFiltersMobile ? 'block' : 'hidden lg:flex'
      }`}>
        
        {/* Left: Technique dropdown */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-stone-500 uppercase text-[10px] tracking-wider">Técnica:</span>
          <select
            value={selectedTechnique}
            onChange={(e) => setSelectedTechnique(e.target.value)}
            className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-stone-800 text-xs focus:outline-none focus:ring-1 focus:ring-amber-900"
          >
            <option value="all">Todas as técnicas</option>
            {TECHNIQUES.filter((t) => t !== 'all').map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>

          {/* Pronta Entrega toggle */}
          <label className="flex items-center gap-2 cursor-pointer ml-2 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="accent-amber-900 rounded"
            />
            <span className="text-[11px] font-medium">Apenas pronta entrega</span>
          </label>
        </div>

        {/* Right: Sort selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-bold text-stone-500 uppercase text-[10px] tracking-wider">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-stone-800 text-xs focus:outline-none focus:ring-1 focus:ring-amber-900"
          >
            <option value="featured">Destaques do Ateliê</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="year">Mais Recentes</option>
          </select>
        </div>

      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-stone-200 p-8">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-2xl font-bold text-stone-900">Nenhuma obra encontrada</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Nenhuma peça corresponde aos filtros aplicados. Tente alterar a técnica, categoria ou termo de busca.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedTechnique('all');
              setInStockOnly(false);
              onClearSearch();
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold transition-colors"
          >
            Restaurar Todos os Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isFavorite={favorites.some((f) => f.id === artwork.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDetails={onOpenDetails}
              onOpenWallPreview={onOpenWallPreview}
              onQuickAddToCart={onQuickAddToCart}
            />
          ))}
        </div>
      )}

    </section>
  );
};
