
import React from 'react';
import { CalendarIcon, MoreHorizontal, User, Image } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Project } from '../lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  onSelect: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  onDuplicate: (projectId: string) => void;
  onRename: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  onDelete,
  onDuplicate,
  onRename
}) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy", { locale: fr });
  };

  return (
    <div 
      className="project-card bg-white relative cursor-pointer"
      onClick={() => onSelect(project.id)}
    >
      <div className="h-36 bg-gray-100 relative">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Image className="h-12 w-12" />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base line-clamp-1">{project.name}</h3>
          
          <div className="project-card-options">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onRename(project.id);
                }}>
                  Renommer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(project.id);
                }}>
                  Dupliquer
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(project.id);
                  }}
                >
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <User className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">{project.clientName}</span>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <CalendarIcon className="h-3 w-3 mr-1" />
          <span>Modifié le {formatDate(project.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
