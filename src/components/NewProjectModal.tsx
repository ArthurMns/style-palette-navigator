
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreateProject: (projectName: string, clientName: string) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  open,
  onClose,
  onCreateProject
}) => {
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [projectNameError, setProjectNameError] = useState('');
  const [clientNameError, setClientNameError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    if (!projectName.trim()) {
      setProjectNameError('Le nom du projet est requis');
      isValid = false;
    } else {
      setProjectNameError('');
    }
    
    if (!clientName.trim()) {
      setClientNameError('Le nom du client est requis');
      isValid = false;
    } else {
      setClientNameError('');
    }
    
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreateProject(projectName, clientName);
      resetForm();
    }
  };

  const resetForm = () => {
    setProjectName('');
    setClientName('');
    setProjectNameError('');
    setClientNameError('');
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouveau Projet</DialogTitle>
            <DialogDescription>
              Créez un nouveau projet de conseil en couleurs.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-name" className="text-right">
                Nom du projet
              </Label>
              <div className="col-span-3">
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Rénovation Maison Dupont"
                  className={projectNameError ? "border-destructive" : ""}
                />
                {projectNameError && (
                  <p className="text-destructive text-sm mt-1">{projectNameError}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client-name" className="text-right">
                Nom du client
              </Label>
              <div className="col-span-3">
                <Input
                  id="client-name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Jean Dupont"
                  className={clientNameError ? "border-destructive" : ""}
                />
                {clientNameError && (
                  <p className="text-destructive text-sm mt-1">{clientNameError}</p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Créer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
