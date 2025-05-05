import React from 'react';
import { PlusCircle, Search, BellRing } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
 
 
interface HeaderProps {
  onNewProject: () => void;
}
 
const Header: React.FC<HeaderProps> = ({ onNewProject }) => {
  return (
    <header className="w-full px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/Logo.png" alt="SoStyle Logo" width="150" height="100" />
        </div>
       
        {/* <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un projet..."
              className="pl-8 bg-gray-50"
            />
          </div>
        </div> */}
       
        <div className="flex items-center gap-3">
          <Button onClick={onNewProject}>
            {/* <PlusCircle className="h-4 w-4 mr-2" /> */}
            <span>Bienvenue Paul Dupont</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
 
export default Header;
 