import React, { useState } from 'react';
import { 
  Palette, 
  Mail, 
  Send, 
  ShieldCheck, 
  Truck, 
  HelpCircle, 
  ChevronDown, 
  Phone, 
  Sparkles,
  Check,
  Camera
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const faqs = [
    {
      q: 'Como os desenhos originais são embalados para o envio?',
      a: 'Obras em papel são enviadas protegidas entre papéis vegetais neutros e inseridas em tubos rígidos de papelão kraft industrial com tampa blindada à prova de umidade e amassados. Obras com moldura são protegidas com cantoneiras de alta densidade e caixa de madeira compensada.',
    },
    {
      q: 'As gravuras (prints) têm tiragem limitada?',
      a: 'Sim! Nossos prints Fine Art são produzidos em tiragens limitadas de no máximo 50 a 100 exemplares. Cada print recebe carimbo seco de chancelaria do ateliê, numeração e assinatura a lápis feita pelo próprio artista Carlos Victor Mendes.',
    },
    {
      q: 'Como funciona o processo de encomenda sob medida?',
      a: 'Após preencher o formulário na aba "Encomendas Sob Medida", o artista analisa suas referências e entra em contato via WhatsApp para aprovar o esboço conceitual. O cliente acompanha fotos do progresso do grafite ou aquarela em cada etapa até a finalização.',
    },
    {
      q: 'Qual o tempo de entrega para o meu estado?',
      a: 'Itens de pronta entrega (desenhos prontos, prints e cadernos) são postados em até 24 horas úteis. O prazo do Correios (SEDEX ou PAC) varia de 2 a 8 dias úteis conforme a sua região no Brasil.',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      
      {/* Newsletter Section */}
      <div className="border-b border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-stone-800 to-stone-850 p-8 rounded-3xl border border-stone-700/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Clube de Colecionadores CVM
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Receba novos lançamentos de desenhos em primeira mão
              </h3>
              <p className="text-xs text-stone-400">
                Cadastre-se para receber aviso de novas peças originais antes de irem para a galeria pública.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex gap-2">
              <input
                type="email"
                required
                placeholder="Seu melhor e-mail..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-stone-900/90 text-white placeholder-stone-500 text-xs px-4 py-3 rounded-xl border border-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-64"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                <span>{subscribed ? 'Cadastrado!' : 'Inscrever-se'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="py-12 border-b border-stone-800 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-8">
          <h4 className="font-serif text-2xl font-bold text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>Perguntas Frequentes (FAQ)</span>
          </h4>
          <p className="text-xs text-stone-400">Tudo o que você precisa saber sobre compras, segurança e envios</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-stone-800/60 rounded-xl border border-stone-700/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform ${openFaq === idx ? 'rotate-180 text-amber-400' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-stone-400 leading-relaxed border-t border-stone-700/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <span className="font-serif text-xl font-bold">CVM Arte</span>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed">
            Loja virtual de desenho, gravuras contemporâneas e encomendas artísticas sob medida. Traços que conectam arte e sentimentos.
          </p>
          <p className="text-[11px] text-stone-400">
            CNPJ: 42.189.302/0001-85 • Belo Horizonte - MG
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">Categorias de Arte</h5>
          <ul className="space-y-2 text-stone-400">
            <li className="hover:text-amber-300 transition-colors cursor-pointer">Desenhos Originais em Grafite</li>
            <li className="hover:text-amber-300 transition-colors cursor-pointer">Gravuras Fine Art Numeradas</li>
            <li className="hover:text-amber-300 transition-colors cursor-pointer">Ilustrações Botânicas em Nanquim</li>
            <li className="hover:text-amber-300 transition-colors cursor-pointer">Cadernos de Desenho Artesanais</li>
            <li className="hover:text-amber-300 transition-colors cursor-pointer">Arte Digital 8K</li>
          </ul>
        </div>

        {/* Guarantees */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">Garantias do Ateliê</h5>
          <ul className="space-y-2 text-stone-400">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Certificado de autenticidade</span>
            </li>
            <li className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Embalagem rígida à prova de amassados</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Papéis 100% algodão sem ácido</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Garantia de 7 dias de devolução sem custo</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-white text-[11px]">Atendimento Direto</h5>
          <p className="text-stone-400 text-xs">
            Dúvidas sobre tamanhos, fotos de referência ou molduras?
          </p>
          <div className="space-y-2">
            <a
              href="mailto:contato@cvmarte.com.br"
              className="flex items-center gap-2 text-amber-400 hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>contato@cvmarte.com.br</span>
            </a>
            <div className="flex items-center gap-2 text-stone-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>(11) 98765-4321 (WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <Camera className="w-3.5 h-3.5 text-rose-400" />
              <span>@cvm.arte.atelie</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-stone-800 py-6 text-center text-[11px] text-stone-400">
        <p>© 2026 CVM Arte - Loja Virtual de Desenho. Todos os direitos reservados. Todas as imagens e obras são de propriedade do artista.</p>
      </div>

    </footer>
  );
};
