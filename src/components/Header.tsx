import React, { useState } from 'react';
import { 
  Palette, 
  ShoppingBag, 
  Heart, 
  Search, 
  SlidersHorizontal, 
  Menu, 
  X, 
  Sparkles, 
  Eye, 
  Pencil, 
  User, 
  Layers,
  PhoneCall
} from 'lucide-react';
import { CategoryType } from '../types/art';

interface HeaderProps {
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenSketchPad: () => void;
  onNavigateTab: (tab: 'catalog' | 'commissions' | 'atelier' | 'wall-preview') => void;
  activeTab: string;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenSketchPad,
  onNavigateTab,
  activeTab,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      {/* Top Banner Notice */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Frete grátis para todo o Brasil em compras acima de R$ 250 • Obras com Certificado de Autenticidade</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateTab('catalog')}>
            <div className="w-11 h-11 rounded-xl bg-amber-900/10 border border-amber-900/20 flex items-center justify-center text-amber-900 shadow-inner">
              <Palette className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">CVM Arte</span>
                <span className="text-[10px] uppercase font-semibold tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200/60">Ateliê</span>
              </div>
              <p className="text-xs text-stone-700 tracking-wider font-light">Loja Virtual de Desenho & Gravuras</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigateTab('catalog')}
              className={`text-sm font-medium transition-colors hover:text-amber-800 ${
                activeTab === 'catalog' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-1' : 'text-stone-600'
              }`}
            >
              Galeria & Loja
            </button>
            <button
              onClick={() => onNavigateTab('commissions')}
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors hover:text-amber-800 ${
                activeTab === 'commissions' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-1' : 'text-stone-600'
              }`}
            >
              <Pencil className="w-3.5 h-3.5 text-amber-700" />
              Encomendas Sob Medida
            </button>
            <button
              onClick={() => onNavigateTab('atelier')}
              className={`text-sm font-medium transition-colors hover:text-amber-800 ${
                activeTab === 'atelier' ? 'text-amber-900 font-semibold border-b-2 border-amber-900 pb-1' : 'text-stone-600'
              }`}
            >
              Sobre o Artista
            </button>
          </nav>

          {/* Actions & Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Interactive Sketch Pad button */}
            <button
              onClick={onOpenSketchPad}
              title="Abrir Bloco de Rascunho Digital"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors shadow-xs"
            >
              <Pencil className="w-3.5 h-3.5 text-amber-800" />
              <span>Rascunhe sua Ideia</span>
            </button>

            {/* Search Input on Desktop */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="Buscar obra, técnica..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-xs text-stone-900 pl-9 pr-4 py-2 rounded-full border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-all placeholder:text-stone-600"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Lista de Desejos"
              title="Obras Favoritas"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-white transition-colors shadow-xs"
              aria-label="Carrinho de Compras"
            >
              <ShoppingBag className="w-4 h-4 text-amber-200" />
              <span className="text-xs font-semibold tracking-wider hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 text-[11px] font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="sm:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar obra, técnica ou tema..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full bg-stone-100 text-xs text-stone-900 pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-900"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200 flex flex-col gap-3">
            <button
              onClick={() => { onNavigateTab('catalog'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-stone-100 text-stone-800"
            >
              Galeria & Loja de Desenho
            </button>
            <button
              onClick={() => { onNavigateTab('commissions'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-stone-100 text-stone-800 flex items-center gap-2"
            >
              <Pencil className="w-4 h-4 text-amber-800" />
              Encomendas Sob Medida
            </button>
            <button
              onClick={() => { onNavigateTab('atelier'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-stone-100 text-stone-800 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-amber-800" />
              Sobre o Artista CVM
            </button>
            <button
              onClick={() => { onOpenSketchPad(); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg bg-amber-50 text-amber-900 flex items-center gap-2 border border-amber-200"
            >
              <Pencil className="w-4 h-4" />
              Abrir Bloco de Rascunho Virtual
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
