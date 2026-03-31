import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarStateProvider } from "@/context/SidebarContext";
import { NotificationProvider } from "@/context/NotificationContext";
import Index from "./pages/Index.tsx";
import Watch from "./pages/Watch.tsx";
import Upload from "./pages/Upload.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarStateProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </SidebarStateProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
