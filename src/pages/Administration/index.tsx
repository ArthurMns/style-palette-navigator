
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersSection from './components/UsersSection';
import ProductsSection from './components/ProductsSection';
import TrashSection from './components/TrashSection';
import Header from '@/components/Header';

const Administration = () => {
  const [activeTab, setActiveTab] = useState("users");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNewProject={() => {}} />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Administration</h1>
        
        <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="trash">Corbeille des projets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UsersSection />
          </TabsContent>
          
          <TabsContent value="products">
            <ProductsSection />
          </TabsContent>
          
          <TabsContent value="trash">
            <TrashSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Administration;
