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

// Importações lazy explícitas para cada componente de ferramenta
const LazyDashboard = lazy(() => import("@/components/tools/Dashboard"));
const LazyCPFGenerator = lazy(() => import("@/components/tools/CPFGenerator"));
const LazyCNPJGenerator = lazy(() => import("@/components/tools/CNPJGenerator"));
const LazyValidator = lazy(() => import("@/components/tools/Validator"));
const LazyPlateGenerator = lazy(() => import("@/components/tools/PlateGenerator"));
const LazyJSONFormatter = lazy(() => import("@/components/tools/JSONFormatter"));
const LazyJSONCSVConverter = lazy(() => import("@/components/tools/JSONCSVConverter"));
const LazyPasswordGenerator = lazy(() => import("@/components/tools/PasswordGenerator"));
const LazyHashCalculator = lazy(() => import("@/components/tools/HashCalculator"));
const LazyUUIDGenerator = lazy(() => import("@/components/tools/UUIDGenerator"));
const LazyCharCounter = lazy(() => import("@/components/tools/CharCounter"));
const LazyXMLFormatter = lazy(() => import("@/components/tools/XMLFormatter"));
const LazyPercentageCalculator = lazy(() => import("@/components/tools/PercentageCalculator"));
const LazyUniversalConverter = lazy(() => import("@/components/tools/UniversalConverter"));
const LazyTypingTest = lazy(() => import("@/components/tools/TypingTest"));
const LazyCronBuilder = lazy(() => import("@/components/tools/CronBuilder"));
const LazyAlarmClock = lazy(() => import("@/components/tools/AlarmClock/AlarmClock"));

// Mapear os paths para os componentes lazy
const toolComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  '/dashboard': LazyDashboard,
  '/cpf-generator': LazyCPFGenerator,
  '/cnpj-generator': LazyCNPJGenerator,
  '/validator': LazyValidator,
  '/plate-generator': LazyPlateGenerator,
  '/json-formatter': LazyJSONFormatter,
  '/json-csv-converter': LazyJSONCSVConverter,
  '/password-generator': LazyPasswordGenerator,
  '/hash-calculator': LazyHashCalculator,
  '/uuid-generator': LazyUUIDGenerator,
  '/char-counter': LazyCharCounter,
  '/xml-formatter': LazyXMLFormatter,
  '/percentage-calculator': LazyPercentageCalculator,
  '/universal-converter': LazyUniversalConverter,
  '/typing-test': LazyTypingTest,
  '/cron-builder': LazyCronBuilder,
  '/alarm-clock': LazyAlarmClock,
};

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
                            element={ToolComponent ? <ToolComponent /> : <Navigate to="/" replace />} 
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
