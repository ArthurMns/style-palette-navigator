
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Color } from '../lib/types';

interface ColorPaletteProps {
  colors: Color[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  
  const filteredColors = colors.filter(color => {
    const matchesSearch = !searchTerm || 
      color.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      color.reference.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = !categoryFilter || color.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = Array.from(new Set(colors.map(color => color.category)));
  
  return (
    <div className="bg-white rounded-lg border border-border p-4">
      <h3 className="font-medium mb-4">Palette de couleurs</h3>
      
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une couleur..."
            className="pl-8 bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="category-select">Catégorie</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category-select">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {filteredColors.map((color) => (
          <div 
            key={color.id}
            className="flex flex-col items-center"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("color", JSON.stringify(color));
            }}
          >
            <div 
              className="color-dot mb-1"
              style={{ backgroundColor: color.hexCode }}
              title={`${color.name} (${color.reference})`}
            />
            <span className="text-xs text-center truncate w-full">{color.name}</span>
          </div>
        ))}
      </div>
      
      {filteredColors.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-4">
          Aucune couleur trouvée
        </p>
      )}
    </div>
  );
};

export default ColorPalette;
