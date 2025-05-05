
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  reference: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (products: Omit<Product, 'id'>[]) => void;
}

const ImportCSVModal: React.FC<ImportCSVModalProps> = ({ isOpen, onClose, onImport }) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [importStatus, setImportStatus] = useState<'idle' | 'preview' | 'importing'>('idle');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          const content = evt.target.result as string;
          const rows = content.split('\n').map(row => row.split(',').map(cell => cell.trim()));
          
          if (rows.length > 0) {
            const headerRow = rows[0];
            setHeaders(headerRow);
            setPreviewData(rows.slice(1, 11)); // Preview first 10 data rows
            setImportStatus('preview');
          }
        }
      };
      reader.readAsText(file);
    }
  };
  
  const handleImport = () => {
    if (!csvFile) return;
    
    setImportStatus('importing');
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        const content = evt.target.result as string;
        const rows = content.split('\n').map(row => row.split(',').map(cell => cell.trim()));
        
        if (rows.length > 1) { // At least header row and one data row
          const headerRow = rows[0];
          const dataRows = rows.slice(1).filter(row => row.length === headerRow.length && row.some(cell => cell !== ''));
          
          // Map CSV data to Product objects
          const products = dataRows.map(row => {
            const product: Partial<Omit<Product, 'id'>> = {};
            
            headerRow.forEach((header, index) => {
              const value = row[index];
              
              switch (header.toLowerCase()) {
                case 'reference':
                  product.reference = value;
                  break;
                case 'name':
                case 'nom':
                  product.name = value;
                  break;
                case 'description':
                  product.description = value;
                  break;
                case 'price':
                case 'prix':
                  product.price = parseFloat(value) || 0;
                  break;
                case 'stock':
                  product.stock = parseInt(value) || 0;
                  break;
                case 'category':
                case 'catégorie':
                  product.category = value;
                  break;
                case 'image':
                  product.image = value;
                  break;
              }
            });
            
            return product as Omit<Product, 'id'>;
          }).filter(product => product.reference && product.name);
          
          onImport(products);
        }
      }
    };
    reader.readAsText(csvFile);
  };
  
  const resetForm = () => {
    setCsvFile(null);
    setPreviewData([]);
    setHeaders([]);
    setImportStatus('idle');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => {
      onClose();
      resetForm();
    }}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Importer des produits via CSV</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {importStatus === 'idle' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Sélectionnez un fichier CSV à importer. Le fichier doit contenir les colonnes suivantes : 
                reference, name, description, price, stock, category (et optionnellement image).
              </p>
              
              <div className="flex items-center gap-4">
                <Input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
            </div>
          )}
          
          {importStatus === 'preview' && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Aperçu des données (10 premières lignes)</h3>
              
              <div className="rounded-md border max-h-[400px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {headers.map((header, i) => (
                        <TableHead key={i}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          {importStatus === 'importing' && (
            <div className="py-8 text-center">
              <p>Importation en cours...</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => {
            onClose();
            resetForm();
          }}>
            Annuler
          </Button>
          {importStatus === 'preview' && (
            <Button onClick={handleImport}>
              Lancer l'import
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCSVModal;
