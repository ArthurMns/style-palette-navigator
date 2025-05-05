import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectPage from "./pages/Project";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  
  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header onNewProject={handleNewProject} /> */}
      <main className="flex-1">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/project/:projectId" element={<ProjectPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </main>
      <Footer />
      
      {/* Vos modals ou autres composants */}
    </div>
  );
}

export default App;
