
import React, { useState } from 'react';
import { Copy, Trash, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { ColorApplication } from '@/lib/types';

interface PastilleConfigFormProps {
  pastille: ColorApplication;
  onUpdate: (updatedPastille: ColorApplication) => void;
  onDelete: (pastilleId: string) => void;
}

const PastilleConfigForm: React.FC<PastilleConfigFormProps> = ({ 
  pastille, 
  onUpdate,
  onDelete 
}) => {
  const [area, setArea] = useState(pastille.area.toString());
  const [surface, setSurface] = useState(pastille.surface);
  const [literPerSqm, setLiterPerSqm] = useState(pastille.literPerSqm.toString());
  const [finishType, setFinishType] = useState(pastille.finishType);
  const [undercoat, setUndercoat] = useState(pastille.undercoat);
  const [hasError, setHasError] = useState(false);
  
  const handleAreaChange = (value: string) => {
    setArea(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  };
  
  const handleSurfaceTypeChange = (value: string) => {
    setSurface(value);
  };
  
  const handleLiterPerSqmChange = (value: string) => {
    setLiterPerSqm(value);
  };
  
  const handleSave = () => {
    const numArea = parseFloat(area);
    const numLiterPerSqm = parseFloat(literPerSqm);
    
    if (isNaN(numArea) || numArea <= 0 || isNaN(numLiterPerSqm) || numLiterPerSqm <= 0) {
      setHasError(true);
      return;
    }
    
    const updatedPastille: ColorApplication = {
      ...pastille,
      area: numArea,
      surface,
      literPerSqm: numLiterPerSqm,
      finishType,
      undercoat
    };
    
    onUpdate(updatedPastille);
  };
  
  const handleDuplicate = () => {
    const numArea = parseFloat(area);
    const numLiterPerSqm = parseFloat(literPerSqm);
    
    if (isNaN(numArea) || numArea <= 0 || isNaN(numLiterPerSqm) || numLiterPerSqm <= 0) {
      setHasError(true);
      return;
    }
    
    const duplicatedPastille: ColorApplication = {
      ...pastille,
      id: `pastille-${Date.now()}`,
      area: numArea,
      surface,
      literPerSqm: numLiterPerSqm,
      finishType,
      undercoat,
      position: { 
        x: pastille.position.x + 20, 
        y: pastille.position.y + 20 
      }
    };
    
    onUpdate(duplicatedPastille);
  };
  
  // Calculer le litrage total
  const totalLiters = parseFloat(area) * parseFloat(literPerSqm);
  const formattedTotalLiters = isNaN(totalLiters) ? "0.00" : totalLiters.toFixed(2);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="area">Surface à peindre (m²)</Label>
          <Input
            id="area"
            type="number"
            min="0.1"
            step="0.1"
            value={area}
            onChange={(e) => handleAreaChange(e.target.value)}
            className={hasError ? "border-destructive" : ""}
          />
          {hasError && (
            <p className="text-destructive text-xs">
              Veuillez saisir une surface valide (minimum 0.1 m²)
            </p>
          )}
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="surface-type">Type de surface</Label>
          <Select value={surface} onValueChange={handleSurfaceTypeChange}>
            <SelectTrigger id="surface-type">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mur">Mur</SelectItem>
              <SelectItem value="plafond">Plafond</SelectItem>
              <SelectItem value="boiserie">Boiserie</SelectItem>
              <SelectItem value="sol">Sol</SelectItem>
              <SelectItem value="meuble">Meuble</SelectItem>
              <SelectItem value="exterieur">Extérieur</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="liter-per-sqm">Litrage par m²</Label>
          <Select 
            value={literPerSqm} 
            onValueChange={handleLiterPerSqmChange}
          >
            <SelectTrigger id="liter-per-sqm">
              <SelectValue placeholder="Sélectionner un litrage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.08">Intérieur (0.08 L/m²)</SelectItem>
              <SelectItem value="0.12">Extérieur (0.12 L/m²)</SelectItem>
              <SelectItem value="0.16">Surface poreuse (0.16 L/m²)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="finish-type">Finition souhaitée</Label>
          <Select value={finishType} onValueChange={setFinishType}>
            <SelectTrigger id="finish-type">
              <SelectValue placeholder="Sélectionner une finition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mate">Mate</SelectItem>
              <SelectItem value="satinee">Satinée</SelectItem>
              <SelectItem value="brillante">Brillante</SelectItem>
              <SelectItem value="velours">Velours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox 
            id="undercoat" 
            checked={undercoat}
            onCheckedChange={(checked) => setUndercoat(checked === true)}
          />
          <Label htmlFor="undercoat" className="text-sm">Application sous-couche</Label>
        </div>
        
        <div className="mt-2 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Quantité totale estimée</p>
          <p className="text-lg font-medium">{formattedTotalLiters} L</p>
        </div>
      </div>
      
      <div className="col-span-2 flex justify-between mt-2">
        <Button 
          variant="destructive" 
          onClick={() => onDelete(pastille.id)}
        >
          <Trash className="h-4 w-4 mr-1" />
          Supprimer
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleDuplicate}>
            <Copy className="h-4 w-4 mr-1" />
            Dupliquer
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PastilleConfigForm;
