
// Type definitions for the application
export interface Project {
  id: string;
  name: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  images: RoomImage[];
}

export interface RoomImage {
  id: string;
  src: string;
  colorApplied: ColorApplication[];
}

export interface ColorApplication {
  id: string;
  colorId: string;
  position: { x: number, y: number };
  surface: string;
  area: number;
  literPerSqm: number;
  finishType: string;
  undercoat: boolean;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
  reference: string;
  category: string;
  brand: string;
}

export interface DecoTip {
  id: string;
  type: 'text' | 'image';
  content: string;
  caption?: string;
  roomId: string;
}

export interface ExportOptions {
  includeClientInfo: boolean;
  includeImages: boolean;
  includeColorDetails: boolean;
  includeQuantities: boolean;
  fileFormat: 'pdf' | 'csv';
}
