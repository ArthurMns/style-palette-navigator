import React, { useState, useEffect, useMemo } from 'react'; // Ajout de useMemo
import { PlusCircle, Search } from 'lucide-react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import NewProjectModal from '../components/NewProjectModal';
import ColorPalette from '../components/ColorPalette';
import { Project } from '../lib/types';
import { sampleProjects, sampleColors } from '../data/sampleData';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Ajout des imports Select
import Footer from '@/components/Footer';

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const { toast } = useToast();
  const projectsPerPage = 8; // 2 lignes de 4 projets
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Ajout pour la recherche
  const [selectedConseiller, setSelectedConseiller] = useState<string>('Tous'); // Ajout pour le filtre conseiller

  // Obtenir la liste unique des conseillers
  const conseillers = useMemo(() => {
    const allConseillers = projects.map(p => p.conseilleName).filter(Boolean); // Filtrer les undefined/null
    return ['Tous', ...Array.from(new Set(allConseillers))];
  }, [projects]);

  // Filtrer les projets en fonction de la recherche et du conseiller sélectionné
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.conseilleName?.toLowerCase().includes(searchTerm.toLowerCase()); // Recherche aussi par conseiller
      const matchesConseiller = selectedConseiller === 'Tous' || project.conseilleName === selectedConseiller;
      return matchesSearch && matchesConseiller;
    });
  }, [projects, searchTerm, selectedConseiller]);

  // Calculer le nombre total de pages basé sur les projets filtrés
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Calculer l'index de début et de fin pour les projets filtrés
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const displayedProjects = filteredProjects.slice(startIndex, endIndex);

  // Réinitialiser la page à 1 lorsque le filtre ou la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedConseiller]);

  const handleCreateProject = (projectName: string, conseilleName: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: projectName,
      conseilleName: conseilleName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rooms: []
    };

    setProjects([newProject, ...projects]);
    setShowNewProjectModal(false);

    toast({
      title: "Projet créé",
      description: `Le projet "${projectName}" a été créé avec succès.`,
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const projectToDelete = projects.find(p => p.id === projectId);
    if (!projectToDelete) return;

    setProjects(projects.filter(p => p.id !== projectId));

    toast({
      title: "Projet supprimé",
      description: `Le projet "${projectToDelete.name}" a été supprimé.`,
    });
  };

  const handleDuplicateProject = (projectId: string) => {
    const projectToDuplicate = projects.find(p => p.id === projectId);
    if (!projectToDuplicate) return;

    const duplicatedProject: Project = {
      ...projectToDuplicate,
      id: `proj-${Date.now()}`,
      name: `${projectToDuplicate.name} (copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects([duplicatedProject, ...projects]);

    toast({
      title: "Projet dupliqué",
      description: `Une copie du projet "${projectToDuplicate.name}" a été créée.`,
    });
  };

  const handleRenameProject = (projectId: string) => {
    setProjects(
      projects.map(p =>
        p.id === projectId
          ? { ...p, name: `${p.name} (renommé)`, updatedAt: new Date().toISOString() }
          : p
      )
    );

    toast({
      title: "Projet renommé",
      description: "Le nom du projet a été mis à jour.",
    });
  };

  const handleSelectProject = (projectId: string) => {
    toast({
      title: "Projet sélectionné",
      description: `Vous avez sélectionné le projet ID: ${projectId}`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNewProject={() => setShowNewProjectModal(true)} />

      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto max-h-screen">
        <div className="container mx-auto">
          <section className="mb-8">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4"> {/* Ajout de flex-wrap et gap */}
              <h2 className="text-xl font-semibold w-full sm:w-auto">Projets récents</h2> {/* Ajustement de la largeur */}

              {/* Barre de recherche et Filtre Conseiller */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto sm:flex-nowrap"> {/* Ajustement de la largeur et flex-wrap */}
                <div className="relative flex-grow sm:flex-grow-0 sm:w-64"> {/* Ajustement de la largeur */}
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher projet ou conseiller..."
                    className="pl-8 bg-gray-50 w-full" // Assurer la pleine largeur sur mobile
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Sélecteur de Conseiller */}
                <Select value={selectedConseiller} onValueChange={setSelectedConseiller}>
                  <SelectTrigger className="w-full sm:w-[180px]"> {/* Ajustement de la largeur */}
                    <SelectValue placeholder="Filtrer par conseiller" />
                  </SelectTrigger>
                  <SelectContent>
                    {conseillers.map(conseiller => (
                      <SelectItem key={conseiller} value={conseiller}>
                        {conseiller}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-end sm:justify-start"> {/* Ajustement de la largeur et justification */}
                <Button variant="tertiary" size="sm" onClick={() => setShowNewProjectModal(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nouveau projet
                </Button>
              </div>
            </div>

            {displayedProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={handleSelectProject}
                    onDelete={handleDeleteProject}
                    onDuplicate={handleDuplicateProject}
                    onRename={handleRenameProject}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun projet trouvé</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || selectedConseiller !== 'Tous'
                    ? "Essayez d'ajuster vos filtres ou votre recherche."
                    : "Commencez par créer un nouveau projet."}
                </p>
                <Button onClick={() => setShowNewProjectModal(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Créer un projet
                </Button>
              </div>
            )}

            {/* Pagination basée sur les projets filtrés */}
            {filteredProjects.length > projectsPerPage && (
              <div className="flex justify-end items-center mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                          }
                        }}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                          }
                        }}
                        disabled={currentPage >= totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </div>
      </main>

      <NewProjectModal
        open={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onCreateProject={handleCreateProject}
      />
      <Footer />
    </div>
  );
};

export default Index;
