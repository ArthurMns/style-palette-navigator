
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EmptyProjectStateProps {
  onNewProject: () => void;
}

const EmptyProjectState: React.FC<EmptyProjectStateProps> = ({ onNewProject }) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
      <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun projet trouvé</h3>
      <p className="text-gray-500 mb-4">
        Commencez par créer un nouveau projet.
      </p>
      <Button onClick={onNewProject}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Créer un projet
      </Button>
    </div>
  );
};

export default EmptyProjectState;
