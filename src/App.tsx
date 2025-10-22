import React, { useState, Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Home } from "@/components/tools/Home";
import { toolsConfig } from "@/config/tools";

const queryClient = new QueryClient();

// Mapear os paths dos componentes para importações lazy
const toolComponents = toolsConfig.reduce((acc, tool) => {
  acc[tool.path] = lazy(() => import(`@/components/tools${tool.path}`));
  return acc;
}, {} as Record<string, React.LazyExoticComponent<React.FC>>);

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col w-full">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            
            <div className="flex flex-1 w-full">
              <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
              />
              
              <main className="flex-1 p-6 md:p-8 overflow-auto">
                <div className="max-w-6xl mx-auto">
                  <Suspense fallback={<div>Carregando ferramenta...</div>}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      {toolsConfig.map((tool) => {
                        const ToolComponent = toolComponents[tool.path];
                        return (
                          <Route 
                            key={tool.path} 
                            path={tool.path} 
                            element={<ToolComponent />} 
                          />
                        );
                      })}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </div>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
