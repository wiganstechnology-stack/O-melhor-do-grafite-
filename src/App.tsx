import React, { useState, useEffect } from 'react';
import { ARTWORKS_DATA, FRAME_OPTIONS } from './data/artworks';
import { Artwork, CartItem, CategoryType, FrameOption } from './types/art';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { ArtworkDetailModal } from './components/ArtworkDetailModal';
import { WallPreviewerModal } from './components/WallPreviewerModal';
import { SketchCanvasModal } from './components/SketchCanvasModal';
import { CommissionStudio } from './components/CommissionStudio';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ArtistProfile } from './components/ArtistProfile';
import { Footer } from './components/Footer';
import { Check, Sparkles, Heart } from 'lucide-react';

export default function App() {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'catalog' | 'commissions' | 'atelier'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State with Local Storage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cvm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites State with Local Storage
  const [favorites, setFavorites] = useState<Artwork[]>(() => {
    try {
      const saved = localStorage.getItem('cvm_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [sketchPadOpen, setSketchPadOpen] = useState(false);
  const [detailArtwork, setDetailArtwork] = useState<Artwork | null>(null);
  const [wallPreviewArtwork, setWallPreviewArtwork] = useState<Artwork | null>(null);
  
  // Custom commission sketch attachment
  const [commissionSketchUrl, setCommissionSketchUrl] = useState<string | undefined>(undefined);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('cvm_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('cvm_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (artwork: Artwork, frame: FrameOption) => {
    const itemId = `${artwork.id}_${frame.id}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { id: itemId, artwork, selectedFrame: frame, quantity: 1 }];
      }
    });
    showToast(`"${artwork.title}" adicionado ao carrinho!`);
  };

  const handleQuickAddToCart = (artwork: Artwork) => {
    handleAddToCart(artwork, FRAME_OPTIONS[0]); // Sem moldura by default
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Favorites operations
  const handleToggleFavorite = (artwork: Artwork) => {
    setFavorites((prev) => {
      const isFav = prev.some((item) => item.id === artwork.id);
      if (isFav) {
        showToast(`Removido dos favoritos`);
        return prev.filter((item) => item.id !== artwork.id);
      } else {
        showToast(`Obra salva em Favoritos!`);
        return [...prev, artwork];
      }
    });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-200">
      
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        favoritesCount={favorites.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenFavorites={() => setFavoritesOpen(true)}
        onOpenSketchPad={() => setSketchPadOpen(true)}
        onNavigateTab={(tab) => {
          if (tab === 'wall-preview') {
            setWallPreviewArtwork(ARTWORKS_DATA[0]);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        activeTab={activeTab}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <>
            <Hero
              onExploreCatalog={() => {
                const el = document.getElementById('catalogo');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onRequestCommission={() => {
                setActiveTab('commissions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenWallPreviewSample={() => setWallPreviewArtwork(ARTWORKS_DATA[0])}
            />

            <Catalog
              artworks={ARTWORKS_DATA}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onOpenDetails={(artwork) => setDetailArtwork(artwork)}
              onOpenWallPreview={(artwork) => setWallPreviewArtwork(artwork)}
              onQuickAddToCart={handleQuickAddToCart}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          </>
        )}

        {activeTab === 'commissions' && (
          <CommissionStudio
            attachedSketchUrl={commissionSketchUrl}
            onOpenSketchPad={() => setSketchPadOpen(true)}
            onSuccess={() => {
              showToast('Solicitação de encomenda enviada com sucesso!');
            }}
          />
        )}

        {activeTab === 'atelier' && (
          <ArtistProfile />
        )}
      </main>

      {/* Modals & Drawers */}
      <ArtworkDetailModal
        artwork={detailArtwork}
        isOpen={!!detailArtwork}
        onClose={() => setDetailArtwork(null)}
        isFavorite={detailArtwork ? favorites.some((f) => f.id === detailArtwork.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onOpenWallPreview={(art) => {
          setDetailArtwork(null);
          setWallPreviewArtwork(art);
        }}
      />

      <WallPreviewerModal
        artwork={wallPreviewArtwork}
        isOpen={!!wallPreviewArtwork}
        onClose={() => setWallPreviewArtwork(null)}
        onOpenOrder={(art) => {
          setWallPreviewArtwork(null);
          setDetailArtwork(art);
        }}
      />

      <SketchCanvasModal
        isOpen={sketchPadOpen}
        onClose={() => setSketchPadOpen(false)}
        onAttachSketchToCommission={(dataUrl) => {
          setCommissionSketchUrl(dataUrl);
          setActiveTab('commissions');
          showToast('Rascunho vinculado à sua encomenda!');
        }}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => {
          handleClearCart();
          showToast('Pedido realizado com sucesso!');
        }}
      />

      <FavoritesDrawer
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleToggleFavorite}
        onOpenDetails={(art) => setDetailArtwork(art)}
        onQuickAddToCart={handleQuickAddToCart}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
