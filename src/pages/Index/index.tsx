
import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Project } from '@/lib/types';
import { sampleProjects } from '@/data/sampleData';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import NewProjectModal from '@/components/NewProjectModal';
import Footer from '@/components/Footer';
import ProjectList from './components/ProjectList';
import ProjectFilters from './components/ProjectFilters';
import EmptyProjectState from './components/EmptyProjectState';

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const { toast } = useToast();
  const projectsPerPage = 8; // 2 lignes de 4 projets
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConseiller, setSelectedConseiller] = useState<string>('Tous');

  // Obtenir la liste unique des conseillers
  const conseillers = useMemo(() => {
    const allConseillers = projects.map(p => p.conseilleName).filter(Boolean);
    return ['Tous', ...Array.from(new Set(allConseillers))];
  }, [projects]);

  // Filtrer les projets en fonction de la recherche et du conseiller sélectionné
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.conseilleName?.toLowerCase().includes(searchTerm.toLowerCase());
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
            <ProjectFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedConseiller={selectedConseiller}
              setSelectedConseiller={setSelectedConseiller}
              conseillers={conseillers}
              onNewProject={() => setShowNewProjectModal(true)}
            />

            {displayedProjects.length > 0 ? (
              <ProjectList 
                projects={displayedProjects}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                onSelectProject={handleSelectProject}
                onDeleteProject={handleDeleteProject}
                onDuplicateProject={handleDuplicateProject}
                onRenameProject={handleRenameProject}
              />
            ) : (
              <EmptyProjectState onNewProject={() => setShowNewProjectModal(true)} />
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
