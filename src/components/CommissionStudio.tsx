import React, { useState } from 'react';
import { 
  Pencil, 
  Sparkles, 
  Check, 
  Upload, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Send, 
  FileCheck,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { CommissionRequest, FrameOptionId } from '../types/art';

interface CommissionStudioProps {
  attachedSketchUrl?: string;
  onOpenSketchPad: () => void;
  onSuccess: () => void;
}

const SUBJECT_TYPES = [
  { id: 'retrato', title: 'Retrato de Pessoa', desc: 'Homenagens, família, filhos ou casais com expressividade e fidelidade anatômica', basePrice: 480 },
  { id: 'pet', title: 'Retrato Pet (Animal)', desc: 'Cães, gatos, cavalos ou aves com riqueza de texturas na pelagem e olhar vivo', basePrice: 420 },
  { id: 'arquitetura', title: 'Arquitetura Afetiva', desc: 'A casa dos avós, igreja do casamento, fachada colonial ou projeto autoral', basePrice: 510 },
  { id: 'botanica', title: 'Botânica & Natureza', desc: 'Espécies da flora nativa, folhagens tropicais e detalhes microscópicos', basePrice: 380 },
  { id: 'conceitual', title: 'Arte Conceitual / Fantasia', desc: 'Personagens de RPG, cenários fantásticos ou ilustrações sob briefing específico', basePrice: 550 },
];

const TECHNIQUES = [
  { id: 'grafite', name: 'Grafite Hiper-realista & Carvão', desc: 'Gradações do 9B ao 4H sobre papel Arches 300g 100% algodão', multiplier: 1.0 },
  { id: 'nanquim', name: 'Nanquim & Bico de Pena Histórico', desc: 'Linhas finas, hachuras densas e aguadas com nanquim japonês', multiplier: 1.15 },
  { id: 'aquarela', name: 'Aquarela Fine Art Transparente', desc: 'Cores puras e fluidez sobre papel texturizado Fabriano', multiplier: 1.25 },
  { id: 'mista', name: 'Técnica Mista (Grafite + Sépia + Dourado)', desc: 'Combinação rica com detalhes folheados a ouro ou pigmentos minerais', multiplier: 1.35 },
];

const SIZES = [
  { id: 'A4', name: 'A4 (21 x 29,7 cm)', desc: 'Ideal para mesas de cabeceira, estantes e pequenos ambientes', priceAdd: 0 },
  { id: 'A3', name: 'A3 (29,7 x 42,0 cm)', desc: 'Tamanho mais pedido. Impacto visual perfeito para salas e halls', priceAdd: 190 },
  { id: 'A2', name: 'A2 (42,0 x 59,4 cm)', desc: 'Grande escala com riqueza impressionante de detalhes minuciosos', priceAdd: 420 },
  { id: 'painel', name: 'Painel 50 x 70 cm', desc: 'Obra de presença marcante para colecionadores e paredes de destaque', priceAdd: 680 },
];

export const CommissionStudio: React.FC<CommissionStudioProps> = ({
  attachedSketchUrl,
  onOpenSketchPad,
  onSuccess,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_TYPES[0]);
  const [selectedTechnique, setSelectedTechnique] = useState(TECHNIQUES[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]); // Default A3
  const [frameOption, setFrameOption] = useState<FrameOptionId>('none');
  const [notes, setNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate dynamic price
  const frameDelta = frameOption === 'none' ? 0 : frameOption === 'natural-oak' ? 165 : 140;
  const calculatedEstimate = Math.round((selectedSubject.basePrice * selectedTechnique.multiplier + selectedSize.priceAdd) + frameDelta);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onSuccess();
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
          <FileCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
            Solicitação Registrada com Sucesso
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            Obrigado, {clientName}!
          </h2>
          <p className="text-sm text-stone-600 max-w-lg mx-auto">
            Recebemos a sua proposta para a encomenda sob medida ({selectedSubject.title} em {selectedTechnique.name}, formato {selectedSize.name}).
          </p>
        </div>

        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-left space-y-3 text-xs text-stone-700">
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span>Orçamento Preliminar Estimado:</span>
            <strong className="text-stone-900 text-sm">{formatPrice(calculatedEstimate)}</strong>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span>Prazo de Confecção Médio:</span>
            <strong className="text-stone-900">12 a 18 dias úteis</strong>
          </div>
          <p className="text-stone-500 pt-1">
            O artista Carlos Victor Mendes entrará em contato via WhatsApp <strong>({clientWhatsapp || clientEmail})</strong> para alinhar fotos de referência, ângulos e detalhes finais antes de iniciar a peça.
          </p>
        </div>

        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-semibold"
        >
          Solicitar Nova Encomenda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ateliê Sob Medida</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Encomendas de Desenho Personalizadas
        </h2>
        <p className="text-sm text-stone-600 font-light">
          Transforme uma memória, foto querida ou visão artística em um desenho original único, assinado e emoldurado à mão.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Steps Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Step 1: Subject Selection */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-900 text-white text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Qual o tema da obra?</h3>
                <p className="text-xs text-stone-500">Selecione a categoria que melhor define a sua ideia</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SUBJECT_TYPES.map((sub) => (
                <button
                  type="button"
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    selectedSubject.id === sub.id
                      ? 'border-amber-900 bg-amber-50/60 ring-1 ring-amber-900 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900">{sub.title}</p>
                  <p className="text-[11px] text-stone-500 mt-1 leading-snug">{sub.desc}</p>
                  <span className="inline-block mt-2 text-[10px] font-semibold text-amber-900">
                    A partir de {formatPrice(sub.basePrice)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Technique */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-900 text-white text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Escolha a técnica e materiais</h3>
                <p className="text-xs text-stone-500">Todos os materiais utilizados são de grau museológico</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {TECHNIQUES.map((tech) => (
                <button
                  type="button"
                  key={tech.id}
                  onClick={() => setSelectedTechnique(tech)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    selectedTechnique.id === tech.id
                      ? 'border-amber-900 bg-amber-50/60 ring-1 ring-amber-900 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900">{tech.name}</p>
                  <p className="text-[11px] text-stone-500 mt-1 leading-snug">{tech.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Size */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-900 text-white text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Formato e Dimensões</h3>
                <p className="text-xs text-stone-500">Defina a proporção do suporte</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {SIZES.map((sz) => (
                <button
                  type="button"
                  key={sz.id}
                  onClick={() => setSelectedSize(sz)}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    selectedSize.id === sz.id
                      ? 'border-amber-900 bg-amber-50/60 ring-1 ring-amber-900 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900">{sz.name.split(' ')[0]}</p>
                  <p className="text-[10px] text-stone-500 font-mono mt-0.5">{sz.name.split('(')[1]?.replace(')', '')}</p>
                  <p className="text-[10px] text-amber-900 font-semibold mt-1">
                    {sz.priceAdd === 0 ? 'Padrão' : `+ ${formatPrice(sz.priceAdd)}`}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Notes and Sketch Attachment */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-900 text-white text-xs font-bold flex items-center justify-center">4</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Descrição & Referência</h3>
                <p className="text-xs text-stone-500">Conte sobre as pessoas retratadas, detalhes emocionais ou enquadramento</p>
              </div>
            </div>

            <textarea
              rows={3}
              placeholder="Ex: Gostaria de um desenho em grafite do meu cachorro olhando para o lado, com bastante foco nos olhos e fundo suave..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900 text-stone-900"
            />

            {/* Attached sketch preview or launcher */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              {attachedSketchUrl ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg border border-amber-900 overflow-hidden bg-stone-100">
                    <img src={attachedSketchUrl} alt="Rascunho anexado" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Rascunho Virtual Anexado!
                    </span>
                    <button
                      type="button"
                      onClick={onOpenSketchPad}
                      className="text-[11px] text-amber-900 underline hover:text-amber-950 block"
                    >
                      Editar ou refazer rascunho
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <div className="text-xs text-stone-500">
                    Tem uma ideia visual em mente?
                  </div>
                  <button
                    type="button"
                    onClick={onOpenSketchPad}
                    className="px-3 py-1.5 rounded-lg border border-amber-900/30 text-amber-900 hover:bg-amber-50 text-xs font-medium flex items-center gap-1.5"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Rascunhar na Tela Agora</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Step 5: Contact info */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-amber-900 text-white text-xs font-bold flex items-center justify-center">5</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Seus dados para contato</h3>
                <p className="text-xs text-stone-500">Usado exclusivamente para enviar a proposta e fotos do progresso do desenho</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Nome Completo</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900"
                  />
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">E-mail</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900"
                  />
                  <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">WhatsApp / Telefone</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="(11) 98765-4321"
                    value={clientWhatsapp}
                    onChange={(e) => setClientWhatsapp(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-900"
                  />
                  <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Summary & Submit Column */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-stone-300 shadow-lg space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                Resumo da Encomenda
              </span>
              <h4 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                Orçamento Estimado
              </h4>
            </div>

            <div className="space-y-2.5 text-xs text-stone-600 border-y border-stone-200/90 py-4">
              <div className="flex justify-between">
                <span>Tema:</span>
                <strong className="text-stone-900">{selectedSubject.title}</strong>
              </div>
              <div className="flex justify-between">
                <span>Técnica:</span>
                <strong className="text-stone-900">{selectedTechnique.name.split(' ')[0]}</strong>
              </div>
              <div className="flex justify-between">
                <span>Formato:</span>
                <strong className="text-stone-900">{selectedSize.name.split(' ')[0]}</strong>
              </div>
              <div className="flex justify-between">
                <span>Certificado Autêntico:</span>
                <strong className="text-emerald-700">Incluso</strong>
              </div>
            </div>

            <div>
              <span className="text-xs text-stone-500">Valor total aproximado:</span>
              <div className="text-3xl font-bold text-stone-900 font-serif">
                {formatPrice(calculatedEstimate)}
              </div>
              <span className="text-[10px] text-stone-500 block mt-1">
                Sinal de 50% após aprovação do esboço e 50% no envio da obra finalizada.
              </span>
            </div>

            <div className="space-y-2 text-[11px] text-stone-500 bg-white/70 p-3.5 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2 text-stone-700">
                <Clock className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>Prazo médio de produção: 12 a 18 dias</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Acompanhamento por fotos em cada etapa</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Send className="w-4 h-4 text-amber-200" />
              <span>{submitting ? 'Registrando Solicitação...' : 'Solicitar Orçamento Formal'}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
