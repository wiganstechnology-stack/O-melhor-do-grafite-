import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Check, 
  Truck 
} from 'lucide-react';
import { CartItem } from '../types/art';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => {
    const itemUnit = item.artwork.price + item.selectedFrame.priceDelta;
    return sum + (itemUnit * item.quantity);
  }, 0);

  const discountAmount = appliedCoupon ? (rawSubtotal * appliedCoupon.discountPercent) / 100 : 0;
  const shippingAmount = rawSubtotal > 250 || rawSubtotal === 0 ? 0 : 25;
  const total = rawSubtotal - discountAmount + shippingAmount;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'ARTE10' || code === 'CVM10' || code === 'PRIMEIRACOMPRA') {
      setAppliedCoupon({ code, discountPercent: 10 });
    } else {
      setCouponError('Cupom inválido. Tente ARTE10');
    }
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
            <ShoppingBag className="w-5 h-5 text-amber-900" />
            <h3 className="font-serif text-xl font-bold text-stone-900">Seu Carrinho de Arte</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
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

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-stone-800">Seu carrinho está vazio</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Explore nossa galeria de desenhos originais, gravuras e cadernos de croquis exclusivos.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-amber-900 text-white text-xs font-medium hover:bg-amber-950 transition-colors"
              >
                Explorar Catálogo de Obras
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = item.artwork.price + item.selectedFrame.priceDelta;
              return (
                <div
                  key={item.id}
                  className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-xs flex gap-3.5 items-center"
                >
                  <img
                    src={item.artwork.imageUrl}
                    alt={item.artwork.title}
                    className="w-18 h-20 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                      {item.artwork.title}
                    </h4>
                    <p className="text-[11px] text-amber-900 font-medium truncate">
                      {item.artwork.technique}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">
                      Moldura: {item.selectedFrame.name.split('(')[0]}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-stone-900">
                        {formatPrice(unitPrice * item.quantity)}
                      </span>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-1.5 bg-stone-100 px-2 py-0.5 rounded-lg border border-stone-200">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-stone-600 hover:text-stone-900 p-0.5"
                          title="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-stone-800 px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-stone-600 hover:text-stone-900 p-0.5"
                          title="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors self-start"
                    title="Remover do carrinho"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Summary and Checkout */}
        {items.length > 0 && (
          <div className="bg-white p-5 border-t border-stone-200 space-y-4">
            
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Cupom de desconto (Ex: ARTE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900 uppercase"
                  />
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-semibold bg-stone-800 hover:bg-stone-900 text-white rounded-lg transition-colors"
                >
                  Aplicar
                </button>
              </div>
              {appliedCoupon && (
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Cupom {appliedCoupon.code} aplicado (-{appliedCoupon.discountPercent}%)
                </p>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium">
                  {couponError}
                </p>
              )}
            </form>

            {/* Price lines */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal das Obras:</span>
                <span className="font-medium text-stone-900">{formatPrice(rawSubtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700">
                  <span>Desconto ({appliedCoupon.code}):</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frete Seguro (Brasil):</span>
                <span>{shippingAmount === 0 ? <strong className="text-emerald-700">GRÁTIS</strong> : formatPrice(shippingAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total:</span>
                <span className="text-base text-amber-950">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Finalizar Compra Segura</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-600 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pagamento criptografado via Pix, Boleto ou Cartão de Crédito</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
