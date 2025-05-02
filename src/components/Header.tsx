
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
          <img src='/Logo-Sorain-Styles-noir-removebg-preview.png' className="h-8"></img>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={onNewProject}>
            <span>Pierre Dupond</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
