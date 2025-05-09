import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full h-24 p-4 text-center bg-gray-100 border-t border-gray-200 justify-center flex items-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} SoStyles -  Conseil Couleur. Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;