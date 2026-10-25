export type CategoryType = 'all' | 'original' | 'print' | 'digital' | 'sketchbook';

export type TechniqueType = 
  | 'Grafite & Carvão'
  | 'Nanquim & Bico de Pena'
  | 'Aquarela Botânica'
  | 'Lápis de Cor & Giz Pastel'
  | 'Pintura a Óleo / Acrílica'
  | 'Ilustração Digital';

export type FrameOptionId = 'none' | 'black-wood' | 'natural-oak' | 'white-wood' | 'gold-vintage';

export interface FrameOption {
  id: FrameOptionId;
  name: string;
  priceDelta: number;
  description: string;
  colorHex: string;
  borderWidth: number;
}

export interface Artwork {
  id: string;
  title: string;
  subtitle: string;
  category: 'original' | 'print' | 'digital' | 'sketchbook';
  technique: TechniqueType;
  paperType: string;
  dimensions: string;
  year: number;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  bestseller?: boolean;
  tags: string[];
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  story: string;
  certificateOfAuthenticity: boolean;
  editionDetails?: string; // e.g. "Tiragem limitada de 50 cópias numeradas"
}

export interface CartItem {
  id: string; // unique item id = artworkId + frameId
  artwork: Artwork;
  selectedFrame: FrameOption;
  quantity: number;
}

export interface CommissionRequest {
  subject: string;
  technique: string;
  size: string;
  frameOption: FrameOptionId;
  notes: string;
  sketchDataUrl?: string;
  clientName: string;
  clientEmail: string;
  clientWhatsapp: string;
  deliveryDateTarget?: string;
  estimatedPrice: number;
}
