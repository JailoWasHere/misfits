import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import IlProblema from "@/pages/il-problema";
import LoginPage from "@/pages/login";
import SignupPage from "@/pages/signup";
import LaNostraMissione from "@/pages/la-nostra-missione";
import Scarica from "@/pages/scarica";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorProvider } from "@/contexts/cursor-context";
import { AuthProvider } from "@/contexts/auth-context";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/il-problema" component={IlProblema} />
      <Route path="/la-nostra-missione" component={LaNostraMissione} />
      <Route path="/scarica" component={Scarica} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <CursorProvider>
            <ScrollProgress />
            <CustomCursor />
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </CursorProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
