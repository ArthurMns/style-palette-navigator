import { Project, Color } from "../lib/types";

export const sampleProjects: Project[] = [
  {
    id: "proj-005",
    name: "Maison Bernard",
    clientName: "Marc Bernard",
    createdAt: "2025-05-01T08:00:00Z",
    updatedAt: "2025-05-03T11:20:00Z",
    coverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    rooms: []
  },
  {
    id: "proj-006",
    name: "Loft Durand",
    clientName: "Claire Durand",
    createdAt: "2025-05-05T13:45:00Z",
    updatedAt: "2025-05-07T16:30:00Z",
    rooms: []
  },
  {
    id: "proj-007",
    name: "Résidence Leroy",
    clientName: "Thomas Leroy",
    createdAt: "2025-05-10T09:30:00Z",
    updatedAt: "2025-05-12T14:15:00Z",
    rooms: []
  },
  {
    id: "proj-001",
    name: "Rénovation Maison Dubois",
    clientName: "Jean Dubois",
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
    clientName: "Sophie Martin",
    createdAt: "2025-04-20T09:15:00Z",
    updatedAt: "2025-04-27T16:45:00Z",
    rooms: []
  },
  {
    id: "proj-003",
    name: "Villa Leblanc",
    clientName: "Pierre Leblanc",
    createdAt: "2025-04-15T11:30:00Z",
    updatedAt: "2025-04-26T10:20:00Z",
    rooms: [],
    coverImage: "https://images.unsplash.com/photo-1746061546854-1fb8b0b90862"
  },
  {
    id: "proj-004",
    name: "Studio Petit",
    clientName: "Marie Petit",
    createdAt: "2025-04-10T14:00:00Z",
    updatedAt: "2025-04-25T09:10:00Z",
    rooms: []
  },
  {
    id: "proj-005",
    name: "Loft Dupont",
    clientName: "Thomas Dupont",
    createdAt: "2025-04-05T13:20:00Z",
    updatedAt: "2025-04-24T11:15:00Z",
    coverImage: "https://images.unsplash.com/photo-1617806118233-18e1de247200",
    rooms: [
      {
        id: "room-005",
        name: "Cuisine ouverte",
        images: [
          {
            id: "img-005",
            src: "https://images.unsplash.com/photo-1617806118233-18e1de247200",
            colorApplied: []
          }
        ]
      }
    ]
  },
  {
    id: "proj-006",
    name: "Maison de campagne Moreau",
    clientName: "Claire Moreau",
    createdAt: "2025-03-28T09:45:00Z",
    updatedAt: "2025-04-22T15:30:00Z",
    rooms: []
  },
  {
    id: "proj-007",
    name: "Résidence Leroy",
    clientName: "Michel Leroy",
    createdAt: "2025-03-15T10:10:00Z",
    updatedAt: "2025-04-21T14:40:00Z",
    coverImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37",
    rooms: [
      {
        id: "room-007",
        name: "Chambre principale",
        images: [
          {
            id: "img-007",
            src: "https://images.unsplash.com/photo-1615529182904-14819c35db37",
            colorApplied: []
          }
        ]
      }
    ]
  },
  {
    id: "proj-008",
    name: "Rénovation Boutique Bernard",
    clientName: "François Bernard",
    createdAt: "2025-03-05T11:25:00Z",
    updatedAt: "2025-04-19T16:50:00Z",
    rooms: []
  },
  {
    id: "proj-009",
    name: "Rénovation Boutique Bernard",
    clientName: "François Bernard",
    createdAt: "2025-03-05T11:25:00Z",
    updatedAt: "2025-04-19T16:50:00Z",
    rooms: []
  },
  {
    id: "proj-010",
    name: "Rénovation Boutique Bernard",
    clientName: "François Bernard",
    createdAt: "2025-03-05T11:25:00Z",
    updatedAt: "2025-04-19T16:50:00Z",
    rooms: []
  }
  ,
  {
    id: "proj-008",
    name: "Maison Rivière",
    clientName: "Alice Rivière",
    createdAt: "2025-05-15T10:00:00Z",
    updatedAt: "2025-05-17T15:45:00Z",
    coverImage: "https://images.unsplash.com/photo-1746061546123-8c38375eef05",
    rooms: []
  },
  {
    id: "proj-009",
    name: "Appartement Moreau",
    clientName: "François Moreau",
    createdAt: "2025-05-20T09:00:00Z",
    updatedAt: "2025-05-22T14:30:00Z",
    rooms: []
  },
  {
    id: "proj-010",
    name: "Villa Lambert",
    clientName: "Julie Lambert",
    createdAt: "2025-05-25T11:15:00Z",
    updatedAt: "2025-05-27T16:20:00Z",
    rooms: []
  },
  {
    id: "proj-011",
    name: "Loft Girard",
    clientName: "Paul Girard",
    createdAt: "2025-05-30T13:30:00Z",
    updatedAt: "2025-06-01T10:45:00Z",
    coverImage: "https://images.unsplash.com/photo-1746061546234-8c38375eef06",
    rooms: []
  },
  {
    id: "proj-012",
    name: "Résidence Mercier",
    clientName: "Emma Mercier",
    createdAt: "2025-06-05T08:45:00Z",
    updatedAt: "2025-06-07T12:15:00Z",
    rooms: []
  }
];

export const sampleColors: Color[] = [
  {
    id: "color-001",
    name: "Bleu Horizon",
    hexCode: "#4A6D8C",
    reference: "BH-1245",
    category: "Bleus",
    brand: "SoStyle"
  },
  {
    id: "color-002",
    name: "Rouge Passion",
    hexCode: "#9E2B25",
    reference: "RP-3278",
    category: "Rouges",
    brand: "SoStyle"
  },
  {
    id: "color-003",
    name: "Vert Olive",
    hexCode: "#5F7E3A",
    reference: "VO-8754",
    category: "Verts",
    brand: "SoStyle"
  },
  {
    id: "color-004",
    name: "Jaune Soleil",
    hexCode: "#DFBC60",
    reference: "JS-4522",
    category: "Jaunes",
    brand: "SoStyle"
  },
  {
    id: "color-005",
    name: "Beige Sable",
    hexCode: "#D9C9B6",
    reference: "BS-1187",
    category: "Neutres",
    brand: "SoStyle"
  },
  {
    id: "color-006",
    name: "Gris Ardoise",
    hexCode: "#646A76",
    reference: "GA-6532",
    category: "Gris",
    brand: "SoStyle"
  },
  {
    id: "color-007",
    name: "Blanc Perle",
    hexCode: "#F5F3F4",
    reference: "BP-9012",
    category: "Blancs",
    brand: "SoStyle"
  },
  {
    id: "color-008",
    name: "Violet Prune",
    hexCode: "#7D5285",
    reference: "VP-2290",
    category: "Violets",
    brand: "SoStyle"
  }
  
];
