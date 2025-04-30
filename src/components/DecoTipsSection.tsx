
import React, { useState } from 'react';
import { Project, DecoTip } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Plus, Trash, Image, Edit, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface DecoTipsSectionProps {
  project: Project | null;
  selectedRoom: string;
}

const DecoTipsSection: React.FC<DecoTipsSectionProps> = ({ project, selectedRoom }) => {
  const { toast } = useToast();
  const [tips, setTips] = useState<DecoTip[]>([
    {
      id: 'tip-001',
      type: 'text',
      content: 'Pour harmoniser la pièce, utilisez des accessoires dans les tons complémentaires aux couleurs murales choisies.',
      roomId: 'room-001'
    },
    {
      id: 'tip-002',
      type: 'image',
      content: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
      caption: "Inspiration pour l'agencement du salon avec la nouvelle couleur.",
      roomId: 'room-001'
    }
  ]);
  
  const [isAddingTip, setIsAddingTip] = useState(false);
  const [newTipType, setNewTipType] = useState<'text' | 'image'>('text');
  const [newTipContent, setNewTipContent] = useState('');
  const [newTipCaption, setNewTipCaption] = useState('');
  const [editingTipId, setEditingTipId] = useState<string | null>(null);

  const filteredTips = tips.filter(tip => tip.roomId === selectedRoom);
  
  const handleAddTip = () => {
    if (!newTipContent.trim()) {
      toast({
        title: "Contenu requis",
        description: "Veuillez ajouter du contenu pour votre conseil déco.",
        variant: "destructive"
      });
      return;
    }
    
    const newTip: DecoTip = {
      id: `tip-${Date.now()}`,
      type: newTipType,
      content: newTipContent,
      roomId: selectedRoom,
    };
    
    if (newTipType === 'image' && newTipCaption.trim()) {
      newTip.caption = newTipCaption;
    }
    
    setTips([...tips, newTip]);
    resetForm();
    
    toast({
      title: "Conseil déco ajouté",
      description: "Votre conseil décoratif a été ajouté avec succès."
    });
  };
  
  const handleEditTip = (tip: DecoTip) => {
    setNewTipType(tip.type);
    setNewTipContent(tip.content);
    setNewTipCaption(tip.caption || '');
    setEditingTipId(tip.id);
    setIsAddingTip(true);
  };
  
  const handleUpdateTip = () => {
    if (!editingTipId || !newTipContent.trim()) {
      return;
    }
    
    const updatedTips = tips.map(tip => {
      if (tip.id === editingTipId) {
        const updatedTip: DecoTip = {
          ...tip,
          type: newTipType,
          content: newTipContent,
        };
        
        if (newTipType === 'image' && newTipCaption.trim()) {
          updatedTip.caption = newTipCaption;
        } else {
          delete updatedTip.caption;
        }
        
        return updatedTip;
      }
      return tip;
    });
    
    setTips(updatedTips);
    resetForm();
    
    toast({
      title: "Conseil déco mis à jour",
      description: "Votre conseil décoratif a été mis à jour avec succès."
    });
  };
  
  const handleDeleteTip = (tipId: string) => {
    setTips(tips.filter(tip => tip.id !== tipId));
    
    toast({
      title: "Conseil déco supprimé",
      description: "Le conseil décoratif a été supprimé.",
      variant: "destructive"
    });
  };
  
  const resetForm = () => {
    setNewTipType('text');
    setNewTipContent('');
    setNewTipCaption('');
    setEditingTipId(null);
    setIsAddingTip(false);
  };
  
  const currentRoom = project?.rooms.find(room => room.id === selectedRoom);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Conseils décoratifs pour {currentRoom?.name || 'cette pièce'}</h3>
          <Button onClick={() => setIsAddingTip(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un conseil décoratif
          </Button>
        </div>
        
        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTips.map(tip => (
              <Card key={tip.id} className="overflow-hidden">
                {tip.type === 'image' && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={tip.content} 
                      alt="Inspiration déco" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className={`${tip.type === 'image' ? 'pt-4' : 'pt-6'}`}>
                  {tip.type === 'text' ? (
                    <p className="text-gray-700">{tip.content}</p>
                  ) : (
                    <p className="text-gray-700">{tip.caption}</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button variant="ghost" size="sm" onClick={() => handleEditTip(tip)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Éditer
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteTip(tip.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun conseil décoratif n'a été ajouté pour cette pièce.</p>
            <p className="text-sm mt-2">Cliquez sur "Ajouter un conseil décoratif" pour commencer.</p>
          </div>
        )}
      </div>
      
      {/* Modal d'ajout/édition de conseil déco */}
      <Dialog open={isAddingTip} onOpenChange={setIsAddingTip}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingTipId ? "Modifier le conseil décoratif" : "Ajouter un conseil décoratif"}
            </DialogTitle>
            <DialogDescription>
              Ajoutez des notes ou des images d'inspiration pour ce projet.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="tip-type" className="block text-sm font-medium text-gray-700">
                Type de conseil
              </label>
              <Select 
                value={newTipType} 
                onValueChange={(value: 'text' | 'image') => setNewTipType(value)}
              >
                <SelectTrigger id="tip-type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Note textuelle</SelectItem>
                  <SelectItem value="image">Image d'inspiration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newTipType === 'text' ? (
              <div className="space-y-2">
                <label htmlFor="tip-content" className="block text-sm font-medium text-gray-700">
                  Contenu
                </label>
                <Textarea
                  id="tip-content"
                  placeholder="Entrez votre conseil décoratif..."
                  value={newTipContent}
                  onChange={(e) => setNewTipContent(e.target.value)}
                  rows={4}
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">
                    URL de l'image
                  </label>
                  <Input
                    id="image-url"
                    placeholder="https://exemple.com/image.jpg"
                    value={newTipContent}
                    onChange={(e) => setNewTipContent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="image-caption" className="block text-sm font-medium text-gray-700">
                    Légende
                  </label>
                  <Input
                    id="image-caption"
                    placeholder="Décrivez cette image d'inspiration..."
                    value={newTipCaption}
                    onChange={(e) => setNewTipCaption(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={resetForm}>Annuler</Button>
            <Button onClick={editingTipId ? handleUpdateTip : handleAddTip}>
              <Save className="h-4 w-4 mr-2" />
              {editingTipId ? "Mettre à jour" : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DecoTipsSection;
