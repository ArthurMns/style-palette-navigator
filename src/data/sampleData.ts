
import { Project, Color } from "../lib/types";

export const sampleProjects: Project[] = [
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
    rooms: []
  },
  {
    id: "proj-004",
    name: "Studio Petit",
    clientName: "Marie Petit",
    createdAt: "2025-04-10T14:00:00Z",
    updatedAt: "2025-04-25T09:10:00Z",
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
