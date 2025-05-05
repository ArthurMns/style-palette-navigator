import React, { useState } from 'react';
import { PlusCircle, Search } from 'lucide-react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import NewProjectModal from '../components/NewProjectModal';
import ColorPalette from '../components/ColorPalette';
import { Project } from '../lib/types';
import { sampleProjects, sampleColors } from '../data/sampleData';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";


const Index = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const { toast } = useToast();

  const handleCreateProject = (projectName: string, clientName: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: projectName,
      clientName: clientName,
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
    // In a real app, this would open a modal for renaming
    // For this example, we'll just add "(renommé)" to the project name
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
    // In a real app, this would navigate to project details page
    toast({
      title: "Projet sélectionné",
      description: `Vous avez sélectionné le projet ID: ${projectId}`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNewProject={() => setShowNewProjectModal(true)} />
      
      <main className="flex-1 p-6 bg-gray-50">
        <div className="container mx-auto">
          <section className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Projets récents</h2>
              
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher un projet..."
                    className="pl-10 pr-4 py-2 h-10 w-full bg-white border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <Button variant="outline" size="sm" onClick={() => setShowNewProjectModal(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nouveau projet
                </Button>
              </div>
            </div>
            
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {projects.map(project => (
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
                <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun projet</h3>
                <p className="text-gray-500 mb-4">Commencez par créer un nouveau projet.</p>
                <Button onClick={() => setShowNewProjectModal(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Créer un projet
                </Button>
              </div>
            )}
          </section>
          
          {/* <section>
            <h2 className="text-xl font-semibold mb-4">Outils</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ColorPalette colors={sampleColors} />
            </div>
          </section> */}
        </div>
      </main>
      
      <NewProjectModal
        open={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default Index;
