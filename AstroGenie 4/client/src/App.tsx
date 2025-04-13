
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./lib/auth-context";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import HistoryPage from "@/pages/history";
import HoroscopeDetailPage from "@/pages/horoscope-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/horoscope/:id" component={HoroscopeDetailPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
