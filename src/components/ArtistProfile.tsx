import React from 'react';
import { ARTIST_INFO } from '../data/artworks';
import { Star, Award, CheckCircle2, MapPin, Feather, Sparkles, Heart } from 'lucide-react';

export const ArtistProfile: React.FC = () => {
  const reviews = [
    {
      author: 'Dra. Mariana Vasconcelos',
      city: 'Rio de Janeiro, RJ',
      rating: 5,
      date: 'Outubro de 2026',
      artwork: 'Desenho em Grafite - Retrato de Família',
      comment: 'Recebi a obra perfeitamente embalada em tubo rígido, sem qualquer amassado. O detalhamento dos olhos e a textura da pele feita a lápis grafite é de arrepiar. Uma verdadeira herança de família.',
    },
    {
      author: 'Eduardo Silveira Prado',
      city: 'São Paulo, SP',
      rating: 5,
      date: 'Setembro de 2026',
      artwork: 'Print Fine Art - O Olhar Silencioso com Moldura Carvalho',
      comment: 'A qualidade da impressão Fine Art no papel de algodão é idêntica a um original. A moldura em madeira maciça veio impecável com paspatur de muita elegância. Já virou o centro das atenções na minha sala.',
    },
    {
      author: 'Beatriz Fagundes',
      city: 'Belo Horizonte, MG',
      rating: 5,
      date: 'Agosto de 2026',
      artwork: 'Aquarela Botânica Original',
      comment: 'O Carlos Mendes é um mestre dos traços. As cores são vivas e sutis ao mesmo tempo. O certificado de autenticidade assinado dá um peso de galeria único.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Bio and Atelier Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Atelier Photo & Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 aspect-3/4">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80"
              alt="Mesa de trabalho e ateliê do artista Carlos Victor Mendes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6 text-white">
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-amber-300">Ateliê CVM</p>
                <h3 className="font-serif text-2xl font-bold">{ARTIST_INFO.name}</h3>
                <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {ARTIST_INFO.location}
                </p>
              </div>
            </div>
          </div>

          {/* Floating stats card */}
          <div className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-2xl border border-stone-200 shadow-xl hidden sm:flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-serif text-xl font-bold">
              4.98
            </div>
            <div>
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">Média em +1.400 obras entregues</p>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/10 text-amber-950 text-xs font-semibold">
            <Feather className="w-3.5 h-3.5 text-amber-800" />
            <span>A Alma por Trás do Traço</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            "Desenhar é decodificar a luz que o mundo insiste em esconder na pressa."
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {ARTIST_INFO.bio}
          </p>

          <blockquote className="border-l-3 border-amber-800 pl-4 py-1 italic font-serif text-base sm:text-lg text-stone-800 bg-amber-50/40 rounded-r-xl">
            {ARTIST_INFO.atelierQuote}
          </blockquote>

          {/* Techniques used */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Rigor Técnico e Materiais de Museologia:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ARTIST_INFO.techniques.map((tech, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-800" />
              <span>Reconhecimento & Exposições</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600">
              {ARTIST_INFO.awards.map((award, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                  <span>{award}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Customer Reviews & Testimonials */}
      <div className="pt-12 border-t border-stone-200 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
            Depoimentos Autênticos
          </span>
          <h3 className="font-serif text-3xl font-bold text-stone-900">
            O que dizem os colecionadores e clientes
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Avaliações verificadas de quem já recebeu obras originais e sob medida em casa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-600">{rev.date}</span>
                </div>

                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs">
                <p className="font-bold text-stone-900">{rev.author}</p>
                <p className="text-[11px] text-stone-600">{rev.city}</p>
                <p className="text-[10px] text-amber-900 font-medium mt-1 truncate">{rev.artwork}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
