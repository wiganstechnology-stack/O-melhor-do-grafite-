import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  CreditCard, 
  FileText, 
  Check, 
  Copy, 
  ShieldCheck, 
  Truck, 
  Lock, 
  Sparkles,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { CartItem } from '../types/art';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'boleto'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('SP');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => {
    return sum + ((item.artwork.price + item.selectedFrame.priceDelta) * item.quantity);
  }, 0);

  const pixDiscount = paymentMethod === 'pix' ? rawSubtotal * 0.05 : 0;
  const shipping = rawSubtotal > 250 ? 0 : 25;
  const finalTotal = rawSubtotal - pixDiscount + shipping;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const pixCode = `00020126580014BR.GOV.BCB.PIX0136cvm.arte.atelie@cvmarte.com.br520400005303986540${Math.round(finalTotal)}.005802BR5925Carlos Victor Mendes Atelie6009SAO PAULO62070503***6304A1B2`;

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="font-serif text-lg font-bold">Checkout Seguro • Ateliê CVM</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'success' ? (
          <div className="p-8 sm:p-12 text-center space-y-6 overflow-y-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <PackageCheck className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Pedido Confirmado #CVM-2026-88
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                Parabéns pela sua nova obra de arte!
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Enviamos os detalhes da compra e o comprovante para <strong>{email || 'seu e-mail'}</strong>.
              </p>
            </div>

            {/* Simulated Tracking Card */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-300 max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span className="text-stone-500">Código de Rastreamento:</span>
                <span className="font-mono font-bold text-amber-950">BR202688491CVM</span>
              </div>
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span className="text-stone-500">Destinatário:</span>
                <strong className="text-stone-800">{fullName || 'Cliente CVM Arte'}</strong>
              </div>
              <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                <span className="text-stone-500">Embalagem:</span>
                <strong className="text-emerald-700">Tubo Rígido Especial + Selo Anti-Umidade</strong>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-stone-500">Prazo de Postagem:</span>
                <span className="font-medium text-stone-800">Em até 24 horas úteis</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-xs transition-colors shadow-md"
            >
              Continuar Navegando na Galeria
            </button>
          </div>
        ) : (
          <form onSubmit={handleCompletePayment} className="overflow-y-auto flex-1 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Delivery Address & Customer Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-900" />
                  <span>1. Dados de Envio e Entrega</span>
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">As obras são despachadas com seguro total contra extravio ou danos</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome do destinatário"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">CPF para Nota Fiscal</label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900 text-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Endereço (Rua / Avenida)</label>
                  <input
                    type="text"
                    required
                    placeholder="Rua das Acácias"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Número e Complemento</label>
                  <input
                    type="text"
                    required
                    placeholder="123 - Apto 42"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">CEP</label>
                  <input
                    type="text"
                    required
                    placeholder="01310-100"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900 text-stone-900"
                  />
                </div>
              </div>

              {/* Payment selector */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-amber-900" />
                  <span>2. Forma de Pagamento</span>
                </h4>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span>Pix (-5% OFF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'credit'
                        ? 'border-amber-900 bg-amber-50 text-amber-950 shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-900" />
                    <span>Cartão de Crédito</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'boleto'
                        ? 'border-amber-900 bg-amber-50 text-amber-950 shadow-xs'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    <FileText className="w-5 h-5 text-amber-900" />
                    <span>Boleto Bancário</span>
                  </button>
                </div>

                {/* Pix Details */}
                {paymentMethod === 'pix' && (
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">QR Code Pix para Pagamento Instantâneo</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">Aprovação imediata</span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Pix visual QR code box */}
                      <div className="w-24 h-24 bg-white p-2 rounded-xl border border-emerald-300 shadow-xs shrink-0 flex items-center justify-center">
                        <QrCode className="w-full h-full text-stone-900" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <p className="text-[11px] text-emerald-900 leading-snug">
                          Abra o app do seu banco, escolha <strong>Pagar via Pix</strong> e aponte a câmera para o QR Code ou utilize o código Copia e Cola.
                        </p>
                        <button
                          type="button"
                          onClick={handleCopyPix}
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedPix ? 'Código Pix Copiado!' : 'Copiar Código Pix Copia e Cola'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit card form */}
                {paymentMethod === 'credit' && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        defaultValue="4111 2222 3333 4444"
                        className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">Validade</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          defaultValue="12/28"
                          className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          defaultValue="921"
                          className="w-full p-2 bg-white rounded-lg border border-stone-300 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Boleto Info */}
                {paymentMethod === 'boleto' && (
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-2">
                    <p>O boleto será gerado e exibido na tela após a finalização. Prazo de compensação bancária: até 3 dias úteis.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-[#FAF7F2] p-6 rounded-3xl border border-stone-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-3">
                  Resumo do Pedido ({items.length})
                </h4>

                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5 text-xs">
                      <img src={item.artwork.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-stone-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-stone-900 truncate">{item.artwork.title}</p>
                        <p className="text-[10px] text-stone-500 truncate">{item.selectedFrame.name.split('(')[0]}</p>
                      </div>
                      <span className="font-bold text-stone-900">
                        {formatPrice((item.artwork.price + item.selectedFrame.priceDelta) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(rawSubtotal)}</span>
                  </div>
                  {pixDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Desconto Pix (-5%):</span>
                      <span>- {formatPrice(pixDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Frete Seguro:</span>
                    <span>{shipping === 0 ? <strong className="text-emerald-700">GRÁTIS</strong> : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Total a Pagar:</span>
                    <span className="text-amber-950 font-serif text-xl">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-4 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Lock className="w-4 h-4 text-amber-200" />
                  <span>{isProcessing ? 'Confirmando Transação...' : `Confirmar e Pagar ${formatPrice(finalTotal)}`}</span>
                </button>

                <p className="text-[10px] text-center text-stone-500">
                  Ao clicar em confirmar, você receberá a confirmação e nota fiscal no seu e-mail cadastrado.
                </p>
              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
};
