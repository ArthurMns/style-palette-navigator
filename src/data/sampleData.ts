import { Project, Color } from "../lib/types";

export const sampleProjects: Project[] = [
  {
    id: "proj-001",
    name: "Rénovation Maison Dubois",
    conseilleName: "Conseillé 1",
    createdAt: "2025-04-25T10:00:00Z",
    updatedAt: "2025-04-28T14:30:00Z",
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    rooms: [
      {
        id: "room-001",
        name: "Salon",
        images: [
          {
            id: "img-001",
            src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
            colorApplied: []
          }
        ]
      }
    ]
  },
  {
    id: "proj-002",
    name: "Appartement Martin",
    conseilleName: "Conseillé 1",
    createdAt: "2025-04-20T09:15:00Z",
    updatedAt: "2025-04-27T16:45:00Z",
    rooms: []
  },
  {
    id: "proj-003",
    name: "Villa Leblanc",
    conseilleName: "Conseillé 1",
    createdAt: "2025-04-15T11:30:00Z",
    updatedAt: "2025-04-26T10:20:00Z",
    rooms: [],
    coverImage: "https://images.unsplash.com/photo-1746061546854-1fb8b0b90862"
  },
  {
    id: "proj-004",
    name: "Studio Petit",
    conseilleName: "Conseillé 1",
    createdAt: "2025-04-10T14:00:00Z",
    updatedAt: "2025-04-25T09:10:00Z",
    rooms: []
  },
  {
    id: "proj-005",
    name: "Maison Bernard",
    conseilleName: "Conseillé 2",
    createdAt: "2025-05-01T08:00:00Z",
    updatedAt: "2025-05-03T11:20:00Z",
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    rooms: []
  },
  {
    id: "proj-006",
    name: "Loft Durand",
    conseilleName: "Conseillé 2",
    createdAt: "2025-05-05T13:45:00Z",
    updatedAt: "2025-05-07T16:30:00Z",
    rooms: []
  },
  {
    id: "proj-007",
    name: "Résidence Leroy",
    conseilleName: "Conseillé 2",
    createdAt: "2025-05-10T09:30:00Z",
    updatedAt: "2025-05-12T14:15:00Z",
    rooms: []
  },
  {
    id: "proj-008",
    name: "Rénovation Boutique Bernard",
    conseilleName: "Conseillé 2",
    createdAt: "2025-03-05T11:25:00Z",
    updatedAt: "2025-04-19T16:50:00Z",
    rooms: []
  },
  {
    id: "proj-009",
    name: "Appartement Design Moreau",
    conseilleName: "Conseillé 3",
    createdAt: "2025-05-20T09:00:00Z",
    updatedAt: "2025-05-22T14:30:00Z",
    rooms: []
  },
  {
    id: "proj-010",
    name: "Villa Lambert",
    conseilleName: "Conseillé 3",
    createdAt: "2025-05-25T11:15:00Z",
    updatedAt: "2025-05-27T16:20:00Z",
    rooms: []
  },
  {
    id: "proj-011",
    name: "Loft Girard",
    conseilleName: "Conseillé 3",
    createdAt: "2025-05-30T13:30:00Z",
    updatedAt: "2025-06-01T10:45:00Z",
    coverImage: "https://images.unsplash.com/photo-1746061546234-8c38375eef06",
    rooms: []
  },
  {
    id: "proj-012",
    name: "Résidence Mercier",
    conseilleName: "Conseillé 3",
    createdAt: "2025-06-05T08:45:00Z",
    updatedAt: "2025-06-07T12:15:00Z",
    rooms: []
  }
];

export const sampleColors: Color[] = [
  {
    id: "color-001",
    name: "Bleu Horizon",
    desc: "Dead Flat 0.75L 0001 Lime White",
    hexCode: "#4A6D8C",
    reference: "BH-1245",
    category: "Bleus",
    brand: "SoStyle"
  },
  {
    id: "color-002",
    name: "Rouge Passion",
    desc: "Dead Flat 0.75L 0002 Lime White",
    hexCode: "#9E2B25",
    reference: "RP-3278",
    category: "Rouges",
    brand: "SoStyle"
  },
  {
    id: "color-003",
    name: "Vert Olive",
    desc: "*Wall & Ceiling Primer & U/C 0.75L White & Light",
    hexCode: "#5F7E3A",
    reference: "VO-8754",
    category: "Verts",
    brand: "SoStyle"
  },
  {
    id: "color-004",
    name: "Jaune Soleil",
    desc: "Dead Flat 0.75L 0003 Lime White",
    hexCode: "#DFBC60",
    reference: "JS-4522",
    category: "Jaunes",
    brand: "SoStyle"
  },
  {
    id: "color-005",
    name: "Beige Sable",
    desc: "*Wall & Ceiling Primer & U/C 0.75L White & Light",
    hexCode: "#D9C9B6",
    reference: "BS-1187",
    category: "Neutres",
    brand: "SoStyle"
  },
  {
    id: "color-006",
    name: "Gris Ardoise",
    desc: "*Wall & Ceiling Primer & U/C 0.75L White & Light",
    hexCode: "#646A76",
    reference: "GA-6532",
    category: "Gris",
    brand: "SoStyle"
  },
  {
    id: "color-007",
    name: "Blanc Perle",
    desc: "Dead Flat 0.75L 0003 Lime White",
    hexCode: "#F5F3F4",
    reference: "BP-9012",
    category: "Blancs",
    brand: "SoStyle"
  },
  {
    id: "color-008",
    name: "Violet Prune",
    desc: "*Wall & Ceiling Primer & U/C 0.75L White & Light",
    hexCode: "#7D5285",
    reference: "VP-2290",
    category: "Violets",
    brand: "SoStyle"
  }
];
