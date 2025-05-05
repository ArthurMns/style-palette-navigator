import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, MoreHorizontal, Plus, Trash, Copy, Save, FileText, FileDown } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import PastilleConfigForm from '@/components/PastilleConfigForm';
import { Color, Project as ProjectType, RoomImage, ColorApplication } from '@/lib/types';
import { sampleColors } from '@/data/sampleData';
import DecoTipsSection from '@/components/DecoTipsSection';
import RecapSection from '@/components/RecapSection';
import Footer from '../components/Footer';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  // État pour stocker les données du projet
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("photos");
  const [projectName, setProjectName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [selectedImage, setSelectedImage] = useState<RoomImage | null>(null);
  const [selectedPastille, setSelectedPastille] = useState<ColorApplication | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [generatingCSV, setGeneratingCSV] = useState(false);

  // Simuler le chargement des données du projet
  useEffect(() => {
    const fetchProject = async () => {
      // Ici, vous remplaceriez cela par un appel API réel
      setTimeout(() => {
        // Données factices pour la démonstration
        const demoProject: ProjectType = {
          id: projectId || "",
          name: "Projet Rénovation Appartement",
          conseilleName: "Martin Dupont",
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
            },
            {
              id: "room-002",
              name: "Cuisine",
              images: [
                {
                  id: "img-002",
                  src: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
                  colorApplied: []
                }
              ]
            },
            {
              id: "room-003",
              name: "Chambre",
              images: [
                {
                  id: "img-003",
                  src: "https://images.unsplash.com/photo-1551645120-d70bfe84c826",
                  colorApplied: []
                }
              ]
            }
          ]
        };

        setProject(demoProject);
        setProjectName(demoProject.name);
        setSelectedRoom(demoProject.rooms[0].id);
        if (demoProject.rooms[0]?.images[0]) {
          setSelectedImage(demoProject.rooms[0].images[0]);
        }
        setLoading(false);
      }, 500);
    };

    fetchProject();
  }, [projectId]);

  // Effet pour mettre à jour l'image sélectionnée lors du changement de pièce
  useEffect(() => {
    if (project && selectedRoom) {
      const room = project.rooms.find(room => room.id === selectedRoom);
      if (room && room.images.length > 0) {
        setSelectedImage(room.images[0]);
        setSelectedPastille(null);
      } else {
        setSelectedImage(null);
      }
    }
  }, [selectedRoom, project]);

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
      variant: "destructive"
    });
    navigate('/');
  };

  const handleSaveProject = () => {
    // Ici, vous ajouteriez la logique pour sauvegarder l'état actuel du projet
    // Par exemple, faire un appel API pour envoyer les données `project` au backend
    toast({
      title: "Projet sauvegardé",
      description: "Les modifications ont été enregistrées avec succès.",
    });
  };

  // Fonctions pour gérer les images
  const handleTakePhoto = () => {
    if (cameraRef.current) {
      cameraRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !project || !selectedRoom) {
      return;
    }

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

        const updatedRooms = project.rooms.map(room => {
          if (room.id === selectedRoom) {
            return {
              ...room,
              images: [...room.images, newImage]
            };
          }
          return room;
        });

        setProject({
          ...project,
          rooms: updatedRooms,
          updatedAt: new Date().toISOString()
        });

        setSelectedImage(newImage);

        toast({
          title: "Image ajoutée",
          description: `L'image a été ajoutée à la pièce ${project.rooms.find(r => r.id === selectedRoom)?.name}.`,
        });
      }
    };

    reader.readAsDataURL(file);

    // Réinitialiser l'input file pour permettre de sélectionner le même fichier plusieurs fois
    event.target.value = '';
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
    setGeneratingPDF(true);

    toast({
      title: "Génération en cours",
      description: "Le PDF est en cours de génération...",
    });

    // Simuler un délai de génération
    setTimeout(() => {
      setGeneratingPDF(false);
      toast({
        title: "PDF généré",
        description: "Le document PDF est prêt à être téléchargé.",
      });
    }, 2000);
  };

  const handleExportCSV = () => {
    setGeneratingCSV(true);

    toast({
      title: "Export en cours",
      description: "Le fichier CSV pour EBP est en cours de génération...",
    });

    // Simuler un délai de génération
    setTimeout(() => {
      setGeneratingCSV(false);
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
    <div className="min-h-screen flex flex-col w-full">
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
                  Enregistrer Nom
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

          {/* Actions du projet */}
          <div className="flex items-center gap-2">
            {/* Bouton Sauvegarder */}
            <Button variant="default" size="sm" onClick={handleSaveProject}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>

            {/* Menu d'options
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditingName(true)}>
                  <Save className="mr-2 h-4 w-4" />
                  <span>Renommer</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicateProject}>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Dupliquer</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteProject} className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Supprimer</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <Tabs defaultValue="photos" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="photos" className="flex-1">Photos et Couleurs</TabsTrigger>
              <TabsTrigger value="deco" className="flex-1">Conseils Déco</TabsTrigger>
              <TabsTrigger value="recap" className="flex-1">Récapitulatif</TabsTrigger>
            </TabsList>

            {/* Sélecteur de pièce - Conditionnellement affiché */}
            {activeTab !== 'recap' && (
              <div className="mb-4">
                <Label htmlFor="room-select" className="mb-1 block">Pièce</Label>
                <Select
                  value={selectedRoom}
                  onValueChange={setSelectedRoom}
                >
                  <SelectTrigger id="room-select" className="w-full md:w-64">
                    <SelectValue placeholder="Sélectionnez une pièce" />
                  </SelectTrigger>
                  <SelectContent>
                    {project?.rooms.map(room => (
                      <SelectItem key={room.id} value={room.id}>{room.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
                              className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white cursor-pointer hover:scale-125 transition-transform ${selectedPastille?.id === pastille.id ? 'scale-125 ring-2 ring-primary' : ''}`}
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
                          Glissez et déposez une couleur sur l'image pour ajouter une pastille
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
                    <h3 className="font-medium mb-3">Images de la pièce</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {project?.rooms.find(room => room.id === selectedRoom)?.images.map(image => (
                        <div
                          key={image.id}
                          className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${selectedImage?.id === image.id ? 'border-primary' : 'border-transparent'
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
                </div>

                {/* Palette de couleurs et configuration pastille */}
                <div className="col-span-1 space-y-4">
                  <ColorPalette colors={sampleColors} />

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
              </div>
            </TabsContent>

            <TabsContent value="deco">
              <DecoTipsSection project={project} selectedRoom={selectedRoom} />
            </TabsContent>

            <TabsContent value="recap">
              <RecapSection
                project={project}
                onGeneratePDF={handleGeneratePDF}
                onExportCSV={handleExportCSV}
                generatingPDF={generatingPDF}
                generatingCSV={generatingCSV}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectPage;
