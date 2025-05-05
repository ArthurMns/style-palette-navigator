import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-6 py-8 bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-gray-500">
            <p className="mb-2">© {currentYear} SoStyles - AppConseilCouleur</p>
            <p>Tous droits réservés</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-800 font-medium">Contact</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-800 font-medium">Aide</a>
            </div>
            <p className="text-xs text-gray-400 mt-2">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;