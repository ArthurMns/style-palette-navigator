
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, ArrowUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Types
interface DeletedProject {
  id: string;
  name: string;
  deletedAt: string;
  author: string;
  thumbnailUrl?: string;
}

const TrashSection = () => {
  const { toast } = useToast();
  const [confirmDeleteProject, setConfirmDeleteProject] = useState<DeletedProject | null>(null);
  
  // Sample data
  const [deletedProjects, setDeletedProjects] = useState<DeletedProject[]>([
    {
      id: '1',
      name: 'Rénovation Appartement Paris',
      deletedAt: '2024-04-10',
      author: 'Jean Dupont',
      thumbnailUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=100'
    },
    {
      id: '2',
      name: 'Maison Moderne Bordeaux',
      deletedAt: '2024-04-15',
      author: 'Marie Laurent',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=100'
    }
  ]);
  
  const handleRestoreProject = (id: string) => {
    const projectToRestore = deletedProjects.find(project => project.id === id);
    if (!projectToRestore) return;
    
    setDeletedProjects(deletedProjects.filter(project => project.id !== id));
    toast({
      title: "Projet restauré",
      description: `Le projet "${projectToRestore.name}" a été restauré avec succès.`,
    });
  };
  
  const handleConfirmDelete = () => {
    if (!confirmDeleteProject) return;
    
    setDeletedProjects(deletedProjects.filter(project => project.id !== confirmDeleteProject.id));
    toast({
      title: "Projet supprimé définitivement",
      description: `Le projet "${confirmDeleteProject.name}" a été supprimé définitivement.`,
    });
    setConfirmDeleteProject(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Corbeille des projets</h2>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projet</TableHead>
              <TableHead>Date de suppression</TableHead>
              <TableHead>Auteur</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deletedProjects.length > 0 ? (
              deletedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="flex items-center gap-3">
                    {project.thumbnailUrl && (
                      <img 
                        src={project.thumbnailUrl} 
                        alt={project.name} 
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span>{project.name}</span>
                  </TableCell>
                  <TableCell>{project.deletedAt}</TableCell>
                  <TableCell>{project.author}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleRestoreProject(project.id)}>
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setConfirmDeleteProject(project)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  Aucun projet dans la corbeille
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={!!confirmDeleteProject} onOpenChange={() => setConfirmDeleteProject(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer définitivement ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer définitivement le projet "{confirmDeleteProject?.name}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TrashSection;
