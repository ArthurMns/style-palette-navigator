
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, MoreHorizontal, Plus, Trash, Copy, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ColorPalette from '@/components/ColorPalette';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import PastilleConfigForm from '@/components/PastilleConfigForm';
import { Color, Project, RoomImage, ColorApplication } from '@/lib/types';
import { sampleColors } from '@/data/sampleData';

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  
  // État pour stocker les données du projet
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("photos");
  const [projectName, setProjectName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [selectedImage, setSelectedImage] = useState<RoomImage | null>(null);
  const [selectedPastille, setSelectedPastille] = useState<ColorApplication | null>(null);
  
  // Simuler le chargement des données du projet
  React.useEffect(() => {
    const fetchProject = async () => {
      // Ici, vous remplaceriez cela par un appel API réel
      setTimeout(() => {
        // Données factices pour la démonstration
        const demoProject: Project = {
          id: projectId || "",
          name: "Projet Rénovation Appartement",
          clientName: "Martin Dupont",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          rooms: [
            {
              id: "room-001",
              name: "Salon",
              images: [
                {
                  id: "img-001",
                  src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
                  colorApplied: [
                    {
                      id: "pastille-001",
                      colorId: "color-001",
                      position: { x: 150, y: 120 },
                      surface: "mur",
                      area: 12,
                      literPerSqm: 0.08,
                      finishType: "mate",
                      undercoat: true
                    }
                  ]
                }
              ]
            }
          ]
        };
        
        setProject(demoProject);
        setProjectName(demoProject.name);
        if (demoProject.rooms[0]?.images[0]) {
          setSelectedImage(demoProject.rooms[0].images[0]);
        }
        setLoading(false);
      }, 500);
    };
    
    fetchProject();
  }, [projectId]);
  
  // Fonctions pour gérer les actions sur le projet
  const handleRenameProject = () => {
    if (project) {
      const updatedProject = { ...project, name: projectName };
      setProject(updatedProject);
      setEditingName(false);
      
      toast({
        title: "Projet renommé",
        description: "Le nom du projet a été mis à jour.",
      });
    }
  };
  
  const handleDuplicateProject = () => {
    toast({
      title: "Projet dupliqué",
      description: "Une copie du projet a été créée.",
    });
  };
  
  const handleDeleteProject = () => {
    toast({
      title: "Projet supprimé",
      description: "Le projet a été supprimé.",
    });
    navigate('/');
  };
  
  // Fonctions pour gérer les images
  const handleTakePhoto = () => {
    if (cameraRef.current) {
      cameraRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result && project) {
          const newImageId = `img-${Date.now()}`;
          const newImage: RoomImage = {
            id: newImageId,
            src: e.target.result as string,
            colorApplied: []
          };
          
          const updatedRooms = [...project.rooms];
          if (updatedRooms.length > 0) {
            updatedRooms[0].images = [...updatedRooms[0].images, newImage];
          } else {
            updatedRooms.push({
              id: `room-${Date.now()}`,
              name: "Pièce sans nom",
              images: [newImage]
            });
          }
          
          setProject({
            ...project,
            rooms: updatedRooms,
            updatedAt: new Date().toISOString()
          });
          
          setSelectedImage(newImage);
          
          toast({
            title: "Image ajoutée",
            description: "L'image a été ajoutée au projet avec succès.",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleImportImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSelectImage = (image: RoomImage) => {
    setSelectedImage(image);
    setSelectedPastille(null);
  };
  
  // Fonction pour gérer le drag-and-drop des couleurs
  const handleColorDrop = (e: React.DragEvent<HTMLDivElement>, color: Color) => {
    e.preventDefault();
    if (!selectedImage) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newPastille: ColorApplication = {
      id: `pastille-${Date.now()}`,
      colorId: color.id,
      position: { x, y },
      surface: "mur",
      area: 10,
      literPerSqm: 0.08,
      finishType: "mate",
      undercoat: false
    };
    
    const updatedImage = { 
      ...selectedImage, 
      colorApplied: [...selectedImage.colorApplied, newPastille] 
    };
    
    if (project) {
      const updatedRooms = project.rooms.map(room => ({
        ...room,
        images: room.images.map(img => 
          img.id === selectedImage.id ? updatedImage : img
        )
      }));
      
      setProject({
        ...project,
        rooms: updatedRooms,
        updatedAt: new Date().toISOString()
      });
      
      setSelectedImage(updatedImage);
      setSelectedPastille(newPastille);
    }
  };
  
  // Fonction pour sélectionner une pastille
  const handleSelectPastille = (pastille: ColorApplication) => {
    setSelectedPastille(pastille);
  };
  
  // Fonction pour mettre à jour une pastille
  const handleUpdatePastille = (updatedPastille: ColorApplication) => {
    if (!selectedImage || !project) return;
    
    const updatedColorApplied = selectedImage.colorApplied.map(p => 
      p.id === updatedPastille.id ? updatedPastille : p
    );
    
    const updatedImage = {
      ...selectedImage,
      colorApplied: updatedColorApplied
    };
    
    const updatedRooms = project.rooms.map(room => ({
      ...room,
      images: room.images.map(img => 
        img.id === selectedImage.id ? updatedImage : img
      )
    }));
    
    setProject({
      ...project,
      rooms: updatedRooms,
      updatedAt: new Date().toISOString()
    });
    
    setSelectedImage(updatedImage);
    
    toast({
      title: "Pastille mise à jour",
      description: "Les paramètres de la pastille ont été enregistrés.",
    });
  };
  
  // Fonction pour supprimer une pastille
  const handleDeletePastille = (pastilleId: string) => {
    if (!selectedImage || !project) return;
    
    const updatedColorApplied = selectedImage.colorApplied.filter(p => p.id !== pastilleId);
    
    const updatedImage = {
      ...selectedImage,
      colorApplied: updatedColorApplied
    };
    
    const updatedRooms = project.rooms.map(room => ({
      ...room,
      images: room.images.map(img => 
        img.id === selectedImage.id ? updatedImage : img
      )
    }));
    
    setProject({
      ...project,
      rooms: updatedRooms,
      updatedAt: new Date().toISOString()
    });
    
    setSelectedImage(updatedImage);
    setSelectedPastille(null);
    
    toast({
      title: "Pastille supprimée",
      description: "La pastille a été supprimée de l'image.",
      variant: "destructive",
    });
  };
  
  // Fonction pour générer les livrables
  const handleGeneratePDF = () => {
    toast({
      title: "Génération en cours",
      description: "Le PDF est en cours de génération...",
    });
    
    // Simuler un délai de génération
    setTimeout(() => {
      toast({
        title: "PDF généré",
        description: "Le document PDF est prêt à être téléchargé.",
      });
    }, 2000);
  };
  
  const handleExportCSV = () => {
    toast({
      title: "Export en cours",
      description: "Le fichier CSV pour EBP est en cours de génération...",
    });
    
    // Simuler un délai de génération
    setTimeout(() => {
      toast({
        title: "CSV généré",
        description: "Le fichier CSV pour EBP est prêt à être téléchargé.",
      });
    }, 1500);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Chargement du projet...</h2>
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* En-tête du projet */}
      <header className="w-full px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            {editingName ? (
              <div className="flex items-center">
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="max-w-[250px]"
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleRenameProject}
                  className="ml-2"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Enregistrer
                </Button>
              </div>
            ) : (
              <h1 
                className="font-bold text-xl cursor-pointer hover:text-primary"
                onClick={() => setEditingName(true)}
              >
                {project?.name}
              </h1>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditingName(true)}>
                  Renommer le projet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicateProject}>
                  Dupliquer le projet
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={handleDeleteProject}
                >
                  Supprimer le projet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Corps du projet */}
      <main className="flex-1 p-4 bg-gray-50">
        <div className="container mx-auto">
          <Tabs defaultValue="photos" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="photos" className="flex-1">Photos et Couleurs</TabsTrigger>
              <TabsTrigger value="deco" className="flex-1">Conseils Déco</TabsTrigger>
              <TabsTrigger value="recap" className="flex-1">Récapitulatif</TabsTrigger>
            </TabsList>
            
            <TabsContent value="photos" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Zone principale - photo et pastilles */}
                <div className="col-span-2 space-y-4">
                  {selectedImage ? (
                    <div className="relative w-full bg-white rounded-lg border border-border overflow-hidden"
                         onDragOver={(e) => e.preventDefault()}
                         onDrop={(e) => {
                           const colorData = e.dataTransfer.getData('color');
                           if (colorData) {
                             const color = JSON.parse(colorData);
                             handleColorDrop(e, color);
                           }
                         }}
                    >
                      <div className="relative">
                        <img 
                          src={selectedImage.src} 
                          alt="Image du projet"
                          className="w-full h-auto object-contain"
                        />
                        {selectedImage.colorApplied.map(pastille => {
                          const color = sampleColors.find(c => c.id === pastille.colorId);
                          return (
                            <div
                              key={pastille.id}
                              className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform"
                              style={{ 
                                backgroundColor: color?.hexCode || '#000000',
                                left: pastille.position.x,
                                top: pastille.position.y
                              }}
                              onClick={() => handleSelectPastille(pastille)}
                              title={`${color?.name} (${color?.reference})`}
                            />
                          );
                        })}
                      </div>
                      
                      <div className="bg-white p-3 border-t border-border">
                        <p className="text-sm font-medium">
                          {selectedImage.id} - Glissez et déposez une couleur sur l'image pour ajouter une pastille
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-72 bg-white rounded-lg border border-dashed border-gray-300">
                      <div className="text-center">
                        <p className="text-gray-500 mb-4">Aucune image sélectionnée</p>
                        <div className="flex gap-2 justify-center">
                          <Button onClick={handleTakePhoto}>
                            <Camera className="h-4 w-4 mr-2" />
                            Prendre une photo
                          </Button>
                          <Button variant="outline" onClick={handleImportImage}>
                            <Upload className="h-4 w-4 mr-2" />
                            Importer une image
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Galerie d'images */}
                  <div className="bg-white rounded-lg border border-border p-4">
                    <h3 className="font-medium mb-3">Images du projet</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {project?.rooms.flatMap(room => room.images).map(image => (
                        <div
                          key={image.id}
                          className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
                            selectedImage?.id === image.id ? 'border-primary' : 'border-transparent'
                          }`}
                          onClick={() => handleSelectImage(image)}
                        >
                          <img 
                            src={image.src} 
                            alt="Miniature"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      
                      <div className="aspect-square rounded-md border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                        <div className="text-center" onClick={handleImportImage}>
                          <Plus className="h-6 w-6 mx-auto text-gray-400" />
                          <span className="text-xs text-gray-500">Ajouter</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={handleTakePhoto}>
                        <Camera className="h-4 w-4 mr-1" />
                        Prendre une photo
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleImportImage}>
                        <Upload className="h-4 w-4 mr-1" />
                        Importer une image
                      </Button>
                    </div>
                    
                    {/* Input file caché */}
                    <input 
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {/* Input camera caché */}
                    <input 
                      type="file"
                      ref={cameraRef}
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                  
                  {/* Formulaire de configuration de pastille */}
                  {selectedPastille && selectedImage && (
                    <div className="bg-white rounded-lg border border-border p-4">
                      <h3 className="font-medium mb-3">Configuration de la pastille</h3>
                      <PastilleConfigForm
                        pastille={selectedPastille}
                        onUpdate={handleUpdatePastille}
                        onDelete={handleDeletePastille}
                      />
                    </div>
                  )}
                </div>
                
                {/* Palette de couleurs */}
                <div className="col-span-1">
                  <ColorPalette colors={sampleColors} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deco" className="space-y-4">
              <div className="bg-white rounded-lg border border-border p-4">
                <h3 className="font-medium mb-3">Conseils décoratifs</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Ajoutez des notes ou des images d'inspiration pour compléter votre projet de conseil couleur.
                </p>
                
                <div className="mb-4">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un conseil décoratif
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-3 border border-border rounded-md">
                    <h4 className="font-medium mb-1">Note décorative</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Pour harmoniser la pièce, utilisez des accessoires dans les tons complémentaires
                      aux couleurs murales choisies.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        Éditer
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-border rounded-md">
                    <h4 className="font-medium mb-1">Image d'inspiration</h4>
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-2">
                      <img
                        src="https://images.unsplash.com/photo-1616046229478-9901c5536a45"
                        alt="Inspiration déco"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Inspiration pour l'agencement du salon avec la nouvelle couleur.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        Éditer
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recap" className="space-y-4">
              <div className="bg-white rounded-lg border border-border p-4">
                <h3 className="font-medium mb-3">Récapitulatif du projet</h3>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Informations générales</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nom du projet</p>
                      <p className="font-medium">{project?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Client</p>
                      <p className="font-medium">{project?.clientName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Résumé des couleurs</h4>
                  <div className="border border-border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Couleur
                          </th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Référence
                          </th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Surface totale
                          </th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantité
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {project?.rooms.flatMap(room => 
                          room.images.flatMap(img => 
                            img.colorApplied.map(pastille => {
                              const color = sampleColors.find(c => c.id === pastille.colorId);
                              return (
                                <tr key={pastille.id}>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div 
                                        className="h-4 w-4 rounded-full mr-2" 
                                        style={{ backgroundColor: color?.hexCode || '#000000' }}
                                      ></div>
                                      {color?.name}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                                    {color?.reference}
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                                    {pastille.area} m²
                                  </td>
                                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                                    {(pastille.area * pastille.literPerSqm).toFixed(2)} L
                                  </td>
                                </tr>
                              )
                            })
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={handleGeneratePDF}>
                    Générer PDF client
                  </Button>
                  <Button variant="outline" onClick={handleExportCSV}>
                    Exporter CSV pour EBP
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Project;
