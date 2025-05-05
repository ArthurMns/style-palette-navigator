
import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, BellRing, Settings, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onNewProject: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewProject }) => {
  return (
    <header className="w-full px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src="/Logo.png" alt="SoStyle Logo" width="150" height="100" />
          </Link>
        </div>

        {/* Barre de recherche commentée */}
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
          {/* Utilisation du DropdownMenu autour du bouton existant */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <span>Bienvenue Conseillé Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/administration" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Administration</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
