import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Home } from "@/components/tools/Home";
import { CPFGenerator } from "@/components/tools/CPFGenerator";
import { CNPJGenerator } from "@/components/tools/CNPJGenerator";
import { Validator } from "@/components/tools/Validator";
import { PlateGenerator } from "@/components/tools/PlateGenerator";
import { JSONFormatter } from "@/components/tools/JSONFormatter";
import { JSONCSVConverter } from "@/components/tools/JSONCSVConverter";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { HashCalculator } from "@/components/tools/HashCalculator";
import { UUIDGenerator } from "@/components/tools/UUIDGenerator";
import { CharCounter } from "@/components/tools/CharCounter";
import { XMLFormatter } from "@/components/tools/XMLFormatter";
import { PercentageCalculator } from "@/components/tools/PercentageCalculator";
import { Dashboard } from "@/components/tools/Dashboard";

const queryClient = new QueryClient();

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
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cpf-generator" element={<CPFGenerator />} />
                    <Route path="/cnpj-generator" element={<CNPJGenerator />} />
                    <Route path="/validator" element={<Validator />} />
                    <Route path="/plate-generator" element={<PlateGenerator />} />
                    <Route path="/json-formatter" element={<JSONFormatter />} />
                    <Route path="/json-csv-converter" element={<JSONCSVConverter />} />
                    <Route path="/password-generator" element={<PasswordGenerator />} />
                    <Route path="/hash-calculator" element={<HashCalculator />} />
                    <Route path="/uuid-generator" element={<UUIDGenerator />} />
                    <Route path="/char-counter" element={<CharCounter />} />
                    <Route path="/xml-formatter" element={<XMLFormatter />} />
                    <Route path="/percentage-calculator" element={<PercentageCalculator />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
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
