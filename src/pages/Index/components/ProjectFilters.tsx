
import React from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedConseiller: string;
  setSelectedConseiller: (conseiller: string) => void;
  conseillers: string[];
  onNewProject: () => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedConseiller,
  setSelectedConseiller,
  conseillers,
  onNewProject
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
      <h2 className="text-xl font-semibold w-full sm:w-auto">Projets récents</h2>

      {/* Barre de recherche et Filtre Conseiller */}
      <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto sm:flex-nowrap">
        <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher projet ou conseiller..."
            className="pl-8 bg-gray-50 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sélecteur de Conseiller */}
        <Select value={selectedConseiller} onValueChange={setSelectedConseiller}>
          <SelectTrigger className="w-full sm:w-[180px]">
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

      <div className="flex items-center gap-4 w-full sm:w-auto justify-end sm:justify-start">
        <Button variant="tertiary" size="sm" onClick={onNewProject}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouveau projet
        </Button>
      </div>
    </div>
  );
};

export default ProjectFilters;
