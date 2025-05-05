
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Import, Pencil } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AddEditProductModal from './AddEditProductModal';
import ImportCSVModal from './ImportCSVModal';

// Types
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

const ProductsSection = () => {
  const { toast } = useToast();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Sample data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      reference: 'PNT-001',
      name: 'Peinture blanche mate',
      description: 'Peinture blanche mate pour murs intérieurs',
      price: 25.99,
      stock: 150,
      category: 'Peinture'
    },
    {
      id: '2',
      reference: 'PNT-002',
      name: 'Peinture beige satinée',
      description: 'Peinture beige satinée pour murs intérieurs',
      price: 29.99,
      stock: 120,
      category: 'Peinture'
    }
  ]);
  
  const openAddModal = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };
  
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };
  
  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      // Edit existing product
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...productData }
          : product
      );
      setProducts(updatedProducts);
      toast({
        title: "Produit modifié",
        description: `Le produit ${productData.name} a été mis à jour.`,
      });
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        ...productData
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Produit ajouté",
        description: `Le produit ${productData.name} a été ajouté avec succès.`,
      });
    }
    setIsProductModalOpen(false);
  };
  
  const handleDeleteProduct = (id: string) => {
    const productToDelete = products.find(product => product.id === id);
    if (!productToDelete) return;
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le produit ${productToDelete.name} ?`)) {
      setProducts(products.filter(product => product.id !== id));
      toast({
        title: "Produit supprimé",
        description: `Le produit ${productToDelete.name} a été supprimé.`,
      });
    }
  };
  
  const handleImportCSV = (importedProducts: Omit<Product, 'id'>[]) => {
    const newProducts = importedProducts.map(product => ({
      ...product,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    
    setProducts([...products, ...newProducts]);
    toast({
      title: "Import réussi",
      description: `${newProducts.length} produits ont été importés avec succès.`,
    });
    setIsImportModalOpen(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gestion des produits</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsImportModalOpen(true)}>
            <Import className="h-4 w-4 mr-2" />
            Importer CSV
          </Button>
          <Button onClick={openAddModal}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un produit
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Prix (€)</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.reference}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">{product.description}</TableCell>
                <TableCell className="text-right">{product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditModal(product)}>
                      <Pencil className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AddEditProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
      
      <ImportCSVModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportCSV}
      />
    </div>
  );
};

export default ProductsSection;
