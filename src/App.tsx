
import React, { useState } from 'react';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectPage from "./pages/Project";
import NotFound from "./pages/NotFound";
import Administration from "./pages/Administration";
import Header from "./components/Header";

const queryClient = new QueryClient();

function App() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  
  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/project/:projectId" element={<ProjectPage />} />
                <Route path="/administration" element={<Administration />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </main>
      
      {/* Vos modals ou autres composants */}
    </div>
  );
}

export default App;
